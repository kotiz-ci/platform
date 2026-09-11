import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

const composePath = "infra/docker/docker-compose.dev.yml";
const backendConfigPath = "apps/backend/src/main/resources/application-local.yml";
const migrationPath =
  "apps/backend/src/main/resources/db/migration/V1__initialize_technical_baseline.sql";
const migrationGuidePath = "infra/docker/README.md";

function loadComposeConfig() {
  return JSON.parse(
    execFileSync("docker", ["compose", "-f", composePath, "config", "--format", "json"], {
      encoding: "utf8",
    })
  );
}

test("local PostgreSQL and Spring use separate migration and application roles", () => {
  const compose = loadComposeConfig();
  const postgres = compose.services.postgres;
  const backend = compose.services.backend;

  assert.equal(postgres.environment.POSTGRES_USER, "kotiz_admin");
  assert.equal(backend.environment.SPRING_DATASOURCE_USERNAME, "kotiz_app");
  assert.equal(backend.environment.SPRING_FLYWAY_USER, "kotiz_migrator");
  assert.deepEqual(backend.secrets.map(({ target }) => target).sort(), [
    "spring.datasource.password",
    "spring.flyway.password",
  ]);
  assert.ok(
    postgres.volumes.some(
      ({ target, type, read_only: readOnly }) =>
        target === "/docker-entrypoint-initdb.d" && type === "bind" && readOnly
    )
  );

  const backendConfig = readFileSync(backendConfigPath, "utf8");
  assert.match(backendConfig, /username: \$\{SPRING_DATASOURCE_USERNAME:kotiz_app\}/);
  assert.match(backendConfig, /user: \$\{SPRING_FLYWAY_USER:kotiz_migrator\}/);
});

test("the first migration is technical and creates no business table", () => {
  const migration = readFileSync(migrationPath, "utf8");

  assert.match(migration, /COMMENT ON SCHEMA public/);
  assert.doesNotMatch(migration, /CREATE\s+TABLE/i);
  assert.doesNotMatch(
    migration,
    /\b(iam|savings|agents|payments|notifications|admin|ledger|health|scoring|whatsapp|growth|ussd)\b/i
  );
});

test("the migration guide requires additive corrections", () => {
  const guide = readFileSync(migrationGuidePath, "utf8");

  assert.match(guide, /migration déjà\s+fusionnée est immuable/i);
  assert.match(guide, /nouvelle version additive/i);
});
