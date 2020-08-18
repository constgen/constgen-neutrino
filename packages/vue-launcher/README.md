# @constgen/neutrino-vue-launcher

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-vue-launcher.svg)](https://www.npmjs.com/package/@constgen/neutrino-vue-launcher)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-vue-launcher.svg)](https://www.npmjs.com/package/@constgen/neutrino-vue-launcher)

[Neutrino](https://neutrino.js.org) middleware for an automatic Vue application launching in a browser document with hot reload

Using this middleware you no longer need to bootstrap HMR and app mounting. It is done automatically. The only thing you need is to only export the main JSX component in your main application component (entry file)

**src/index.vue**

```vue
<template>
   <h1>Root component</h1>
</template>

<script>
export default {}
</script>
```

## Features

- Enabled Hot Module Replacement with source-watching during development
- Disabled redundant `[HMR]` console messages

## Requirements

- Node.js v10+
- Neutrino v9
- Webpack v4
- Vue v2

## Installation

`@constgen/neutrino-vue-launcher` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-vue-launcher
```

## Usage

### In preset

Require this package and plug it into Neutrino. The middleware has no options:

```js
let vueLauncher = require('@constgen/neutrino-vue-launcher')

neutrino.use(vueLauncher())
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let vueLauncher = require('@constgen/neutrino-vue-launcher')

module.exports = {
   use: [
      vueLauncher()
   ]
}
```