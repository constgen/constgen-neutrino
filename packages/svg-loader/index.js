let { IMAGE_EXTENSIONS } = require('@constgen/neutrino-image-loader')

let encodeQuery = require('./middlewares/encode-query-loader')

module.exports = function () {
	return function (neutrino) {
		const CSS_EXTENSIONS       = /\.(css|less|sass|scss|pcss|styl)$/i
		const SVG_EXTENSIONS       = /\.svg$/i
		const SVG_QUERY            = /^\?.*/
		let svgUrlLoaderPath       = require.resolve('svg-url-loader')
		let svgInlineLoaderPath    = require.resolve('svg-inline-loader')
		let extractLoaderPath      = require.resolve('extract-loader')
		let svgTransformLoaderPath = require.resolve('svg-transform-loader')
		let productionMode         = neutrino.config.get('mode') !== 'development'
		let outputPath             = productionMode ? 'images' : undefined
		let name                   = productionMode ? '[name].[hash:8].[ext]' : '[path][name].[ext]'
		let hashedName             = productionMode ? name : '[path][name].[hash:8].[ext]'

		neutrino.use(encodeQuery())

		neutrino.config.module
			.rules
				.delete('svg')
				.end()
			.when(neutrino.config.module.rules.get('image'), function excludeSvgExtension (module) {
				module
					.rule('image')
						.test(IMAGE_EXTENSIONS)
						.end()
			})
			.rule('svg')
				.test(SVG_EXTENSIONS)
				.oneOf('style')
					.set('issuer', CSS_EXTENSIONS)
					.oneOf('url-query')
						.resourceQuery(SVG_QUERY)
						.use('url-svg')
							.loader(svgUrlLoaderPath)
							.options({
								outputPath,
								name             : hashedName,
								limit            : 1,
								noquotes         : false,
								stripdeclarations: true
							})
							.end()
						.use('transform-svg')
							.loader(svgTransformLoaderPath)
							.options({ raw: true })
							.end()
						.end()
					.oneOf('url')
						.use('url-svg')
							.loader(svgUrlLoaderPath)
							.options({
								outputPath,
								name,
								limit            : 1,
								noquotes         : false,
								stripdeclarations: true
							})
							.end()
						.end()
					.end()
				.oneOf('text')
					.use('data-url-svg')
						.loader(svgUrlLoaderPath)
						.options({
							noquotes         : true,
							stripdeclarations: true
						 })
						.end()
					.use('raw-svg')
						.loader(extractLoaderPath)
						.end()
					.use('text-svg')
						.loader(svgInlineLoaderPath)
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
					.oneOf('url-svg-query')
						.resourceQuery(SVG_QUERY)
						.use('transform-svg')
							.loader(svgTransformLoaderPath)
							.options({ raw: true })
							.end()
						.end()
					.end()
				.end()
	}
}