const assetsKey =
  "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$";

const config = {
  clearMocks: true,
  coveragePathIgnorePatterns: ["/node_modules/", "config/tests"],
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/app/$1",
    [assetsKey]: "ts-jest",
  },
  roots: ["<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/app/**/*.test.tsx"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    [assetsKey]: "ts-jest",
    "\\.svg$": "ts-jest",
  },
};

export default config;
