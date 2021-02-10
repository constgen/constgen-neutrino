# Neutrino middlewares

[![Build Status](https://travis-ci.com/constgen/constgen-neutrino.svg?branch=master)](https://travis-ci.com/constgen/constgen-neutrino)

[Neutrino](https://neutrino.js.org) middlewares set for a quick Neutrino presets bootstrapping

## Middlewares

- [`@constgen/neutrino-analysis`](./packages/analysis)
- [`@constgen/neutrino-babel-loader`](./packages/babel-loader)
- [`@constgen/neutrino-dependency`](./packages/dependency)
- [`@constgen/neutrino-env`](./packages/env)
- [`@constgen/neutrino-html-noscript`](./packages/html-noscript)
- [`@constgen/neutrino-image-loader`](./packages/image-loader)
- [`@constgen/neutrino-koa-launcher`](./packages/koa-launcher)
- [`@constgen/neutrino-mdx-loader`](./packages/mdx-loader)
- [`@constgen/neutrino-mode`](./packages/mode)
- [`@constgen/neutrino-node-loader`](./packages/node-loader)
- [`@constgen/neutrino-optimization`](./packages/optimization)
- [`@constgen/neutrino-progress`](./packages/progress)
- [`@constgen/neutrino-react-launcher`](./packages/react-launcher)
- [`@constgen/neutrino-react-loader`](./packages/react-loader)
- [`@constgen/neutrino-react-scoped-styles`](./packages/react-scoped-styles)
- [`@constgen/neutrino-revision`](./packages/revision)
- [`@constgen/neutrino-sourcemap`](./packages/sourcemap)
- [`@constgen/neutrino-static-files`](./packages/static-files)
- [`@constgen/neutrino-svg-loader`](./packages/svg-loader)
- [`@constgen/neutrino-svgr-loader`](./packages/svgr-loader)
- [`@constgen/neutrino-vue-launcher`](./packages/vue-launcher)
- [`@constgen/neutrino-vue-loader`](./packages/vue-loader)

All middlewares can be combined together and with [Neutrino core middlewares and presets](https://github.com/neutrinojs/neutrino/tree/master/packages) . They are designed to work with each other without conflicts. Some of them provide safe options for customization to not break anything.