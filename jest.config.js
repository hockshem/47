const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testMatch: ['**/test/**/*.test.(ts|js)'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  moduleDirectories: ['node_modules', '.']
};