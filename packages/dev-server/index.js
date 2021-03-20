let deepmerge              = require('deepmerge')
let { WebpackPluginServe } = require('webpack-plugin-serve')
let internalIp             = require('internal-ip')
let getPort                = require('get-port')

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		let webpackSettings  = neutrino.config.devServer.toConfig()
		let defaultSettings  = {
			open      : false,
			internal  : true,
			port      : 3000,
			https     : undefined,
			liveReload: false,
			middleware () {}
		}
		let settings         = deepmerge(defaultSettings, customSettings)
		let inheritedOptions = {
			// open           : webpackSettings.open,
			// host           : webpackSettings.host,
			// port           : webpackSettings.port,
			// hmr            : webpackSettings.hot || webpackSettings.hotOnly,
			// historyFallback: webpackSettings.historyApiFallback,
			// https          : webpackSettings.https || undefined,
			// http2          : webpackSettings.http2 || Boolean(webpackSettings.https),
			// static         : [].concat(webpackSettings.contentBase).filter(Boolean),

			log   : webpackSettings.clientLogLevel === 'silent' ? {} : { level: webpackSettings.clientLogLevel },
			client: webpackSettings.clientLogLevel === 'silent' ? { silent: true } : {}

			// status  : webpackSettings.overlay,
			// progress: webpackSettings.progress ? 'minimal' : false,
			// client  : {
			// 	address: [[webpackSettings.sockHost, webpackSettings.sockPath].filter(Boolean).join(''), webpackSettings.sockPort].filter(Boolean).join(':') || undefined
			// }

			// noInfo // ????? Webpack logs but not errors and warnings

			// before - NO
			// after - NO
			// transportMode - NO

			// headers - NO
			// middleware: (app, builtins) =>
			// 	app.use(async (ctx, next) => {
			// 		await next();
			// 		ctx.set('X-Superhero', 'batman');
			// 	})
			// middleware: (app, builtins) =>
			// 	builtins.headers({
			// 	"X-Superhero": "batman"
			// 	})

			// onListening - NO
			// serve.on('listening', () => {
			// 	watcher.on('change', (filePath, root, stat) => {
			// 	  console.log('file changed', filePath);
			// 	});
			//  });


			// webpackSettings.proxy
			// devServer: {
			// 	proxy: {
			// 	  '/api': 'http://localhost:3000',
			// 	},
			//  },
			// '/api': {
			// 	target: 'http://localhost:3000',
			// 	pathRewrite: { '^/api': '' },
			//  },
			// proxy: {
			// 	'/api': {
			// 	  target: 'https://other-server.example.com',
			// 	  secure: false,
			// 	},
			//  },
			// middleware: (app, builtins) => {
			// 	app.use(builtins.proxy('/api', { target: 'http://10.10.10.1:1337' }));
			//  }
		}
		let defaultOtions    = {
			client: {
				silent: true,
				retry : true
			},
			compress       : false,
			historyFallback: true,
			hmr            : true,
			host           : 'localhost',
			port           : 55555,
			http2          : undefined,
			https          : undefined,
			liveReload     : false,
			log            : { level: 'info', timestamp: false },
			open           : false,
			progress       : 'minimal',
			ramdisk        : false,
			static         : [neutrino.options.output],
			status         : true,
			waitForBuild   : true
		}
		let settingsOptions  = {
			host      : settings.internal ? internalIp.v4() : 'localhost',
			port      : settings.port || getPort(),
			https     : settings.https,
			http2     : Boolean(settings.https),
			liveReload: settings.liveReload,
			middleware: settings.middleware,
			open      : settings.open
		}

		let options = { ...deepmerge(defaultOtions, inheritedOptions), ...settingsOptions }

		// If using a combination of hmr and http2, the http2 option allowHTTP1 must be enabled for the HMR WS connection to work.
		if (options.http2 && options.hmr) {
			if (typeof options.http2 === 'object') {
				options.http2.allowHTTP1 = true
			}
			else {
				options.http2 = { allowHTTP1: true }
			}
		}


		console.log(options)

		neutrino.config
			.plugin('serve')
				.use(WebpackPluginServe, [options])
				.end()
			.plugins
				.delete('hot')
				.end()
			.devServer
				.clear()
				.end()

		Object.keys(neutrino.options.mains).forEach(function (key) {
			neutrino.config
				.entry(key)
					.add(require.resolve('webpack-plugin-serve/client'))
					.end()
		})
	}
}