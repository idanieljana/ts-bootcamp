const http = require("http");

function getChuckNorrisMarkup(joke) {
    return `<div>
                <img alt="logo" src="${getChuckNorrisBase64Image()}"/>
                <br/>
                <h1>${joke}</h1>
            </div>`
}

function getChuckNorrisJoke(callback) {
    const url = 'http://api.icndb.com/jokes/random';
    const defaultJoke = getDefaultRandomJoke();
    http.get(url, res => {
        let body = '';
        res.on("data", chunk => body += chunk);
        res.on("end",() => {
            try {
                const response = JSON.parse(body);
                callback(response.value.joke || defaultJoke)
            } catch (e) {
                console.log("Got an error: ", e);
                callback(defaultJoke)
            }

        });
    });
}

function getChuckNorrisBase64Image() {
    return "data:image/png;base64,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";
}

function getDefaultRandomJoke() {
    // TODO: Randomize jokes
    const n = 0;
    const jokes = [
        "Chuck Norris doesn't need a debugger, he just stares down the bug until the code confesses.",
        "No one has ever pair-programmed with Chuck Norris and lived to tell about it.",
    ];
    return jokes[n]
}

// TODO: module export