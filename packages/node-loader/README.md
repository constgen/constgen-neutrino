# @constgen/neutrino-node-loader

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-node-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-node-loader)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-node-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-node-loader)

[Neutrino](https://neutrino.js.org) middleware for loading native `*.node` modules

## Requirements

- Node.js v10+
- Neutrino v9
- Webpack v4

## Installation

`@constgen/neutrino-node-loader` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-node-loader
```

## Usage

### In preset

Require this package and plug it into Neutrino. The middleware has no options:

```js
let nodeLoader = require('@constgen/neutrino-node-loader')

neutrino.use(nodeLoader())
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let nodeLoader = require('@constgen/neutrino-node-loader')

module.exports = {
   use: [
      nodeLoader()
   ]
}
```