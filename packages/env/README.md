# @constgen/neutrino-env

[Neutrino](https://neutrino.js.org) middleware that exposes an access to all environment variables (`process.env`) during the build time

## Requirements

* Node.js v10+
* Neutrino v9
* Webpack v4

## Installation

`@constgen/neutrino-env` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-env
```

## Usage

### In preset

Require this package and plug it into Neutrino. The middleware has no options:

```js
let env = require('@constgen/neutrino-env')

neutrino.use(env())
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let env = require('@constgen/neutrino-env')

module.exports = {
   use: [
      env()
   ]
}
```