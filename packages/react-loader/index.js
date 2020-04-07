let deepmerge = require('deepmerge')
let babelMerge = require('babel-merge')
let babelLoader = require('@constgen/neutrino-babel-loader')

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		let devMode = neutrino.config.get('mode') === 'development'
		let prodMode = !devMode
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
				test: /\.(j|t)sx?$/,
				include: settings.include,
				exclude: settings.exclude,
				polyfills: settings.polyfills,
				targets: settings.browsers ? { browsers: settings.browsers } : {},
				babel: babelMerge(
					{
						plugins: [
							[require.resolve('babel-plugin-jsx-pragmatic'), {
								module: 'react',
								export: 'createElement',
								import: 'createElement'
							}],
							[require.resolve('babel-plugin-transform-jsx-url'), {
								root: neutrino.options.source,
								attrs: ['img:src', 'link:href', 'Image:src', 'video:src', 'Video:src', 'audio:src', 'Audio:src']
							}],
							prodMode && [require.resolve('babel-plugin-transform-react-remove-prop-types'), {
								removeImport: true,
								classNameMatchers: ['Component', 'PureComponent']
							}]
						].filter(Boolean),
						presets: [
							[require.resolve('@babel/preset-react'), {
								development: devMode,
								pragma: 'createElement',
								useSpread: true,
								useBuiltIns: false
							}]
						]
					},
					settings.babel
				)
			})
		)

		neutrino.config
			.resolve
				.extensions
					.merge(['.tsx', '.ts', '.js', '.jsx'])
					.end()
				.end()
	}
}