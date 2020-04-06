# @constgen/neutrino-react-scoped-styles

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-react-scoped-styles.svg)](https://www.npmjs.com/package/@constgen/neutrino-react-scoped-styles)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-react-scoped-styles.svg)](https://www.npmjs.com/package/@constgen/neutrino-react-scoped-styles)

[Neutrino](https://neutrino.js.org) middleware for isolation of React components styles using [`react-scoped-styles`](https://www.npmjs.com/package/react-scoped-styles). Applied only to styles imported from JSX and TSX files.

## Requirements

- Node.js v10+
- Neutrino v9

## Installation

`@constgen/neutrino-react-scoped-styles` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-react-scoped-styles
```

## Usage

### In preset

Require this package and plug it into Neutrino. The middleware has no options:

```js
let reactScopedStyles = require('@constgen/neutrino-react-scoped-styles')

neutrino.use(reactScopedStyles())
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let reactScopedStyles = require('@constgen/neutrino-react-scoped-styles')

module.exports = {
   use: [
      reactScopedStyles()
   ]
}
```