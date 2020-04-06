# @constgen/neutrino-babel-loader

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-babel-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-babel-loader)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-babel-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-babel-loader)

[Neutrino](https://neutrino.js.org) middleware for enabling the ESNext transpilation.

This middleware is recommended for pure JavaScript projects. For projects with proprietary format it is recommended to use specialized middleware. E.g. for React use [`@constgen/neutrino-react-loader`](https://github.com/constgen/constgen-neutrino/packages/react-loader)

## Features

This middleware enables many features by default with zero configuration

- Typescript support
- Dynamic imports
- Decorators
- Class properties
- Rest spread operators
- Vendor sourcemaps
- EcmaScript transpilation
- Developer friendly chunks files names

## Requirements

- Node.js v10+
- Neutrino v9

## Installation

`@constgen/neutrino-babel-loader` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-babel-loader
```

## Usage

### In preset

Require this package and plug it into Neutrino. The following shows how you can pass an options object to the middleware, showing the **defaults**:

```js
let babelLoader = require('@constgen/neutrino-babel-loader')

neutrino.use(babelLoader({
   babel: {}, // custom Babel options
   test: [], // extend extensions to test besides those that are in `neutrino.options.extensions`
   polyfills: false, // enable EcmaScript polyfills
   targets: { }, // browserlist config
   include: [], // include strategy is always used and you can only extend what is included besides `neutrino.options.source` and `neutrino.options.tests`
   exclude: [] // exclude something from processing that is included
}))
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let babelLoader = require('@constgen/neutrino-babel-loader')

module.exports = {
   use: [
      babelLoader({
         targets: {
            browsers: 'ie 11'
         }
      })
   ]
}
```