import "colors"
import { exclamate, pow, times } from "greeting-utils"
import { options } from "yargs"

const {
    message,
    power,
} = options({
        message: {
            type: 'string',
            demandOption: true,
            alias: "m"
        },
        power: {
            type: 'number',
            demandOption: true,
            alias: "p"
        },
    }).argv

times(
    () => exclamate(message.random),
    pow(message, power)
);
