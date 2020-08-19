# @constgen/neutrino-koa-launcher

[![npm](https://img.shields.io/npm/v/@constgen/neutrino-koa-launcher.svg)](https://www.npmjs.com/package/@constgen/neutrino-koa-launcher)
[![npm](https://img.shields.io/npm/dt/@constgen/neutrino-koa-launcher.svg)](https://www.npmjs.com/package/@constgen/neutrino-koa-launcher)

[Neutrino](https://neutrino.js.org) middleware for an automatic Koa application launching in a server with hot reload

Using this middleware your entry point should only export the Koa instance process. The server will be created automatically and will wrap your application.

**src/index.js**

```js
let Koa = require('koa')

module.exports = new Koa()
   .use(function ({ request, response }) {
      response.body = { success: true }
   })
```

You should not have to call `new Koa().listen()`

## Features

- Built-in HTTP server for launching the application on development and production
- Hot Module Replacement with source-watching during development
- Disabled redundant `[HMR]` console messages
- You can change your files without restarting the server
- Debug console cleared on every file change. Your outdated logs will be removed
- Automatically discovers free HTTP port to run a server locally
- Graceful server shutdown
- Outputs building log to `stdout` and `stderr`. No pollution to the console
- Shows PID (Process ID) in the output
- **Only Linux and MacOS:** Sets the NodeJS process name the same as the project name. So can be easily found with `ps x | grep myname`

## Requirements

- Node.js v10+
- Neutrino v9
- Webpack v4
- Koa v2.3+

## Installation

`@constgen/neutrino-koa-launcher` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save @constgen/neutrino-koa-launcher
```

## Usage

### In preset

Require this package and plug it into Neutrino. The following shows how you can pass an options object to the middleware, showing the **defaults**:

```js
let koaLauncher = require('@constgen/neutrino-koa-launcher')

neutrino.use(koaLauncher({
   port: undefined, // Set default port
   http: 1, // Set HTTP version
   ssl : undefined // Set SSL certificates
}))
```

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let koaLauncher = require('@constgen/neutrino-koa-launcher')

module.exports = {
   use: [
      koaLauncher()
   ]
}
```

## Customizing

### Port

There are multiple ways to customize the HTTP port of your application server.

You can configure a **default** port of the server in options using `server.port` property in the middleware options. For example:

```js
koaLauncher({
   port: 8080
})
```

Now your server will start on `8080` in both production and development modes. But this port value is considered a **default** value and may be overridden any time by `PORT` environment variable. This may be useful for production environments as the server will check `process.env.PORT` in the runtime first and then fallback to a port you have defined.

The default behavior of port when not configured is to default to `80`/`443` on production and to take random free default port on development.

You can choose random free port on both production and development by passing one of these values: `false`, `null`, `0`. For example:

```js
koaLauncher({
   port: 0 // 0 | false | null
})
```

`PORT` environment variable will always have a priority over any configuration.

### Host

By default the server starts on a default IPv6/IPv4 host which exposes it to local network. There is no way to configure a server host from the middleware options. But you still can use `HOST` environment variable to define your custom host.

### HTTP version

This middleware uses HTTP v1.x by default. You can switch to HTTP v2 in options.

```js
koaLauncher({
   http: 2 // default is 1
})
```

### SSL

You can provide paths to own SSL certificate and a public key

```js
koaLauncher({
   ssl: {
      cert: path.resolve(__dirname, './ssl/ssl.cert'),
      key : path.resolve(__dirname, './ssl/ssl.key')
   }
})
```

A relative path to the project root also can be used

```json
{
   cert: './ssl/ssl.cert',
   key: './ssl/ssl.key'
}
```

A temporary locally self-signed certificate can be configured by just passing `true`

```js
koaLauncher({
   ssl: true
})
```

## Graceful Shutdown

`@constgen/neutrino-koa-launcher` automatically shutdowns a server instance gracefully. Application server prints this message to signal successful closing when exited:

```bash
Server shutting down...
Server closed
```

During shutdown these steps are performed

1. Stop listening new requests
2. Close all open inactive connections
3. Wait current requests to end and close their connections at the end

The middleware doesn't forcefully exit a process but waits for queued operations to finish including your async Koa middlewares. In most cases you are **not required** to handle it explicitly. But if you have some long running operations or timers outside Koa middlewares that continue event loop then you should take care of them by yourself. Other will be handled by `@constgen/neutrino-koa-launcher`. The good practice is to use this in your code in cases of shutdown:

```js
['SIGINT', 'SIGTERM', 'SIGBREAK', 'SIGHUP'].forEach(function (signal) {
   process.once(signal, function () {
      // abort all async operations
      // ...
      // cancel all timers
      // ...
      process.exitCode = 0
   })
})
```

Don't call `process.exit()` as it considered a bad practice. The application should exit naturally when there is an empty call stack and no more scheduled tasks. You should see this at the very end if the finishing of the application is correct:

```bash
Application exited
```

In case your application will not finish for some reason in 10 seconds, there is a timeout that kills the application forcefully. You will not be able to handle this termination. The application will exit with an error signal right after this message

```bash
Server killed, due to timeout
```