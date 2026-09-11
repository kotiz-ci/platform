import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function read(path) {
  return readFileSync(resolve(ROOT, path), "utf8");
}

test("the promotion PR records human acceptance and proves a fresh local startup", () => {
  const workflow = read(".github/workflows/ci.yml");

  assert.match(workflow, /promotion-acceptance:/);
  assert.match(workflow, /github\.base_ref == 'main'/);
  assert.match(workflow, /github\.head_ref == 'develop'/);
  assert.match(workflow, /S1 PROMOTION APPROVED/);
  assert.match(workflow, /github\.base_ref == 'main' && github\.head_ref != 'develop'/);
  assert.match(workflow, /Only develop can be promoted to main/);
  assert.match(workflow, /issues\/\$\{\{ github\.event\.pull_request\.number \}\}\/comments/);
  assert.match(workflow, /pnpm install --frozen-lockfile/);
  assert.match(workflow, /pnpm verify:local-dev/);
  assert.match(workflow, /needs: \[quality, security, backend-image, promotion-acceptance\]/);
});

test("promotion CI preserves the exact verified backend image as an immutable artifact", () => {
  const workflow = read(".github/workflows/ci.yml");

  assert.match(workflow, /--output type=docker,dest=\/tmp\/kotiz-backend-image\.tar/);
  assert.match(workflow, /docker load --input \/tmp\/kotiz-backend-image\.tar/);
  assert.match(workflow, /actions\/upload-artifact@[0-9a-f]{40}/);
  assert.match(workflow, /name: backend-image-\$\{\{ github\.event\.pull_request\.head\.sha \}\}/);
  assert.match(
    workflow,
    /path: \|\s*\/tmp\/kotiz-backend-image\.tar\s*\/tmp\/kotiz-backend\.digest/
  );
  assert.match(workflow, /if: github\.base_ref == 'main' && github\.head_ref == 'develop'/);
});

test("a merged develop to main PR publishes the verified artifact without rebuilding", () => {
  const workflow = read(".github/workflows/release-backend.yml");

  assert.match(workflow, /pull_request:\s*\n\s+types: \[closed\]\s*\n\s+branches: \[main\]/);
  assert.match(workflow, /github\.event\.pull_request\.merged == true/);
  assert.match(workflow, /github\.event\.pull_request\.head\.ref == 'develop'/);
  assert.match(workflow, /actions: read/);
  assert.match(workflow, /packages: write/);
  assert.match(workflow, /id-token: write/);
  assert.match(workflow, /issues: write/);
  assert.match(workflow, /actions\/download-artifact@[0-9a-f]{40}/);
  assert.match(workflow, /run-id: \$\{\{ steps\.candidate-run\.outputs\.run-id \}\}/);
  assert.match(workflow, /docker load --input .*kotiz-backend-image\.tar/);
  assert.match(workflow, /awk '\/digest: sha256:\/ \{ print \$3 \}'/);
  assert.match(workflow, /test "\$PUBLISHED_DIGEST" = "\$EXPECTED_DIGEST"/);
  assert.doesNotMatch(workflow, /docker build|buildx build|build-push-action/);
});

test("the published digest is signed keylessly and immediately verified", () => {
  const workflow = read(".github/workflows/release-backend.yml");

  assert.match(workflow, /sigstore\/cosign-installer@[0-9a-f]{40}/);
  assert.match(workflow, /cosign sign --yes "\$IMAGE_BY_DIGEST"/);
  assert.match(workflow, /cosign verify/);
  assert.match(
    workflow,
    /EXPECTED_CERTIFICATE_IDENTITY: https:\/\/github\.com\/\$\{\{ github\.repository \}\}\/\.github\/workflows\/release-backend\.yml@refs\/heads\/main/
  );
  assert.match(workflow, /--certificate-identity "\$EXPECTED_CERTIFICATE_IDENTITY"/);
  assert.match(workflow, /IMAGE_REPOSITORY: ghcr\.io\/\$\{\{ github\.repository \}\}\/backend/);
  assert.match(
    workflow,
    /--certificate-oidc-issuer https:\/\/token\.actions\.githubusercontent\.com/
  );
});

test("release evidence is retained in the issue and as a workflow artifact", () => {
  const workflow = read(".github/workflows/release-backend.yml");

  assert.match(workflow, /acceptance-report\.md/);
  assert.match(workflow, /github\.com\/\$GITHUB_REPOSITORY\/actions\/runs\/\$GITHUB_RUN_ID/);
  assert.match(workflow, /actions\/upload-artifact@[0-9a-f]{40}/);
  assert.match(workflow, /gh issue comment 36 --body-file/);
  assert.match(workflow, /Digest OCI/);
  assert.match(workflow, /Signature Cosign vérifiée/);
  assert.match(workflow, /cat \/tmp\/cosign-verification\.json/);
});

test("the solo promotion and recovery procedure is documented", () => {
  const guide = read("docs/ci/s1-promotion.md");

  assert.match(guide, /develop.*main/);
  assert.match(guide, /S1 PROMOTION APPROVED/);
  assert.match(guide, /merge commit/);
  assert.match(guide, /sans rebuild/i);
  assert.match(guide, /issue #36/);
  assert.match(guide, /relancer uniquement le job échoué/i);
});
