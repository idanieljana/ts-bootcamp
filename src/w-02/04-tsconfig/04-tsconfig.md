## Topic

```text
Basic project structure with Typescript - 
setting up tsconfig.
```

### Additional reading

tsconfig:

https://www.typescriptlang.org/docs/handbook/tsconfig-json.html


*rm* utility:

https://en.wikipedia.org/wiki/Rm_(Unix)

### Exercise 1

`Estimated time: 10-15 min`

#### Typescript installation and basic config

The presence of a tsconfig.json file in a directory indicates 
that the directory is the root of a TypeScript project. 
The tsconfig.json file specifies the root files and 
the compiler options required to compile the project.

Open `ts-bootcamp/src/w-02/04-tsconfig` dir.

Call `yarn init -y` to generate default `package.json` file.

Install Typescript - `yarn add -D typescript`

Add the following section to the scripts in `package.json`. 

```json
"scripts": {
   "tsc": "tsc"
 },
```

Call `yarn tsc --init`:

```shell script
vlashchanka@MacBook-Pro-Vitali base % yarn tsc --init
yarn run v1.22.4
$ tsc --init
message TS6071: Successfully created a tsconfig.json file.
```

This should generate you the config template.

There are a lot of unneeded parameters.
General advice when working with `tsconfig` - use only those
parameters you need. Don't add something
you don't fully understand.

So let's clean the config and leave only
the following properties for now:

```json
{
  "compilerOptions": {
    "outDir": "lib",
    "lib": ["ES2019"],
    "module": "commonjs",
    "target": "ES2019"
  },
  "include": [
    "**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

There is a github page in Typescript project
with recommended settings for Node.js LTS v.12.x.x we have: 

https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping#node-12

-----

Here are the comments regarding left configuration.

`include`, `exclude` - patterns to control
 compiler final output
 
`"compilerOptions.outDir": "lib",` location where
compiled JS would be stored with declaration files
and sourcemaps.

`"compilerOptions.module": "commonjs",`: frequently used
 values are "commonjs" (require/module.exports)
 or "ES2015" (import/export keywords)
 - commonjs is the standard Node module system, let's use
 it
 
Commonjs pattern:
 ```javascript
var notify = require('./notify.js');
exports.click = function() {
    notify()
}
```
ES6 pattern:
```javascript
import notify from './notify.js';

export function click() {
    notify()
}
```

`"compilerOptions.target": "ES2019"` - this will tell
the compiler which ECMAScript target version to output.
► "ES3" (default) ► "ES5" ► "ES6"/"ES2015" ► "ES2016"
► "ES2017" ► "ES2018" ► "ES2019" ► "ES2020" ► "ESNext"

More information on versions could be found here:
https://en.wikipedia.org/wiki/ECMAScript


`"compilerOptions.lib": "ES2019"` -
library files to be included in the compilation,
with --lib you can specify a list of built-in
API declaration groups that you can choose to include
in your project. E.g. if you expect your browser runtime to have
support for Map, Set and Promise (e.g. most evergreen browsers),
just include --lib es2015.collection,es2015.promise.

-----

### Exercise 2

`Estimated time: 5-10 min`

#### Node.js ambient types - @types/node

Now we are ready to check how compiler works.

Create dummy `index.ts` file and add 
the following contents from previous lessons:

```typescript
function pow(message: string, power = 2): number {
    return Math.pow(message.length, power);
}

const power = parseInt(process.env.power) || 3;

console.log(pow("hello", power));
```

Call `yarn tsc` again and see the output:

```shell script
index.ts:5:15 - error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i @types/node`.

5 const power = process.env.power || 3;
                ~~~~~~~
```  

We will need additional types for Nodejs setup:

`Global values: Buffer, __dirname, __filename,
clearImmediate, clearInterval, clearTimeout,
console, exports, global, module, process, queueMicrotask,
require, setImmediate, setInterval, setTimeout`

Install `yarn add -D @types/node` - https://www.npmjs.com/package/@types/node

Run `yarn tsc`, now it should compile successfully:

```shell script
$ tsc
✨  Done in 1.33s.
``` 

### Exercise 3

`Estimated time: 5 min`

#### Build preparation

Now take a look at the `lib` folder.

If there is `index.js` then your file compiled correctly.

To be sure output contains fresh files we need additional
step to clear lib folder.

Install *rimraf* module `yarn add -D rimraf` which is
cross-platform equivalent to `rm` utility. 

Now extend the scripts section in `package.json`
```json
"clear": "rimraf lib",
"build": "yarn clear && yarn tsc",
```

- Run `yarn clear` and verify `lib` folder was deleted.
- Run `yarn build` and verify that `lib` folder is presented with output.

### Exercise 4

`Estimated time: 5-10 min`

#### Cold reloading

Having build process is great, however it is 
not convenient as you work.

Cold reloading technique is nice for local development. 
In order to do this, we'll need to rely on a couple more 
packages: `ts-node` for running TypeScript code directly 
without having to wait for it be compiled, and `nodemon`, 
to watch for changes to our code and automatically restart 
when a file is changed.

`yarn add -D ts-node` - install `ts-node`

`yarn add -D nodemon` - install `nodemon`

Add a `nodemon.json` config:

```json
{
  "watch": ["src"],
  "ext": ".ts",
  "ignore": [],
  "exec": "ts-node ./src/index.ts"
}
```

Move `index.ts` file to `src` folder.

Adjust the `tsconfig` `include` section:
```json
"include": [
  "src/**/*.ts"
],
```

Extend `package.json` scripts section with:

```json
"start:watch": "nodemon",
```

Run this command with `yarn start:watch`, you should see something like :

```shell script
$ nodemon
[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src/**/* yarn.lock
[nodemon] watching extensions: ts
[nodemon] starting `ts-node ./src/index.ts`
5
```

### Exercise 5

`Estimated time: 5-10 min`

#### Declaration files and sourcemaps

We already described the purpose and of declaration files.

We will need one more part in the puzzle - sourcemaps.

Final JS running is machine-generated.
When compiled, it's much easier to debug the original source, 
rather than the source in the transformed state.
A source map is a file that maps from the transformed source to the original source, 
enabling  to reconstruct the original source and present the reconstructed original 
in the debugger.

Let's extend `tsconfig` `compilerOptions` section 
with the following settings: 

```json
"sourceMap": true,
"declaration": true,
```

Now run the `yarn build` and open the lib folder:

```
index.d.ts - the declaration file
index.js - the compiled source
index.js.map - the sourcemap
```

### Notes

Source maps explanation:

https://medium.com/@trungutt/yet-another-explanation-on-sourcemap-669797e418ce



