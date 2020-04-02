let WebpackBar = require('webpackbar')

module.exports = function (settings = {}) {
	return function (neutrino) {
		let prodMode = neutrino.config.get('mode') !== 'development'
		let name = settings.name || process.title

		neutrino.config
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
					name,
					color: 'green',
					profile: false

					// fancy: true // true when not in CI or testing mode
					// basic: true // true when running in minimal environments.
				}])
				.end()
	}
}