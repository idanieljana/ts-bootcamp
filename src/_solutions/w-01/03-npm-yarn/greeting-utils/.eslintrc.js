module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "semi": ["error", "always"], // never | always
        "no-console": ["warn"],
        "no-empty": ["warn"],
    },
    "overrides": [
        {
            "files": [
                "**/*.test.js"
            ],
            "env": {
                "jest": true
            }
        }
    ]
};
