import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function read(path) {
  return readFileSync(resolve(ROOT, path), "utf8");
}

function readBackendImageJob() {
  const workflow = read(".github/workflows/ci.yml");
  const imageJob = workflow.match(/  backend-image:\n([\s\S]*?)\n  ci-required:/)?.[1];

  assert.ok(imageJob);
  return { imageJob, workflow };
}

test("the backend image has a pinned Java 21 build stage and a minimal non-root runtime", () => {
  const dockerfile = read("apps/backend/Dockerfile");
  const stages = dockerfile.split(/^FROM /m).slice(1);

  assert.equal(stages.length, 2);
  assert.match(
    stages[0],
    /^eclipse-temurin:21\.0\.12_8-jdk-alpine-3\.24@sha256:[0-9a-f]{64} AS build$/m
  );
  assert.match(stages[1], /^eclipse-temurin:21\.0\.12_8-jre-alpine-3\.24@sha256:[0-9a-f]{64}$/m);
  assert.match(stages[1], /^USER kotiz$/m);
  const finalStageInstructions = stages[1]
    .split("\n")
    .filter((line) => !line.startsWith("COPY --from=build"))
    .join("\n");
  assert.doesNotMatch(finalStageInstructions, /mvnw|\.mvn|jdk|javac/i);
  assert.doesNotMatch(stages[1], /^COPY.*(?:mvnw|\.mvn|\/workspace|jdk|javac)/im);
  assert.doesNotMatch(dockerfile, /^(?:ARG|ENV).*?(?:secret|password|token|key)/im);
});

test("pull request CI exposes the immutable digest of the locally built backend image", () => {
  const { imageJob, workflow } = readBackendImageJob();

  assert.match(workflow, /backend-image:\s*\n/);
  assert.match(
    imageJob,
    /docker buildx build[\s\S]*--metadata-file \/tmp\/kotiz-backend\.metadata\.json/
  );
  assert.match(imageJob, /"containerimage\.digest"/);
  assert.match(imageJob, /test\(\"\^sha256:\[0-9a-f\]\{64\}\$\"\)/);
  assert.match(workflow, /GITHUB_STEP_SUMMARY/);
  assert.doesNotMatch(workflow, /docker (?:image )?push|build-push-action/);
});

test("pull request CI proves that identical backend inputs produce the same digest", () => {
  const { imageJob } = readBackendImageJob();

  assert.match(imageJob, /SOURCE_DATE_EPOCH="\$\(git show -s --format=%ct/);
  assert.match(imageJob, /--build-arg SOURCE_DATE_EPOCH="\$SOURCE_DATE_EPOCH"/);
  assert.match(imageJob, /--metadata-file \/tmp\/kotiz-backend\.repeat\.metadata\.json/);
  assert.match(imageJob, /--no-cache/);
  assert.match(imageJob, /test "\$IMAGE_DIGEST" = "\$REBUILT_DIGEST"/);
});

test("pull request CI blocks non-waived critical vulnerabilities in the built image", () => {
  const { imageJob } = readBackendImageJob();

  assert.match(imageJob, /aquasecurity\/trivy-action@[0-9a-f]{40}/);
  assert.match(imageJob, /scan-type: image/);
  assert.match(imageJob, /image-ref: \$\{\{ env\.IMAGE_REF \}\}/);
  assert.match(imageJob, /severity: ["']CRITICAL["']/);
  assert.match(imageJob, /exit-code: ["']1["']/);
  assert.match(imageJob, /trivyignores: \.trivyignore\.yaml/);
});

test("CI verifies the candidate health after scanning and requires the OCI job", () => {
  const { imageJob, workflow } = readBackendImageJob();
  const requiredJob = workflow.match(/  ci-required:\n([\s\S]*)$/)?.[1];

  assert.ok(requiredJob);
  const scanIndex = imageJob.indexOf("Block non-waived critical image vulnerabilities");
  const healthIndex = imageJob.indexOf('bash scripts/verify-backend-image.sh "$IMAGE_REF"');
  const candidateIndex = imageJob.indexOf("Declare the immutable backend image candidate");
  assert.ok(scanIndex >= 0 && healthIndex > scanIndex);
  assert.ok(candidateIndex > healthIndex);
  assert.match(requiredJob, /needs: \[quality, security, backend-image\]/);
  assert.match(requiredJob, /IMAGE_RESULT: \$\{\{ needs\.backend-image\.result \}\}/);
  assert.match(requiredJob, /test "\$IMAGE_RESULT" = success/);
});

test("ordinary pull requests never publish latest or release image tags", () => {
  const { imageJob, workflow } = readBackendImageJob();

  assert.match(workflow, /pull_request:\s*\n\s+branches: \[develop, main\]/);
  assert.match(
    imageJob,
    /IMAGE_REF: kotiz-backend:verification-\$\{\{ github\.event\.pull_request\.head\.sha \}\}/
  );
  assert.doesNotMatch(imageJob, /docker (?:image )?push|docker\/login-action|push:\s*true/);
  assert.doesNotMatch(imageJob, /(?:tag|IMAGE_REF):[^\n]*(?:latest|release)/i);
});
