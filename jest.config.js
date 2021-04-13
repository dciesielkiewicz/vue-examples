module.exports = {
  moduleNameMapper: {
    "@tests/(.*)": "<rootDir>/tests/$1",
  },
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  setupFilesAfterEnv: ["./tests/setup.ts"],
};
