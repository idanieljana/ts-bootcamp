import { getInstalledAmbientTypesList } from "./callbacks";

/**
 * Note: promisify is a Node.js core utility which could be used to
 * improve experience with Node.js callback APIs
 */
import { promisify } from "util";

describe("AmbientTypesParser", () => {
    test("should parse config and return installed ambient types", async () => {
        /**
         * Note: npm module `mock-fs` should be used for unit testing with fs
         * https://github.com/tschaub/mock-fs
         */
        const path = "./types_config.json";
        const result = await promisify(getInstalledAmbientTypesList)(path);
        expect(result).toMatchSnapshot();
    });
})