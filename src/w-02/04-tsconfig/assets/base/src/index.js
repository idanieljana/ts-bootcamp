const { sum } = require("./utils/join");

const elements = [
    ["1", 2],
    [1, "2"],
    [1, 2],
    ["1", "2"],
]

elements
    .map(([a, b]) => sum(a, b))
    .forEach(el => console.log(el))
