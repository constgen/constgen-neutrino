let deepmerge = require('deepmerge')

const IMAGE_EXTENSIONS = /\.(ico|png|jpe?g|gif|webp|bmp)$/i

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		let productionMode  = neutrino.config.get('mode') === 'production'
		let urlLoaderPath   = require.resolve('url-loader')
		let defaultSettings = {
			limit: 10000
		}
		let outputPath      = productionMode ? 'images' : undefined
		let name            = productionMode ? '[name].[hash:8].[ext]' : '[path][name].[ext]'
		let settings        = deepmerge(defaultSettings, customSettings)

		neutrino.config
			.module
				.rules
					.delete('image')
					.end()
				.rule('image')
					.test(IMAGE_EXTENSIONS)
					.use('url')
						.loader(urlLoaderPath)
						.options({
							limit: settings.limit,
							outputPath,
							name
						})
						.end()
					.end()
				.end()
	}
}

module.exports.IMAGE_EXTENSIONS = IMAGE_EXTENSIONS