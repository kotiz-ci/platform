import assert from "node:assert/strict";
import { test } from "node:test";

import { formatFcfa, parseFcfa } from "../src/fcfa.ts";
import { guessOperator, isValidPhoneCI, normalizePhoneCI } from "../src/phone.ts";
import {
  ADMIN_ROLES,
  FIELD_ROLES,
  isAdminRole,
  isFieldRole,
  KOTIZ_ROLES,
  violatesSod,
} from "../src/rbac.ts";

test("formats and parses FCFA amounts at the public utility boundary", () => {
  assert.equal(formatFcfa(125000), "125 000 FCFA");
  assert.equal(formatFcfa(-1250.6, { withSuffix: false }), "-1 251");
  assert.equal(formatFcfa(Number.POSITIVE_INFINITY), "0 FCFA");
  assert.equal(parseFcfa("125 000 FCFA"), 125000);
  assert.equal(parseFcfa("12,5"), 12.5);
  assert.ok(Number.isNaN(parseFcfa("not an amount")));
});

test("normalizes Ivorian phone numbers and identifies supported prefixes", () => {
  assert.equal(normalizePhoneCI("07 07 07 07 07"), "+2250707070707");
  assert.equal(normalizePhoneCI("+225 05 01 02 03 04"), "+2250501020304");
  assert.equal(normalizePhoneCI("123"), null);
  assert.equal(normalizePhoneCI("+225 07 07 07 07 07 99"), null);
  assert.equal(isValidPhoneCI("01 02 03 04 05"), true);
  assert.equal(isValidPhoneCI("invalid"), false);
  assert.equal(guessOperator("07 00 00 00 00"), "orange");
  assert.equal(guessOperator("05 00 00 00 00"), "mtn");
  assert.equal(guessOperator("01 00 00 00 00"), "moov");
  assert.equal(guessOperator("00 00 00 00 00"), "unknown");
  assert.equal(guessOperator("invalid"), "unknown");
});

test("exposes the RBAC role families and separation-of-duties rules", () => {
  assert.equal(KOTIZ_ROLES.length, 8);
  assert.deepEqual(FIELD_ROLES, ["CLIENT", "AGENT"]);
  assert.equal(ADMIN_ROLES.length, 6);
  assert.equal(isAdminRole("OPS"), true);
  assert.equal(isAdminRole("CLIENT"), false);
  assert.equal(isFieldRole("AGENT"), true);
  assert.equal(isFieldRole("AUDITOR"), false);
  assert.equal(violatesSod("RISK", "FINANCE"), true);
  assert.equal(violatesSod("AUDITOR", "OPS"), true);
  assert.equal(violatesSod("CLIENT", "AGENT"), false);
});
