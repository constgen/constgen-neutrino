# @constgen/neutrino-revision

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-revision.svg)](https://www.npmjs.com/package/@constgen/neutrino-revision)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-revision.svg)](https://www.npmjs.com/package/@constgen/neutrino-revision)

[Neutrino](https://neutrino.js.org) middleware that exposes Git revision information through environment variables

## Features

- Git revision information through environment variables: `VERSION`, `COMMITHASH`, `BRANCH`
- Correctly handle CI/CD environments
- Create files in the output with the revision information
- Fallback `VERSION` to **package.json** `"version"` in non-Git environment

## Requirements

- Node.js v10+
- Neutrino v9
- Webpack v4

## Installation

`@constgen/neutrino-revision` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-revision
```

## Usage

### In preset

Require this package and plug it into Neutrino. The middleware has no options:

```js
let revision = require('@constgen/neutrino-revision')

neutrino.use(revision())
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let revision = require('@constgen/neutrino-revision')

module.exports = {
   use: [
      revision()
   ]
}
```