let deepmerge = require('deepmerge')

const IMAGE_EXTENSIONS = /\.(ico|png|jpe?g|gif|webp|bmp)(\?v=\d+\.\d+\.\d+)?$/i

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		let prodMode = neutrino.config.get('mode') !== 'development'
		let urlLoader = require.resolve('url-loader')
		let defaultSettings = {
			limit: 10000
		}
		let outputPath = prodMode ? 'images' : undefined
		let name = prodMode ? '[name].[hash:8].[ext]' : '[path][name].[ext]'
		let settings = deepmerge(defaultSettings, customSettings)

		neutrino.config
			.module
				.rules
					.delete('image')
					.end()
				.rule('image')
					.test(IMAGE_EXTENSIONS)
					.use('url')
						.loader(urlLoader)
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