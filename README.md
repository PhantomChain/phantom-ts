# TSPHANTOM

> An PHANTOM API wrapper, written in TypeScript to interact with PHANTOM blockchain.

[![npm](https://img.shields.io/npm/dt/phantom-ts.svg)]()
[![npm](https://img.shields.io/npm/v/phantom-ts.svg)]()
[![license](https://img.shields.io/github/license/phantomchain/phantom-ts.svg)]()

TSPHANTOM is a library client designed to facilitate how you interact with the PHANTOM blockchain.

## Why TypeScript

  * TypeScript is is a superset of JavaScript which mainly offers optional static typing, classes, and interfaces. The learning curve is not that steep.
  * Types are optional, TSPHANTOM compiles into ES5 so you can work with both, ECMAScript or TypeScript.
  * A better development experience, including auto-complete and fully documented.

## Installation

TSPHANTOM is avaliable from `npm`.

```bash
yarn add phantom-ts
```

or

```bash
npm i phantom-ts --save
```

## Usage

For the best TypeScript experience, you should either use [Visual Studio Code](http://code.visualstudio.com/), or a [plug-in for your favorite text editor](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support).

### Basic Examples

> Get delegate list from Devnet network.

```js
import { Client, Network, NetworkType } from 'phantom-ts';

const devnet = Network.getDefault(NetworkType.Devnet);
const client = new Client(devnet);

client.delegate.list().subscribe((list) => {
  console.log(list);
});
```

> Get address from passphrase.

```js
import { PrivateKey } from 'phantom-ts/core';

// if no specify a second param, default is mainnet
const key = PrivateKey.fromSeed('my secret passphrase');
console.log(key.getPublicKey().getAddress()); // AaWU6X3pGdtSCK3s9weo9tjth64F3hixgT
```

For more examples please see documentation or look for tests in each directory.

## Running the tests

```bash
npm run test
```

## Security

If you discover a security vulnerability within this project, please send an e-mail to security@phantom.org. All security vulnerabilities will be promptly addressed.

## Contributing

  * If you find any bugs, submit an [issue](../../issues) or open [pull-request](../../pulls), helping us catch and fix them.

## License

TSPHANTOM is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
