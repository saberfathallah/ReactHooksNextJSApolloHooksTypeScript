module.exports = {
  automock: false,
  rootDir: '../../',
  setupFiles: ['<rootDir>/config/jest/setupEnzyme.ts'],
  // setupFilesAfterEnv: ["<rootDir>/config/jest/jest.after_setup.js"],
  preset: 'ts-jest',
  // file extesion to test
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/__tests__/**/*.+(js|jsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  // configurate typeScript javascript in file tests
  transform: {
    "\\.(jpg|png|gif)": "<rootDir>/config/jest/__mocks__/fileMock.js",
    "\\.(svg)?inline$ ": "<rootDir>/config/jest/__mocks__/fileMock.js",
    "^.+\\.svg$": "jest-svg-transformer",
    "^.+\\.jsx$": "babel-jest",
    "^.+\\.js$": "babel-jest",
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.ts?$': 'ts-jest',
  },
  // module to import 
  moduleNameMapper: {
    '^@config/(.*)$': '<rootDir>config/$1',
    '^@component/(.*)$': '<rootDir>src/component/$1',
    '^@public/(.*)$': '<rootDir>public/$1',
    '^@constants/(.*)$': '<rootDir>src/constants/$1',
    '^@context/(.*)$': '<rootDir>src/context/$1',
    '^@facade/(.*)$': '<rootDir>src/facade/$1',
    '^@lib/(.*)$': '<rootDir>src/lib/$1',
    '^@graphql/(.*)$': '<rootDir>src/graphql/$1',
    '^@pages/(.*)$': '<rootDir>src/pages/$1',
    '^@services/(.*)$': '<rootDir>src/services/$1',
    '^@utils/(.*)$': '<rootDir>src/utils/$1',
  },
  coverageThreshold: {
    global: {
      branches: 68,
      functions: 77,
      lines: 81,
      statements: 81,
    },
  },
  testPathIgnorePatterns: [
    '.next/',
    'node_modules/',
    'server/',
    '\\stories.(js|jsx|ts|tsx)',
    '.history',
    'config',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'ts',
    'tsx',
    'node',
    'svg',
    'gif',
  ],
  collectCoverageFrom: [
    '**/src/**',
    '!<rootDir>/src/**/stories.{js,jsx,ts,tsx}',
    '!<rootDir>/src/component/**/index.ts',
  ],
  // ignore folder in count coverage
  coveragePathIgnorePatterns: [
    'src/pages/.*',
    '.*/__tests__/.*',
    '.*/config/.*',
    '.*/graphql/.*',
    '.*/lib/.*',
    '.*/context/.*',
  ],
};
