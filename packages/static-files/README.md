# @constgen/neutrino-static-files

[Neutrino](https://neutrino.js.org) middleware that automatically copies `src/static` to the bundle

## Requirements

* Node.js v10+
* Neutrino v9

## Installation

`@constgen/neutrino-static-files` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-static-files
```

## Usage

### In preset

Require this package and plug it into Neutrino. The middleware has no options:

```js
let staticFiles = require('@constgen/neutrino-static-files')

neutrino.use(staticFiles())
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let staticFiles = require('@constgen/neutrino-static-files')

module.exports = {
   use: [
      staticFiles()
   ]
}
```