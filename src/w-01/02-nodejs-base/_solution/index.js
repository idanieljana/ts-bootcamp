const express = require('express')
const path = require('path')
const {
    getChuckNorrisJoke,
    getChuckNorrisBase64Image
} = require("./src/cn");

const app = express()

const viewsPath = path.join(__dirname, 'views');
app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    getChuckNorrisJoke(joke => {
        res.render("index", {
            image: getChuckNorrisBase64Image(),
            joke: joke,
        })
    })
})
app.listen(3000)