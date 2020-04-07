module.exports = function () {
	return function (neutrino) {
		let modeWebpack = neutrino.config.get('mode')
		let modeDevServer = process.env.WEBPACK_DEV_SERVER === 'true' ? 'development' : undefined
		let modeEnv = process.env.NODE_ENV
		let mode = modeWebpack || modeDevServer || modeEnv
		let testEnv = modeEnv === 'test'
		let devMode = mode === 'development'

		process.env.NODE_ENV = testEnv ? modeEnv : mode
		neutrino.config
			.mode(mode)
			.when(devMode, function (config) {
				config
					.watch(true) // https://webpack.js.org/configuration/watch/#watch
					.devServer
						.hot(true)
						.end()
			})
	}
}