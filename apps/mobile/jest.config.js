/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-expo",
  roots: ["<rootDir>/test"],
  testMatch: ["**/*.test.ts?(x)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.css$": "<rootDir>/test/mocks/style.js",
  },
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "src/**/*.{ts,tsx}",
    "!src/**/index.{ts,tsx}",
    "!src/shared/ui/theme.ts",
  ],
  coverageThreshold: {
    global: { lines: 80, functions: 80, branches: 80, statements: 80 },
  },
};
