const http = require("http");

const { getChuckNorrisJoke, getChuckNorrisMarkup } = require("./src/cn");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    getChuckNorrisJoke(joke => {
        res.end(getChuckNorrisMarkup(joke))
    })
});

server.listen(port, hostname, () => {
    console.log(`Chuck Norris is waiting you: http://${hostname}:${port}/`);
});