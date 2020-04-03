# @constgen/neutrino-progress

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-progress.svg)](https://www.npmjs.com/package/@constgen/neutrino-progress)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-progress.svg)](https://www.npmjs.com/package/@constgen/neutrino-progress)

[Neutrino](https://neutrino.js.org) middleware that adds a developer-friendly building progress bar

## Requirements

* Node.js v10+
* Neutrino v9

## Installation

`@constgen/neutrino-progress` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-progress
```

## Usage

### In preset

Require this package and plug it into Neutrino. The following shows how you can pass an options object to the middleware, showing the **defaults**:

```js
let progress = require('@constgen/neutrino-progress')

neutrino.use(progress({
   name: '', // application name to label the progress bar; fallsback to the information from package.json
   color: 'green' // progress bar color
}))
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let progress = require('@constgen/neutrino-progress')

module.exports = {
   use: [
      progress()
   ]
}
```