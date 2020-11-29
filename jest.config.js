require('dotenv').config();

module.exports = {
  roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?)$',
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/testHelpers/testSetup.js'],
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/migration',
    '/src/config.ts',
    '/src/testHelpers',
    '/src/index.ts',
    '/src/lib/rollbarTransport.ts',
    '/src/middleware/logger.ts',
  ],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
