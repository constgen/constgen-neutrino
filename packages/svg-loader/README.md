# @constgen/neutrino-svg-loader

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-svg-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-svg-loader)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-svg-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-svg-loader)

[Neutrino](https://neutrino.js.org) middleware for SVG files.

## Features

- Automatically exclude `.svg` extension from `image` rule if present
- Enable usage of query parameters in SVG paths for compilation time image processing (e.g. `image.svg?fill=currentColor`) with [svg-transform-loader](https://www.npmjs.com/package/svg-transform-loader)
- Encode SVGs to DataURI **without*- encoding to Base64 when imported from JS or Components with [svg-url-loader](https://www.npmjs.com/package/svg-url-loader)
- SVG elements `id` attributes are extended with unique prefixes to avoid collisions between inlined `<svg>` images.

## Requirements

- Node.js v10+
- Neutrino v9
- Webpack v4

## Installation

`@constgen/neutrino-svg-loader` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-svg-loader
```

## Usage

### In preset

Require this package and plug it into Neutrino. The following shows how you can pass an options object to the middleware, showing the **defaults**:

```js
let svgLoader = require('@constgen/neutrino-svg-loader')

neutrino.use(svgLoader({
   limit: 10000 // 10 KB - images lesser than this size in bytes will be inlined into JS bundle. But onlly images referenced from styles are affected. All others are alwas inlined
}))
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let svgLoader = require('@constgen/neutrino-svg-loader')

module.exports = {
   use: [
      svgLoader()
   ]
}
```