require("colors");
const reverse = require("ascii-art-reverse");
const fs = require("fs")

const DANCING_BEAR = fs.readFileSync("./bear.ascii", "utf-8");

setInterval(() => {
    console.log(DANCING_BEAR.green);
}, 500)

setTimeout(() => {
    setInterval(() => {
        const reversed = reverse(DANCING_BEAR).red
        console.log(reversed)
        console.log("\007")
    }, 500)
}, 250)