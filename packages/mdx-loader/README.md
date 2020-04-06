# @constgen/neutrino-mdx-loader

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-mdx-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-mdx-loader)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-mdx-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-mdx-loader)

[Neutrino](https://neutrino.js.org) middleware for MDX files in React apps

## Requirements

- Node.js v10+
- Neutrino v9
- React v16

## Installation

`@constgen/neutrino-mdx-loader` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-mdx-loader
```

## Usage

### In preset

Require this package and plug it into Neutrino. The middleware has no options:

```js
let mdxLoader = require('@constgen/neutrino-mdx-loader')

neutrino.use(mdxLoader())
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let mdxLoader = require('@constgen/neutrino-mdx-loader')

module.exports = {
   use: [
      mdxLoader()
   ]
}
```

## Syntax Highlighting

If you'd like to add styles for the syntax highlighting, include a Prism.js stylesheet somewhere within your application:

```js
import 'prismjs/themes/prism-tomorrow.css'
```