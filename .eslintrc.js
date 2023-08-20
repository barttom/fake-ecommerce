module.exports = {
  root: true,
  extends: ['@react-native-community', '@callstack'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {devDependencies: ['**/*.test.tsx']},
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
        'react-native/no-raw-text': [
          2,
          {
            skip: ['Button', 'Chip', 'Snackbar'],
          },
        ],
      },
    },
  ],
};
