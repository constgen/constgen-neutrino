# @constgen/neutrino-dependency

[Neutrino](https://neutrino.js.org) middleware for detection and warning about circular dependencies during the build time

You may want to use [`@constgen/neutrino-analysis`](https://github.com/constgen/constgen-neutrino/packages/analysis) that already includes this middleware

## Requirements

* Node.js v10+
* Neutrino v9

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