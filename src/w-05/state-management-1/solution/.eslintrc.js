module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript',
  ],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-module-boundary-types": ["error"],
        "@typescript-eslint/no-explicit-any": ["error"],
        "react/prop-types": "off",
        "react/jsx-one-expression-per-line": "off",
        "import/prefer-default-export": "off"
      },
      "env": {
        "jest": true
      }
    },
  ]
};
