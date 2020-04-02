let { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
let deepmerge = require('deepmerge')
let dependency = require('@constgen/neutrino-dependency')

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		let prodMode = neutrino.config.get('mode') !== 'development'
		let defaultSettings = {
			circularDependency: true,
			bundleAnalyzer: true
		}
		let settings = deepmerge(defaultSettings, customSettings)

		neutrino.config
			.when(settings.bundleAnalyzer, function () {
				neutrino.use(dependency())
			})
			.when(settings.bundleAnalyzer, function (config) {
				config.plugin('bundle-analyzer').use(BundleAnalyzerPlugin, [{
					analyzerMode: prodMode ? 'static' : 'server',
					analyzerHost: 'localhost',
					analyzerPort: 'auto',
					reportFilename: 'bundle-report.html',
					defaultSizes: 'parsed',
					openAnalyzer: false,
					generateStatsFile: false,
					statsFilename: 'stats.json',
					statsOptions: null,
					excludeAssets (assetName) {
						const HMR_PATCH_EXP = /hot-update\.js$/

						return HMR_PATCH_EXP.test(assetName)
					},
					logLevel: 'info' // info, warn, error, silent
				}])
			})
	}
}