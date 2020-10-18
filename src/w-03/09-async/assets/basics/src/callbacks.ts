import * as fs from "fs";
import * as path from "path";

export function getInstalledAmbientTypesList(configName: string, cb: Callback<PackageJson[]>): void {
    readConfig(configName, (readError, file) => {
        if (readError) {
            logError(readError);
            cb(readError)
        } else {
            parseConfig(file!, (parseError, config) => {
                if (parseError) {
                    logError(parseError);
                    cb(parseError)
                } else {
                    readTypesDirs(config!.dirs, (readTypesErr, typesPaths) => {
                        if (readTypesErr) {
                            logError(readTypesErr);
                            cb(readTypesErr)
                        } else {
                            readPackageJsons(typesPaths!, (errPackageJsonRead, jsonsParsed) => {
                                if (errPackageJsonRead) {
                                    logError(errPackageJsonRead);
                                    cb(errPackageJsonRead)
                                } else {
                                    cb(null, jsonsParsed!.map(f => {
                                        return {
                                            name: f.name,
                                            version: f.version,
                                        }
                                    }).sort((a, b) => {
                                        return a.name.localeCompare(b.name)
                                    }));
                                }
                            })

                        }
                    })
                }
            })
        }
    })
}

type Callback<T> = (err: Error | null, result?: T) => void;

interface Config {
    dirs: string[];
}

function isConfig(obj: any): obj is Config {
    return typeof obj === "object"
        && "dirs" in obj
        && Array.isArray(obj.dirs)
        && obj.dirs.every((s: any) => typeof s === "string")
}

function parseConfig(json: string, cb: Callback<Config>): void  {
    try {
        const parsed = JSON.parse(json);
        if (isConfig(parsed)) {
            cb(null, parsed)
        } else {
            cb(new Error(`Error parsing config`))
        }
    } catch (error) {
        cb(new Error(`Error parsing config ${error}`))
    }
}

function readConfig(name: string, cb: Callback<string>): void {
    fs.readFile(path.join(__dirname, name), { encoding: "utf-8" }, cb);
}

function logError(readError: Error): void {
    if (readError) {
        console.log(readError);
    }
}

function getAllTypesModules(dir: string, cb: Callback<string[]>): void {
    fs.readdir(path.join(process.cwd(), dir), cb)
}

interface TypesPath {
    name: string;
    packageJsonPath: string;
}

function readTypesDirs(dirs: string[], cb: Callback<TypesPath[]>) {
    let counter = 0;
    const resultDirs: TypesPath[] = []
    const cwd = process.cwd();
    dirs.forEach(dir => {
        getAllTypesModules(dir, (readDirErr, readDirs) => {
            counter++;
            if (readDirErr) {
                return cb(readDirErr)
            } else {
                const paths: TypesPath[] = readDirs!.map(name => {
                    return {
                        name: name,
                        packageJsonPath: path.join(cwd, dir, name, "package.json"),
                    };
                })
                resultDirs.push(...paths)
            }
            if (counter === dirs.length) {
                cb(null, resultDirs)
            }
        })
    })
}

interface PackageJson {
    name: string;
    version: string;
}

function readPackageJsons(paths: TypesPath[], cb: Callback<PackageJson[]>) {
    let counter = 0;
    const resultDirs: PackageJson[] = []
    paths.forEach(filePath => {
        fs.readFile(filePath.packageJsonPath, { encoding: "utf-8" }, (readPackageJsonErr, file) => {
            counter++;
            if (readPackageJsonErr) {
                return cb(readPackageJsonErr)
            } else {
                try {
                    resultDirs.push(JSON.parse(file))
                } catch(err) {
                    console.log(err)
                    cb(new Error(`Error parsing json file ${filePath.name} at ${filePath.packageJsonPath}`))
                }
            }
            if (counter === paths.length) {
                cb(null, resultDirs)
            }
        });
    })
}
