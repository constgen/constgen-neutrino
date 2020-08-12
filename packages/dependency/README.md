# @constgen/neutrino-dependency

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-dependency.svg)](https://www.npmjs.com/package/@constgen/neutrino-dependency)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-dependency.svg)](https://www.npmjs.com/package/@constgen/neutrino-dependency)

[Neutrino](https://neutrino.js.org) middleware for detection and warning about dependencies issues

You may want to use [`@constgen/neutrino-analysis`](https://github.com/constgen/constgen-neutrino/packages/analysis) that already includes this middleware

## Features

- Detect and warn about circular dependencies during the build time
- Detect and warn about duplicated dependencies during the build time

## Requirements

- Node.js v10+
- Neutrino v9

## Installation

`@constgen/neutrino-dependency` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-dependency
```

## Usage

### In preset

Require this package and plug it into Neutrino. The middleware has no options:

```js
let dependency = require('@constgen/neutrino-dependency')

neutrino.use(dependency())
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let dependency = require('@constgen/neutrino-dependency')

module.exports = {
   use: [
      dependency()
   ]
}
```