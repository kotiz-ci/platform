import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import test from "node:test";
import { tmpdir } from "node:os";
import { join } from "node:path";

const composeFile = "infra/docker/docker-compose.dev.yml";

function run(command, args, options = {}) {
  return execFileSync(command, args, { encoding: "utf8", ...options });
}

test("the local environment exposes only a healthy backend and PostgreSQL 15.19", () => {
  run("bash", ["infra/docker/init-dev-secrets.sh"]);

  const config = JSON.parse(
    run("docker", ["compose", "-f", composeFile, "config", "--format", "json"])
  );
  const secrets = ["admin", "migration", "app"].map((role) =>
    readFileSync(`infra/docker/secrets-dev/postgres_${role}_password.txt`, "utf8").trim()
  );

  assert.deepEqual(Object.keys(config.services).sort(), ["backend", "postgres"]);
  assert.equal(config.services.postgres.image, "postgres:15.19-alpine3.24");
  assert.ok(config.services.postgres.healthcheck);
  assert.ok(config.services.backend.healthcheck);
  assert.deepEqual(config.services.backend.depends_on.postgres, {
    condition: "service_healthy",
    required: true,
  });
  assert.ok(
    config.services.backend.ports.some(
      ({ published, target }) => published === "8080" && target === 8080
    )
  );
  assert.ok(
    config.services.postgres.volumes.some(
      ({ source, target, type }) =>
        source === "pgdata" && target === "/var/lib/postgresql/data" && type === "volume"
    )
  );

  for (const service of Object.values(config.services)) {
    const environment = JSON.stringify(service.environment ?? {});
    assert.doesNotMatch(environment, /"POSTGRES_PASSWORD"\s*:/);
    for (const secret of secrets) {
      assert.ok(!environment.includes(secret));
    }
  }
});

test("development secrets are generated once outside Git", () => {
  const secretDir = mkdtempSync(join(tmpdir(), "kotiz-secrets-"));
  const options = {
    env: { ...process.env, KOTIZ_DEV_SECRET_DIR: secretDir },
  };

  try {
    run("bash", ["infra/docker/init-dev-secrets.sh"], options);
    const firstValues = new Map(
      ["admin", "migration", "app"].map((role) => {
        const path = join(secretDir, `postgres_${role}_password.txt`);
        return [path, readFileSync(path, "utf8")];
      })
    );

    run("bash", ["infra/docker/init-dev-secrets.sh"], options);

    for (const [path, firstValue] of firstValues) {
      assert.equal(readFileSync(path, "utf8"), firstValue);
      assert.match(firstValue, /^[a-f0-9]{64}\n$/);
      assert.equal(statSync(path).mode & 0o777, 0o600);
    }
    run("git", ["check-ignore", "--quiet", "infra/docker/secrets-dev/postgres_app_password.txt"]);
  } finally {
    rmSync(secretDir, { recursive: true });
  }
});

test("developer commands wait for health, preserve data, and reset volumes explicitly", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

  assert.equal(packageJson.scripts["dev:up"], "bash infra/docker/dev-up.sh");
  assert.match(packageJson.scripts["dev:down"], /docker compose .* down$/);
  assert.match(packageJson.scripts["dev:reset"], /docker compose .* down -v$/);
  assert.match(readFileSync("infra/docker/dev-up.sh", "utf8"), /up --build --detach --wait/);
  assert.equal(packageJson.scripts["verify:local-dev"], "bash scripts/verify-local-dev.sh");
});

test("a fresh-clone startup is documented without Redis, MinIO, or Nginx", () => {
  const readme = readFileSync("README.md", "utf8");
  const infraReadme = readFileSync("infra/docker/README.md", "utf8");

  assert.match(readme, /pnpm dev:up/);
  assert.match(readme, /localhost:8080\/actuator\/health/);
  assert.match(infraReadme, /clone frais/i);
  assert.match(infraReadme, /pnpm dev:down/);
  assert.match(infraReadme, /pnpm dev:reset/);
  assert.doesNotMatch(infraReadme, /services réels[\s\S]*(Redis|MinIO|Nginx)/i);
});

test(
  "the live environment is healthy, preserves data on stop, and deletes it on reset",
  { skip: process.env.KOTIZ_RUN_DOCKER_TESTS !== "1" },
  () => run("bash", ["scripts/verify-local-dev.sh"])
);
