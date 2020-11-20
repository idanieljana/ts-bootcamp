const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: "jsdom", /** In case of Node.js env tests: testEnvironment: 'node', */
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
  ],
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "\\.pcss$": path.resolve(__dirname, "./test/CSSModulesProcessor.js"),
    "\\.css$": path.resolve(__dirname, "./test/CSSModulesProcessor.js"),
    "\\.ogg": path.resolve(__dirname, "./test/fileProcessor.js"),
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
};
