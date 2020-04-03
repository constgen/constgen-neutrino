// let { IMAGE_EXTENSIONS } = require('@constgen/neutrino-image-loader')

module.exports = function () {
	return function (neutrino) {
		const CSS_EXTENSIONS = /\.(css|less|sass|scss|pcss)$/i
		const SVG_EXTENSIONS = /\.svg(\?v=\d+\.\d+\.\d+)?$/i
		let svgUrlLoader = require.resolve('svg-url-loader')
		let prodMode = neutrino.config.get('mode') !== 'development'
		let outputhPath = prodMode ? 'images' : undefined
		let name = prodMode ? '[name].[hash:8].[ext]' : '[path][name].[ext]'

		neutrino.config.module
			.rules.delete('svg')
			.end()

			// .rule('image')
			// 	.test(IMAGE_EXTENSIONS)
			// 	.end()
			.rule('svg')
				.test(SVG_EXTENSIONS)
				.oneOf('style')
					.set('issuer', CSS_EXTENSIONS)
					.use('svg-css')
						.loader(svgUrlLoader)
						.options({
							outputhPath,
							name,
							limit: 10000,
							noquotes: false,
							stripdeclarations: true
						})
						.end()
					.end()
				.oneOf('text')
					.use('svg-text')
						.loader(svgUrlLoader)
						.options({ noquotes: true })
						.end()
					.end()
				.end()
	}
}