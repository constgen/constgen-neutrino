// let { IMAGE_EXTENSIONS } = require('@constgen/neutrino-image-loader')

module.exports = function () {
	return function (neutrino) {
		const CSS_EXTENSIONS = /\.(css|less|sass|scss|pcss)$/i
		const SVG_EXTENSIONS = /\.(svg|svg\?v=\d+\.\d+\.\d+)$/i
		let svgUrlLoader     = require.resolve('svg-url-loader')
		let svgInlineLoader  = require.resolve('svg-inline-loader')
		let extractLoader    = require.resolve('extract-loader')
		let productionMode   = neutrino.config.get('mode') !== 'development'
		let outputPath       = productionMode ? 'images' : undefined
		let name             = productionMode ? '[name].[hash:8].[ext]' : '[path][name].[ext]'

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
					.use('url-svg')
						.loader(svgUrlLoader)
						.options({
							outputPath,
							name,
							limit            : 1,
							noquotes         : false,
							stripdeclarations: true
						})
						.end()
					.end()
				.oneOf('text')
					.use('data-url-svg')
						.loader(svgUrlLoader)
						.options({
							noquotes         : true,
							stripdeclarations: true
						 })
						.end()
					.use('raw-svg')
						.loader(extractLoader)
						.end()
					.use('text-svg')
						.loader(svgInlineLoader)
						.options({
							removeTags       : false,
							warnTags         : [],
							removeSVGTagAttrs: false,
							removingTagAttrs : [],
							warnTagAttrs     : [],
							classPrefix      : false,
							idPrefix         : true
						 })
						.end()
					.end()
				.end()
	}
}