import Constants from "expo-constants";

import { expectedRolesForVariant, getAppVariant, isAgentApp, isClientApp } from "@/shared/config";
import { resolveAppVariant } from "@/shared/config/variant-policy";

jest.mock("expo-constants", () => ({
  __esModule: true,
  default: { expoConfig: { extra: {} as { variant?: string } } },
}));

const extra = Constants.expoConfig!.extra as { variant?: string };

test("resolves only the supported mobile application variants", () => {
  expect(resolveAppVariant("agent")).toBe("agent");
  expect(resolveAppVariant("client")).toBe("client");
  expect(resolveAppVariant(undefined)).toBe("client");
  expect(resolveAppVariant("unsupported")).toBe("client");
});

test("maps each application variant to its backend role", () => {
  expect(expectedRolesForVariant("agent")).toEqual(["AGENT"]);
  expect(expectedRolesForVariant("client")).toEqual(["CLIENT"]);
});

test("reads the Expo variant through the runtime adapter", () => {
  extra.variant = "agent";
  expect(getAppVariant()).toBe("agent");
  expect(isAgentApp()).toBe(true);
  expect(isClientApp()).toBe(false);

  extra.variant = "client";
  expect(getAppVariant()).toBe("client");
  expect(isAgentApp()).toBe(false);
  expect(isClientApp()).toBe(true);
});
