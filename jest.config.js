/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/tests/test-settings/setup-env.ts"],
  setupFilesAfterEnv: ["<rootDir>/tests/test-settings/setup-tests.ts"],
  coverageProvider: "v8",
  coverageDirectory: "<rootDir>/coverage",
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/build",
    "<rootDir>/src/constants",
    "<rootDir>/src/@types",
    "<rootDir>/src/config",
    "<rootDir>/src/server.ts",
  ],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageReporters: ["text", "json", "html"],
  testPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/build"],
  transform: {
    "<rootDir>/node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^(\\.\\.?\\/.+)\\.jsx?$": "$1",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!variables/.*)"],
};
