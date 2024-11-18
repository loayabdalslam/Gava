export default {
    testEnvironment: 'node',
    transform: {},
    extensionsToTreatAsEsm: ['.js', '.ts'],
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1'
    }
  };