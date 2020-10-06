## Topic

```text
Setting up client-side project with Webpack
```

### Additional reading

Webpack:

https://webpack.js.org/

### Exercise 1

`Estimated time: 10-15 min`

#### Webpack setup

Call `yarn init -y` to create empty project.

Call `yarn add -D webpack webpack-cli` to install webpack.

Copy files from assets for your project to have the following structure:

```
 |- package.json
 |- index.html
 |- /src
    |- index.js
```

Create a `webpack.config.js` configuration file:

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

Update `package.json` file:

```json
"build: webpack --config webpack.config.js"
```

Run `yarn build`, dist folder with `main.js` will be 
created.

Move `index.html` file to the dist folder and change 
script src to `main.js`.

Add new section to the `package.json` scripts 
and run to check your output:

```json
{
  "open": "cd dist && npx http-server@0.12.0 -p 7777 -o -c-1"
}
```

It should create a div element with message and add it to dom
to your webpage.

### Exercise 2

`Estimated time: 5-10 min`

#### Webpack - modules

Add new dependency `yarn add query-string`.

Let's make application take query parameter and pass 
it to the API call.

Replace logic to take the name

```js
import qs from "query-string"
const name = qs.parse(window.location.search) || "john";
```

Run `yarn build` and `yarn open`. 

### Notes
