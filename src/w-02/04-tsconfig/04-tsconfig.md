## Topic

```text
Basic project structure with Typescript - 
setting up tsconfig.
```

### Additional reading

tsconfig:

https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

Typescript Strict Mode
https://www.typescriptlang.org/tsconfig#strict

*rm* utility:

https://en.wikipedia.org/wiki/Rm_(Unix)

### Exercise 1

`Estimated time: 10-15 min`

The presence of a tsconfig.json file in a directory indicates 
that the directory is the root of a TypeScript project. 
The tsconfig.json file specifies the root files and 
the compiler options required to compile the project.


Open base project
`ts-bootcamp/src/w-02/04-tsconfig/assets/base` dir.

Call `yarn init -y` to generate default `package.json` file.

Install Typescript - `yarn add -D typescript`.

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

Returning back to setting up project:

We will need additional types for Nodejs setup:

`Global values: Buffer, __dirname, __filename,
clearImmediate, clearInterval, clearTimeout,
console, exports, global, module, process, queueMicrotask,
require, setImmediate, setInterval, setTimeout`

Install `yarn add -D @types/node` - https://www.npmjs.com/package/@types/node

Now we are ready to check how compiler works.

Create dummy `index.ts` file with `console.log(42)`.

Run `yarn tsc` and see the lib folder.

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

Run `yarn clear` to verify that command works.


### Exercise 2

TODO: 


### Notes


`"strict": true,` will enable typescript strict mode:

https://www.typescriptlang.org/tsconfig#strict

It will force you, e.g. initialize your parameters
types and init class properties values.





