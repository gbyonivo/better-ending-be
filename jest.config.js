/** @type {import('ts-jest').JestConfigWithTsJest} **/

module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  preset: 'ts-jest',
  // setupFiles: ['./test-setup.js'],
  setupFilesAfterEnv: ['./test-setup.js'],
}
