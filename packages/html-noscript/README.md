# @constgen/neutrino-html-noscript

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-html-noscript.svg)](https://www.npmjs.com/package/@constgen/neutrino-html-noscript)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-html-noscript.svg)](https://www.npmjs.com/package/@constgen/neutrino-html-noscript)

[Neutrino](https://neutrino.js.org) middleware that adds `<noscript>` tag with a message as the very first child of `<body>`

## Requirements

- Node.js v10+
- Neutrino v9
- Webpack v4
- HtmlWebpackPlugin v4.5.1+

## Installation

`@constgen/neutrino-html-noscript` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-html-noscript
```

## Usage

### In preset

Require this package and plug it into Neutrino. The following shows how you can pass an options object to the middleware, showing the **defaults**:

```js
let noscript = require('@constgen/neutrino-html-noscript')

neutrino.use(noscript(
   'We’re sorry but our app doesn’t work properly without JavaScript enabled. Please enable it to continue.'
))
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let noscript = require('@constgen/neutrino-html-noscript')

module.exports = {
   use: [
      noscript()
   ]
}
```