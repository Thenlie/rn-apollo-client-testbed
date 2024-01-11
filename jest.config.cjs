module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: [
    require.resolve("jest-enzyme/lib/index.js"),
    "@testing-library/jest-native/extend-expect",
  ],
  modulePathIgnorePatterns: ["<rootDir>/node_modules"],
  coverageDirectory: "./artifacts/unit",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  coverageReporters: ["json-summary", "lcov"],
  reporters: ["default"],
  collectCoverage: true,
  testTimeout: 25000,
};
