let path = require('path')

let banner = require('@neutrinojs/banner')

module.exports = function ({ prod = false, dev = true } = {}) {
	return function (neutrino) {
		let devMode = neutrino.config.get('mode') === 'development'
		let productionSourcemap = prod ? 'source-map' : false
		let developmentSourcemap = dev ? 'eval-cheap-module-source-map' : false // eval-cheap-module-source-map, inline-cheap-module-source-map, cheap-module-source-map
		let targetIsNode = ['node', 'async-node', 'node-webkit', 'electron-main'].includes(neutrino.config.get('target'))
		let sourcemapsEnabled = devMode ? dev : prod

		function productionFilenameTemplate (info) {
			return path.relative(neutrino.options.output, info.absoluteResourcePath).replace(/\\/g, '/')
		}
		function developmentFilenameTemplate (info) {
			let fileProtocol = info.absoluteResourcePath.charAt(0) === '/' ? 'file://' : 'file:///'
			let absoluteUrl = path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')

			return `${fileProtocol}${absoluteUrl}`
		}

		if (targetIsNode && sourcemapsEnabled) {
			neutrino.use(banner({ pluginId: 'sourcemaps' }))
		}

		neutrino.config
			.devtool(productionSourcemap)
			.output
				.devtoolModuleFilenameTemplate(productionFilenameTemplate)
				.end()
			.when(devMode, function (config) {
				config
					.devtool(developmentSourcemap)
					.output
						.devtoolModuleFilenameTemplate(developmentFilenameTemplate)
						.end()
			})
	}
}