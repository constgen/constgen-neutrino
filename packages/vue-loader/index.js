let deepmerge = require('deepmerge')
let babelMerge = require('babel-merge')
let babelLoader = require('@constgen/neutrino-babel-loader')
let { VueLoaderPlugin } = require('vue-loader')

let vueStyleLoader = require('./middlewares/vue-style-loader')

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		let developmentMode = neutrino.config.get('mode') === 'development'
		let productionMode = !developmentMode
		let defaultSettings = {
			babel: {},
			polyfills: false,
			browsers: customSettings.browsers ? undefined : [
				'last 2 Chrome major versions',
				'last 2 Firefox major versions',
				'last 2 Edge major versions',
				'last 2 Opera major versions',
				'last 2 Safari major versions',
				'last 2 iOS major versions',
				'ie 11'
			],
			include: [],
			exclude: []
		}
		let settings = deepmerge(defaultSettings, customSettings)

		neutrino.use(
			babelLoader({
				test: /\.(j|t)s?$/,
				include: settings.include,
				exclude: settings.exclude,
				polyfills: settings.polyfills,
				targets: settings.browsers ? { browsers: settings.browsers } : {},
				babel: babelMerge(
					{
						plugins: [require.resolve('babel-plugin-transform-vue-jsx')]
					},
					settings.babel
				)
			})
		)
		neutrino.use(vueStyleLoader())

		neutrino.config
			.module
				.rule('vue')
					.test(/\.vue$/)
					.include
						.merge(settings.include || [])
						.end()
					.exclude
						.merge(settings.exclude || [])
						.end()
					.use('vue')
						.loader(require.resolve('vue-loader'))
						.tap((options = {}) => deepmerge({
							transformAssetUrls: {
								img: 'src',
								link: 'href',
								video: ['src', 'poster'],
								source: 'src',
								audio: 'src',
								image: ['xlink:href', 'href'],
								use: ['xlink:href', 'href']
							 },
							 hotReload: developmentMode,
							 productionMode,
							 compilerOptions: {
								whitespace: 'condense',
								modules: false
							 },
							 prettify: false,
							 exposeFilename: developmentMode
						}, options))
						.end()
					.end()
				.end()
			.plugin('vue')
				.use(VueLoaderPlugin)
				.end()
			.resolve
				.extensions
					.merge(['.vue', '.jsx', '.js'])
					.end()
				.end()
	}
}