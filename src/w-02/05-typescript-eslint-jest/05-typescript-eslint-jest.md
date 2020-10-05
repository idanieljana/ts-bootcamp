## Topic

```text
Setting up eslint and jest with Typescript
```

### Additional reading

Typescript ESLint:

https://github.com/typescript-eslint/typescript-eslint

Typescript Jest:

https://jestjs.io/docs/en/getting-started#using-typescript

https://github.com/kulshekhar/ts-jest


### Exercise 1

`Estimated time: 10-15 min`

#### TS-Jest installation and basic config

Call `yarn init -y` to create empty project.

Call `yarn add -D jest typescript` to add jest and typescript

Call `yarn add -D ts-jest @types/jest` 
to install `ts-jest` and ambient types for jest.

Call the command `yarn ts-jest config:init`, it should 
generate you the jest config:

```shell script
Jest configuration written to 
"ts-bootcamp/src/w-02/05-typescript-eslint-jest/jest.config.js".
```

With the following contents:

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

Add a new section to `package.json`:

```json
  "scripts": {
    "test": "jest"
  },
```

Run `yarn test` and verify that jest is running, but failing that there are no tests.

Copy `ts-bootcamp/src/w-02/05-typescript-eslint-jest/assets/src` base folder
to your root `ts-bootcamp/src/w-02/05-typescript-eslint-jest`.

Run `yarn test --watch` - it should enable Jest watch mode 
that will automatically enable Jets reruns based on file system changes.

Now your task is to write a first unit test for `sum.test.ts` file.


### Exercise 2

`Estimated time: 10-15 min`

#### Code coverage

Update `package.json` scripts section with new command:

`"test:coverage": "jest --coverage"`

Run `yarn test:coverage`.

It should generate you the coverage report:

![image](assets/coverage.png)

However, we have only sum function coverage, 
if we want to have coverage for all the codebase, we will need
additional parameter `collectCoverageFrom`.

Update your config to have the line `collectCoverageFrom: ['src/**/*.ts'],`:

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts'],
};
```

Run `yarn test:coverage` again. You should get the `subtract` 
function report.

![image](assets/coverage_full.png)

### Exercise 3

`Estimated time: 5-10 min`

#### Coverage report

You may notice that now your folder contains a `coverage` folder.
It has html report inside. Let's open it with previously learned 
npm module `http-server`:

Let's add one more item to scripts section in the `package.json`:

`"test:report": "cd coverage/lcov-report && npx http-server@0.12.0 -p 7777 -o"`

Run `yarn test:report`.

You should see the similar report in opened page:

![image](assets/coverage_report.png)

### Exercise 4

`Estimated time: 10-15 min`

#### ESLint with Typescript