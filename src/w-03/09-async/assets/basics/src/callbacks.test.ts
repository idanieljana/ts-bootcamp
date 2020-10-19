import {getInstalledAmbientTypesList, parsePackageJsonDescription} from "./callbacks";

/**
 * Note: promisify is a Node.js core utility which could be used to
 * improve experience with Node.js callback APIs
 */
import { promisify } from "util";
import * as path from "path";

describe("AmbientTypesParser", () => {
    test.skip("should parse config and return installed ambient types", async () => {
        /**
         * Note: npm module `mock-fs` should be used for unit testing with fs
         * https://github.com/tschaub/mock-fs
         */
        const path = "./types_config.json";
        const result = await promisify(getInstalledAmbientTypesList)(path);
        expect(result).toMatchSnapshot();
    });
})


describe("package.json parser", () => {
    test.skip("should parse description of passed package.json path", async () => {
        const packageJsonPath = path.join(__dirname, "..", "package.json");
        const result = await promisify(parsePackageJsonDescription)(packageJsonPath);
        expect(result).toBe("A module with exercises for async code topic");
    });
})