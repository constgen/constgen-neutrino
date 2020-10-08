# @constgen/neutrino-svgr-loader

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-svgr-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-svgr-loader)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-svgr-loader.svg)](https://www.npmjs.com/package/@constgen/neutrino-svgr-loader)

[Neutrino](https://neutrino.js.org) middleware for SVG components. You will be able to use SVGs as React components using named imports

```jsx
import logoImage, { ReactComponent as Logo } from './logo.svg'

export default function () {
   return (
      <>
         This is the logo component
         <Logo width="200" height="50" title="Title text" className="logo" />

         This is the logo image
         <img src={logoImage} width="200" height="50" alt="Title text" className="logo" />
      </>
   )
}
```

## Features

- exports React components from SVG modules as named exports

## Requirements

- Node.js v10+
- Neutrino v9
- Webpack v4

## Installation

`@constgen/neutrino-svgr-loader` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-svgr-loader
```

## Usage

### In preset

Require this package and plug it into Neutrino. The middleware has no options:

```js
let svgrLoader = require('@constgen/neutrino-svgr-loader')

neutrino.use(svgrLoader())
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let svgrLoader = require('@constgen/neutrino-svgr-loader')

module.exports = {
   use: [
      svgrLoader()
   ]
}
```