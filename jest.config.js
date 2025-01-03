/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '@(.*)': ['node_modules/@$1', 'src/$1'],
  },
  fakeTimers: {
    enableGlobally: true,
  },
  moduleDirectories: ['node_modules', 'utils', __dirname],
};
