# @constgen/neutrino-image-loader

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-image-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-image-loader)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-image-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-image-loader)

[Neutrino](https://neutrino.js.org) middleware for image files

## Requirements

* Node.js v10+
* Neutrino v9

## Installation

`@constgen/neutrino-image-loader` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-image-loader
```

## Usage

### In preset

Require this package and plug it into Neutrino. The following shows how you can pass an options object to the middleware, showing the **defaults**:

```js
let imageLoader = require('@constgen/neutrino-image-loader')

neutrino.use(imageLoader({
   limit: 10000 // 10 KB - images lesser than this size in bytes will be Base64 encoded into JS bundle
}))
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let imageLoader = require('@constgen/neutrino-image-loader')

module.exports = {
   use: [
      imageLoader()
   ]
}
```