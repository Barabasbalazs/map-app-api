import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    environment: "./tests/settings/test-environment.ts",
    reporters: ["default", "html"],
    //setupFiles: ["./tests/test-settings/test-setup.ts"],
    include: ["tests/**/*.test.ts"],
    coverage: {
      enabled: true,
      provider: "v8",
      clean: true,
      cleanOnRerun: true,
      reporter: ["text", "json", "html", "lcov"],
      //if coverage does not meet thresholds, test will fail and build process will be aborted
    exclude: [
        ...(configDefaults.coverage.exclude ?? []),
        "node_modules",
        "build",
        "src/constants",
        "src/@types",
        "src/config",
        "src/server.ts",
        "test/settings",
        "html/",
        "src/plugins/options"
    ],
      //if true report will be generated even if tests fail
      reportOnFailure: true,
    },
  },
});