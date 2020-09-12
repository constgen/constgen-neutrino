let deepmerge   = require('deepmerge')
let babelMerge  = require('babel-merge')
let babelLoader = require('@constgen/neutrino-babel-loader')

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		let developmentMode = neutrino.config.get('mode') === 'development'
		let productionMode  = !developmentMode
		let defaultSettings = {
			babel    : {},
			polyfills: false,
			browsers : customSettings.browsers ? undefined : ['defaults'],
			node     : undefined,
			include  : [],
			exclude  : []
		}
		let settings        = deepmerge(defaultSettings, customSettings)

		neutrino.use(
			babelLoader({
				test     : /\.(j|t)sx?$/,
				include  : settings.include,
				exclude  : settings.exclude,
				polyfills: settings.polyfills,
				targets  : {
					...(settings.browsers && { browsers: settings.browsers }),
					...(settings.node && { node: settings.node })
				},
				babel: babelMerge(
					{
						plugins: [
							[require.resolve('babel-plugin-jsx-pragmatic'), {
								module: 'react',
								export: 'createElement',
								import: 'createElement'
							}],
							[require.resolve('babel-plugin-transform-jsx-url'), {
								root : neutrino.options.source,
								attrs: [
									'img:src',
									'Image:src',
									'link:href',
									'video:src',
									'video:poster',
									'Video:src',
									'source:src',
									'audio:src',
									'Audio:src']
							}],
							productionMode && [require.resolve('babel-plugin-transform-react-remove-prop-types'), {
								mode               : 'remove',
								removeImport       : true,
								classNameMatchers  : ['Component', 'PureComponent'],
								additionalLibraries: ['react-immutable-proptypes']
							}]
						].filter(Boolean),
						presets: [
							[require.resolve('@babel/preset-react'), {
								development: developmentMode,
								pragma     : 'createElement',
								useSpread  : true,
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
					.merge(['.tsx', '.ts', '.jsx', '.js'])
					.end()
				.end()
	}
}