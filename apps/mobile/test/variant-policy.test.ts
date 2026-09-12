import assert from "node:assert/strict";
import { mock, test } from "node:test";

import { expectedRolesForVariant, resolveAppVariant } from "../lib/variant-policy.ts";

test("resolves only the supported mobile application variants", () => {
  assert.equal(resolveAppVariant("agent"), "agent");
  assert.equal(resolveAppVariant("client"), "client");
  assert.equal(resolveAppVariant(undefined), "client");
  assert.equal(resolveAppVariant("unsupported"), "client");
});

test("maps each application variant to its backend role", () => {
  assert.deepEqual(expectedRolesForVariant("agent"), ["AGENT"]);
  assert.deepEqual(expectedRolesForVariant("client"), ["CLIENT"]);
});

test("reads the Expo variant through the runtime adapter", async () => {
  const constants = { expoConfig: { extra: { variant: "agent" } } };
  mock.module("expo-constants", { defaultExport: constants });
  const { getAppVariant, isAgentApp, isClientApp } = await import("../lib/variant.ts");

  assert.equal(getAppVariant(), "agent");
  assert.equal(isAgentApp(), true);
  assert.equal(isClientApp(), false);

  constants.expoConfig.extra.variant = "client";
  assert.equal(getAppVariant(), "client");
  assert.equal(isAgentApp(), false);
  assert.equal(isClientApp(), true);
});
