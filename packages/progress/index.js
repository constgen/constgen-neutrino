let WebpackBar = require('webpackbar')

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		let prodMode = neutrino.config.get('mode') !== 'development'
		let { name, version } = neutrino.options.packageJson
		let defaultSettings = {
			name: `${name} ${version}`,
			color: 'green'
		}
		let settings = Object.assign({}, defaultSettings, customSettings)

		neutrino.config
			.devServer
				.merge({
					progress: false
				})
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
				timings: prodMode
			})
			.plugin('progress')
				.use(WebpackBar, [{
					name: settings.name,
					color: settings.color,
					profile: false

					// fancy: true // true when not in CI or testing mode
					// basic: true // true when running in minimal environments.
				}])
				.end()
	}
}