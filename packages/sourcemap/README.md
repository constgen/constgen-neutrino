# @constgen/neutrino-sourcemap

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-sourcemap.svg)](https://www.npmjs.com/package/@constgen/neutrino-sourcemap)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-sourcemap.svg)](https://www.npmjs.com/package/@constgen/neutrino-sourcemap)

[Neutrino](https://neutrino.js.org) middleware that automatically enables necessary source maps in development and production

## Requirements

- Node.js v10+
- Neutrino v9

## Installation

`@constgen/neutrino-sourcemap` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-sourcemap
```

## Usage

### In preset

Require this package and plug it into Neutrino. The following shows how you can pass an options object to the middleware, showing the **defaults**:

```js
let sourcemap = require('@constgen/neutrino-sourcemap')

neutrino.use(sourcemap({
   prod: false, // enable source maps in production
   dev: true // enable source maps in development
}))
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let sourcemap = require('@constgen/neutrino-sourcemap')

module.exports = {
   use: [
      sourcemap()
   ]
}
```