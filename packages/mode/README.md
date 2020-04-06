# @constgen/neutrino-mode

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-mode.svg)](https://www.npmjs.com/package/@constgen/neutrino-mode)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-mode.svg)](https://www.npmjs.com/package/@constgen/neutrino-mode)

[Neutrino](https://neutrino.js.org) middleware to automatically choose the building mode (production or development) based on CLI command. It allows to pass less flags when run `webpack` or `webpack-dev-server`

## Requirements

- Node.js v10+
- Neutrino v9

## Installation

`@constgen/neutrino-mode` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-mode
```

## Usage

> **Important:** If you use this middleware, you should use it at the very beginning before any other middlewares as it correctly defines `process.env.NODE_ENV` and `neutrino.config.mode()`

These commands will enable **development** mode and **watching**. So it is recommended to use one of them in package.json `scripts.start`:

```bash
webpack-dev-server
webpack --mode development
```

All other commands will be production. So it is recommended to use one of them in package.json `scripts.build`:

```bash
webpack
webpack --mode production
```

### In preset

Require this package and plug it into Neutrino. The middleware has no options:

```js
let mode = require('@constgen/neutrino-mode')

neutrino.use(mode())
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let mode = require('@constgen/neutrino-mode')

module.exports = {
   use: [
      mode()
   ]
}
```