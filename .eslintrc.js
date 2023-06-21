module.exports = {
  root: true,
  extends: ['@react-native-community', '@callstack'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {devDependencies: ['**/*.test.tsx']},
    ],
  },
};
