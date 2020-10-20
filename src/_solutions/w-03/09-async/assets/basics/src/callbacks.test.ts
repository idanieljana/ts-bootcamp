/**
 * Note: promisify is a Node.js core utility which could be used to
 * improve experience with Node.js callback APIs
 */
import { promisify } from 'util';
import * as path from 'path';
import { getInstalledAmbientTypesList, parsePackageJsonDescription } from './callbacks';

describe('AmbientTypesParser', () => {
  test.skip('should parse config and return installed ambient types', async () => {
    /**
         * Note: npm module `mock-fs` should be used for unit testing with fs
         * https://github.com/tschaub/mock-fs
         */
    const config = './types_config.json';
    const result = await promisify(getInstalledAmbientTypesList)(config);
    expect(result).toMatchSnapshot();
  });
});

describe('package.json parser', () => {
  test.skip('should parse description of passed package.json path', async () => {
    // Hint: use __dirname
    expect(parsePackageJsonDescription).toBe(path.join('', ''));
  });
});
