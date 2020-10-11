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
            "files": ["*.ts"],
            "rules": {
                "@typescript-eslint/explicit-module-boundary-types": ["error"],
                "@typescript-eslint/no-explicit-any": ["error"],
                // To omit default exports
                "import/prefer-default-export": "off"
            },
            // To omit: error  'test' |'expect' is not defined    no-undef
            "env": {
                "jest": true
            }
        },
    ]
};