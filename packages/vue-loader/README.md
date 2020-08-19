# @constgen/neutrino-vue-loader

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-vue-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-vue-loader)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-vue-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-vue-loader)

[Neutrino](https://neutrino.js.org) middleware for Vue files

This middleware already includes [`@constgen/neutrino-babel-loader`](https://github.com/constgen/constgen-neutrino/packages/babel-loader)

## Features

This middleware enables many features by default with zero configuration

- Typescript support
- Decorators
- Class properties
- Babel transpilation according to browserlist
- EcmaScript polyfills
- Automatic Vue pragma injection to every JSX fragment

## Requirements

- Node.js v10+
- Neutrino v9
- Webpack v4

## Installation

`@constgen/neutrino-vue-loader` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-vue-loader
```

## Usage

### In preset

Require this package and plug it into Neutrino. The following shows how you can pass an options object to the middleware, showing the **defaults**:

```js
let vueLoader = require('@constgen/neutrino-vue-loader')

neutrino.use(vueLoader({
   babel    : {}, // custom Babel options
   polyfills: false, // enable EcmaScript polyfills
   browsers : ['defaults'], // replace browserlist config
   include  : [], // include strategy is always used and you can only extend what is included besides `neutrino.options.source` and `neutrino.options.tests`
   exclude  : [] // exclude something from processing that is included
}))
```

You may enable usage of `.browserslistrc` file in your project by setting `browsers` option to any falsy value

```js
neutrino.use(vueLoader({
   browsers: undefined // inherit config from `.browserslistrc` or disable if absent
}))
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let vueLoader = require('@constgen/neutrino-vue-loader')

module.exports = {
   use: [
      vueLoader()
   ]
}
```