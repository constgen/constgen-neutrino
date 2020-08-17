# @constgen/neutrino-react-launcher

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-react-launcher.svg)](https://www.npmjs.com/package/@constgen/neutrino-react-launcher)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-react-launcher.svg)](https://www.npmjs.com/package/@constgen/neutrino-react-launcher)

[Neutrino](https://neutrino.js.org) middleware for an automatic React application launching in a browser document with hot reload

Using this middleware your entry point should only export the main application component

**index.jsx**

```jsx
import React from 'react'

export default class extends React.Component {
   render () {
      return <h1>Root component</h1>
   }
}
```

## Features

- Enabled Hot Module Replacement with source-watching during development
- Disabled redundant `[HMR]` console messages
- Debug console cleared on every file change. Your outdated logs will be removed

## Requirements

- Node.js v10+
- Neutrino v9
- React v16

## Installation

`@constgen/neutrino-react-launcher` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-react-launcher
```

## Usage

### In preset

Require this package and plug it into Neutrino. The middleware has no options:

```js
let reactLauncher = require('@constgen/neutrino-react-launcher')

neutrino.use(reactLauncher())
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let reactLauncher = require('@constgen/neutrino-react-launcher')

module.exports = {
   use: [
      reactLauncher()
   ]
}
```
