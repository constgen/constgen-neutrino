# @constgen/neutrino-media-loader

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-media-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-media-loader)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-media-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-media-loader)

[Neutrino](https://neutrino.js.org) middleware for audio and video files

## Requirements

- Node.js v10+
- Neutrino v9
- Webpack v4

## Installation

`@constgen/neutrino-media-loader` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-media-loader
```

## Usage

### In preset

Require this package and plug it into Neutrino. The middleware has no options:

```js
let mediaLoader = require('@constgen/neutrino-media-loader')

neutrino.use(mediaLoader())
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let mediaLoader = require('@constgen/neutrino-media-loader')

module.exports = {
   use: [
      mediaLoader()
   ]
}
```