# Workshop 2: Typescript Project Setup

## Topics described:

- Working with tsconfig
- Setup Jest with Typescript
- Setup eslint with Typescript
- Typescript with bundlers


## Goal:

After this workshop you will know how setup typescript in the project and make it friendly with linter and test library.

## Sections:

1. [04-tsconfig](04-tsconfig/04-tsconfig.md)
2. [05-typescript-eslint-jest](05-typescript-eslint-jest/05-typescript-eslint-jest.md)
3. [06-webpack](06-webpack/06-webpack.md)
4. [07-create-react-app](07-create-react-app/07-create-react-app.md)
5. [08-typescript-parcel](08-typescript-parcel/08-typescript-parcel.md)

## Hometasks:


### Decrypting cypher

Home task 1 for Workshop 2:

Decrypt the following message:

堀堝堤堤堧埘培堟堝堦堬埦埘堑堧堭堪埘堬堙堫堣埘堯堧堭堤堜埘堚堝埘堬堧埘堨堪堧堬堝堛堬埘堦堝堯埘堋堝堛堪堝堬埘堂堙堛堣埘堚堤堭堝堨堪堡堦堬堫埘堙堦堜埘堞堡堦堜埘埽堮堙埘堄堭堲堲堡堧堦

It's known that message decrypted with
Caesar Cypher and has Eva Luzzion agent name in it.

More info about it could be found here:

https://en.wikipedia.org/wiki/Caesar_cipher


### Create an encryption/decryption utility to protect text files

Home task 2

Write a utility which will have the following features:

- could encrypt text files (Notes: let it be "utf-8" encoding; for simplicity - skip encryption of binary files like `.docx`)
- encrypted text files could replace the originals at the same directory or be near the originals (make a flag to control this)
- you could pass a glob pattern as an argument to select which files you want to encrypt
- you could pass an argument to exclude some files by glob pattern 
- you could pass an argument to exclude files by extension 
- you could select any other directory with argument, in this case this new directory will contain only encrypted files.
- you could select with argument an extension of encrypted files.
- encryption key should not be hardcoded, it should be available to pass it as an argument.
- additional flag to make possible create a zip archive from all encrypted files
- it should be possible to decrypt your files (decrypt flag, same functionalities described above are supported (decrypt whole folder/zip archive))
- files should be encrypted with aes256 or safer algorithm (you could use default node.js `crypto` module)

More advanced features:
- Make it possible to upload zip archive with flag to google 
drive (additional logic could be needed to pass the API keys to app)

Requirements:
- project should be written in Typescript
- all features should be covered with unit tests
- linter should be added, airbnb style is recommended, though feel free to customize into your needs
- all workflows described with scripts in `package.json`
- scripts supported include (unit tests coverage report, linting, build the project from typescript to js etc).
- added cold reloading (refer to nodemon workshop)
- all logic is described in separate files (keep a modular structure)
- the part which does encoding/decoding should be isolated from arguments parsing,
so in case the project is built and then imported in another location (you could refer to `yarn link` material), it is possible to reuse it, e.g:
```typescript
import { encode, decode } from "texts-protector";

encode(encodeArgument1, encodeArgument2, etc);

decode(decodeArgument1, decodeArgument2, etc)

// or :
import { protect } from "texts-protector";
 
protect(allArgumentsObject)
```