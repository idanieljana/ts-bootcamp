## Topic

```text
Simple project structure for server-side web application.
In this section we will take a look at the very trivial project setup
in Node.js.
```

### Additional reading


Node.js: https://nodejs.org/en/

Node.js hello world example: https://nodejs.org/en/docs/guides/getting-started-guide/

Node.js module exports: https://www.tutorialsteacher.com/nodejs/nodejs-module-exports

HTTP headers | Content-Type:  https://www.geeksforgeeks.org/http-headers-content-type/

Chuck Norris biography: https://en.wikipedia.org/wiki/Chuck_Norris

### Exercise 1

`Estimated time: 5 min`

Create a basic project structure with the following shape:

- `/index.js` a dummy file

Replace your dummy js file with the hello world example from the official documentation

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Run in the terminal

```shell script
node index.js
```
Your console should print (if no errors like port already in use) the following output:

```shell script
$ 02-nodejs-base % node index.js
Server running at http://127.0.0.1:3000/
```

Open the url in the browser and you will see the greeting:

![image](assets/nodejs-base-1.png)


### Exercise 2

`Estimated time: 15-20 min`

Update project structure with the following shape:
- `/src`
    - `/cn.js` - copy file content from `src/w-01/02-nodejs-base/assets/cn.js`
- `/index.js` - keep existing file

Your task here will be to create a simple
web application that will interact with http://api.icndb.com/jokes/random API and return
the random joke about Chuck Norris
and output it on the webpage:

![image](assets/nodejs-base-2.png)

How to do it:

1) Prepare a web server to return html page
2) Write http call to the api to get the joke
3) Prepare html markup template

The best option to create a webserver for the
beginner could be the express.

Create a new project with `npm init`

Install `express` nodejs module https://www.npmjs.com/package/express

Replace `index.js` with the express botstrap code:

```javascript
const express = require('express')
const app = express()
 
app.get('/', (req, res) => {
  res.send('Hello World')
})
 
app.listen(3000)
```

For http call we could use the `node-fetch`
(https://www.npmjs.com/package/node-fetch) library.

It could be recommended for you to start, as it is similar to
Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Other options: nodejs core http module, axios, got libraries.

Install `node-fetch` library
(https://www.npmjs.com/package/node-fetch)

### Notes

Take in mind your output, good frameworks have additional filtering
and protection against code injections.

More information on the topic:

XSS attacking: https://owasp.org/www-community/attacks/xss/

HTML Sanitizing and XSS prevention libraries:

https://www.npmjs.com/package/sanitize-html

https://www.npmjs.com/package/xss

Nodejs __dirname:

https://www.digitalocean.com/community/tutorials/nodejs-how-to-use__dirname#:~:text=__dirname%20tells%20you%20the,containing%20the%20currently%20executing%20file.&text=If%20you%20noticed%2C%20__dirname,js%20utility)%20is%20different.



