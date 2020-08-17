# @constgen/neutrino-react-loader

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-react-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-react-loader)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-react-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-react-loader)

[Neutrino](https://neutrino.js.org) middleware for React files

This middleware already includes [`@constgen/neutrino-babel-loader`](https://github.com/constgen/constgen-neutrino/packages/babel-loader)

## Features

This middleware enables many features by default with zero configuration

- Typescript support
- Decorators
- Class properties
- Automatic React runtime inject to every JSX file
- Resolve URLs in JSX like in HTML for these elements: `img[src]`, `link[href]`, `Image[src]`, `video[src]`, `Video[src]`, `audio[src]`, `Audio[src]`
- Remove prop types in production

## Requirements

- Node.js v10+
- Neutrino v9

## Installation

`@constgen/neutrino-react-loader` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-react-loader
```

## Usage

### In preset

Require this package and plug it into Neutrino. The following shows how you can pass an options object to the middleware, showing the **defaults**:

```js
let reactLoader = require('@constgen/neutrino-react-loader')

neutrino.use(reactLoader({
   babel: {}, // custom Babel options
   polyfills: false, // enable EcmaScript polyfills
   browsers: [
      'last 2 Chrome major versions',
      'last 2 Firefox major versions',
      'last 2 Edge major versions',
      'last 2 Opera major versions',
      'last 2 Safari major versions',
      'last 2 iOS major versions',
      'ie 11'
   ], // replace browserlist config
   include: [], // include strategy is always used and you can only extend what is included besides `neutrino.options.source` and `neutrino.options.tests`
   exclude: [] // exclude something from processing that is included
}))
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let reactLoader = require('@constgen/neutrino-react-loader')

module.exports = {
   use: [
      reactLoader()
   ]
}
```