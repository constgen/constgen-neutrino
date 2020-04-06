# @constgen/neutrino-analysis

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-analysis.svg)](https://www.npmjs.com/package/@constgen/neutrino-analysis)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-analysis.svg)](https://www.npmjs.com/package/@constgen/neutrino-analysis)

[Neutrino](https://neutrino.js.org) middleware that adds bundle analysis tools

## Requirements

- Node.js v10+
- Neutrino v9

## Installation

`@constgen/neutrino-analysis` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-analysis
```

## Usage

### In preset

Require this package and plug it into Neutrino. The following shows how you can pass an options object to the middleware, showing the **defaults**:

```js
let analysis = require('@constgen/neutrino-analysis')

neutrino.use(analysis({
   circularDependency: true, // report in the terminal about circular dependncies
   bundleAnalyzer: true // enable BundleAnalyzerPlugin
}))
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let analysis = require('@constgen/neutrino-analysis')

module.exports = {
   use: [
      analysis()
   ]
}
```