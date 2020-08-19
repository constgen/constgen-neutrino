# @constgen/neutrino-optimization

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-optimization.svg)](https://www.npmjs.com/package/@constgen/neutrino-optimization)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-optimization.svg)](https://www.npmjs.com/package/@constgen/neutrino-optimization)

[Neutrino](https://neutrino.js.org) middleware that automatically enables necessary source maps in development and production

## Features

- Human-readable chunk names
- Vendor modules chunks
- Dynamic imports chunks
- Shared modules chunks
- Max size chunks splitting
- JS minification
- CSS minification
- Performance warnings on production only

## Requirements

- Node.js v10+
- Neutrino v9
- Webpack v4

## Installation

`@constgen/neutrino-optimization` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-optimization
```

## Usage

### In preset

Require this package and plug it into Neutrino. The following shows how you can pass an options object to the middleware, showing the **defaults**:

```js
let optimization = require('@constgen/neutrino-optimization')

neutrino.use(optimization({
   chunks  : true, // enable chunks optimization splitting
   minimize: true // enable code minification
}))
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let optimization = require('@constgen/neutrino-optimization')

module.exports = {
   use: [
      optimization()
   ]
}
```