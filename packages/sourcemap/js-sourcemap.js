let path = require('path')

let banner = require('@neutrinojs/banner')

function developmentFilenameTemplate (info) {
	let fileProtocol = info.absoluteResourcePath.charAt(0) === '/' ? 'file://' : 'file:///'
	let absoluteUrl  = path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')

	return `${fileProtocol}${absoluteUrl}`
}

module.exports = function ({ prod: production = false, dev: development = true } = {}) {
	return function (neutrino) {
		let developmentMode      = neutrino.config.get('mode') === 'development'
		let productionSourcemap  = production ? 'source-map' : false
		let developmentSourcemap = development ? 'eval-cheap-module-source-map' : false // eval-cheap-module-source-map, inline-cheap-module-source-map, cheap-module-source-map
		let targetIsNode         = ['node', 'async-node', 'node-webkit', 'electron-main'].includes(neutrino.config.get('target'))
		let sourcemapsEnabled    = developmentMode ? development : production

		function productionFilenameTemplate (info) {
			return path.relative(neutrino.options.output, info.absoluteResourcePath).replace(/\\/g, '/')
		}

		if (targetIsNode && sourcemapsEnabled) {
			neutrino.use(banner({ pluginId: 'sourcemaps' }))
		}

		neutrino.config
			.devtool(productionSourcemap)
			.output
				.devtoolModuleFilenameTemplate(productionFilenameTemplate)
				.end()
			.when(developmentMode, function (config) {
				config
					.devtool(developmentSourcemap)
					.output
						.devtoolModuleFilenameTemplate(developmentFilenameTemplate)
						.end()
			})
	}
}