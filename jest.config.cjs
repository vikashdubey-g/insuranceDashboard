/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        isolatedModules: true,
        tsconfig: {
          jsx: "react-jsx",
        },
      },
    ],
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(svg|png|jpg|jpeg|gif)$": "<rootDir>/src/__mocks__/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
