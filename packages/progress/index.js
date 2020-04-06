let WebpackBar = require('webpackbar')
let clear = require('console-clear')

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		let prodMode = neutrino.config.get('mode') !== 'development'
		let { name, version } = neutrino.options.packageJson
		let defaultSettings = {
			name: `${name} ${version}`,
			color: 'green',
			clean: true
		}
		let settings = Object.assign({}, defaultSettings, customSettings)

		neutrino.config
			.devServer
				.progress(false)
				.stats({
					all: false,
					errors: true,
					warnings: true
				})

				// .set('onListening', function (server) {
				// 	let { port, address } = server.listeningApp.address()
				// })
				.end()
			.stats({
				children: false,
				entrypoints: false,
				modules: false,
				hash: prodMode,
				performance: true,
				version: prodMode,
				assets: prodMode,
				colors: true,
				assetsSort: 'chunks',
				env: true,
				builtAt: prodMode,
				timings: prodMode,
				excludeAssets: [/\.map$/]
			})
			.plugin('progress')
				.use(WebpackBar, [{
					name: settings.name,
					color: settings.color,
					profile: false,
					reporter: {
						// Called when (re)compile is started
						start () {
							if (settings.clean) clear()
						},

						// Called when a file changed on watch mode
						change () {},

						// Called when compile finished
						done () {}
					}

					// fancy: true // true when not in CI or testing mode
					// basic: true // true when running in minimal environments.
				}])
				.end()
	}
}