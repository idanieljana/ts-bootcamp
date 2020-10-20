/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable consistent-return */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Demo for callback API
 */
export function getInstalledAmbientTypesList(name: string, cb: Callback<PackageJson[]>): void {
  readConfig(name, (readError, file) => {
    if (readError) {
      logError(readError);
      cb(readError);
    } else {
      parseConfig(file!, (parseError, config) => {
        if (parseError) {
          logError(parseError);
          cb(parseError);
        } else {
          readTypesDirs(config!.dirs, (readTypesErr, typesPaths) => {
            if (readTypesErr) {
              logError(readTypesErr);
              cb(readTypesErr);
            } else {
              readPackageJsons(typesPaths!, (errPackageJsonRead, jsonsParsed) => {
                if (errPackageJsonRead) {
                  logError(errPackageJsonRead);
                  cb(errPackageJsonRead);
                } else {
                  cb(null, jsonsParsed!.map((f) => ({
                    name: f.name,
                    version: f.version,
                    description: f.description,
                  })).sort((a, b) => a.name.localeCompare(b.name)));
                }
              });
            }
          });
        }
      });
    }
  });
}

/**
 * Implement simple Type Guard for package.json config parsing
 */
function isPackageJsonConfig(obj: any): obj is PackageJson {
  return false; // Not implemented
}

/**
 * Implement method to parse package.json description
 */
export function parsePackageJsonDescription(packageJsonPath: string, cb: Callback<string>): void {
  isPackageJsonConfig({});
  cb(new Error('Not implemented'));
}

interface PackageJson {
  name: string;
  version: string;
  description: string;
}

type Callback<T> = (err: Error | null, result?: T) => void;

interface Config {
  dirs: string[];
}

function isConfig(obj: any): obj is Config {
  return typeof obj === 'object'
        && 'dirs' in obj
        && Array.isArray(obj.dirs)
        && obj.dirs.every((s: any) => typeof s === 'string');
}

function parseConfig(json: string, cb: Callback<Config>): void {
  try {
    const parsed = JSON.parse(json);
    if (isConfig(parsed)) {
      cb(null, parsed);
    } else {
      cb(new Error('Error parsing config'));
    }
  } catch (error) {
    cb(new Error(`Error parsing config ${error}`));
  }
}

function readConfig(name: string, cb: Callback<string>): void {
  fs.readFile(path.join(__dirname, name), { encoding: 'utf-8' }, cb);
}

function logError(readError: Error): void {
  if (readError) {
    console.log(readError);
  }
}

function getAllTypesModules(dir: string, cb: Callback<string[]>): void {
  fs.readdir(path.join(process.cwd(), dir), cb);
}

interface TypesPath {
  name: string;
  packageJsonPath: string;
}

function readTypesDirs(dirs: string[], cb: Callback<TypesPath[]>) {
  let counter = 0;
  const resultDirs: TypesPath[] = [];
  const cwd = process.cwd();
  dirs.forEach((dir) => {
    getAllTypesModules(dir, (readDirErr, readDirs) => {
      counter += 1;
      if (readDirErr) {
        return cb(readDirErr);
      }
      const paths: TypesPath[] = readDirs!.map((name) => ({
        name,
        packageJsonPath: path.join(cwd, dir, name, 'package.json'),
      }));
      resultDirs.push(...paths);

      if (counter === dirs.length) {
        cb(null, resultDirs);
      }
    });
  });
}

function readPackageJsons(paths: TypesPath[], cb: Callback<PackageJson[]>) {
  let counter = 0;
  const resultDirs: PackageJson[] = [];
  paths.forEach((filePath) => {
    fs.readFile(filePath.packageJsonPath, { encoding: 'utf-8' }, (readPackageJsonErr, file) => {
      counter += 1;
      if (readPackageJsonErr) {
        return cb(readPackageJsonErr);
      }
      try {
        resultDirs.push(JSON.parse(file));
      } catch (err) {
        logError(err);
        cb(new Error(`Error parsing json file ${filePath.name} at ${filePath.packageJsonPath}`));
      }

      if (counter === paths.length) {
        cb(null, resultDirs);
      }
    });
  });
}
