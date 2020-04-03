let compileLoader = require('@neutrinojs/compile-loader')
let babelMerge = require('babel-merge')
let deepmerge = require('deepmerge')
let { shouldPrintComment } = require('babel-plugin-smart-webpack-import')

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		let defaultSettings = {
			babel: {},
			test: [],
			polyfills: false,
			targets: { },
			include: [],
			exclude: []
		}
		let settings = deepmerge(defaultSettings, customSettings)
		const DEFAULT_COREJS = 3
		let coreJsVersion = neutrino.getDependencyVersion('core-js')
		let corejs = coreJsVersion ? coreJsVersion.major : DEFAULT_COREJS

		neutrino.config
			.resolve
				.alias
					.set('core-js', require.resolve('core-js').replace(/index\.js$/, ''))
					.end()
				.end()
			.module.rules
				.delete('compile')
				.end().end()

		neutrino.use(
			compileLoader({
				test: [neutrino.regexFromExtensions()].concat(settings.test),
				include: [neutrino.options.source, neutrino.options.tests].concat(settings.include),
				exclude: settings.exclude,
				babel: babelMerge(
					{
						plugins: [
							require.resolve('@babel/plugin-syntax-dynamic-import'),
							[require.resolve('@babel/plugin-proposal-decorators'), {
								decoratorsBeforeExport: true
							}],
							require.resolve('@babel/plugin-proposal-class-properties'),
							require.resolve('babel-plugin-smart-webpack-import')
						],
						presets: [
							[
								require.resolve('@babel/preset-env'),
								{
									debug: neutrino.options.debug,
									targets: settings.targets,
									spec: false,
									modules: false,
									useBuiltIns: settings.polyfills ? 'usage' : false,
									...(settings.polyfills && { corejs })
								}
							],
							[require.resolve('@babel/preset-typescript'), {
								allowNamespaces: true
							}]
						],
						sourceType: 'unambiguous',
						cacheDirectory: true,
						cacheCompression: false,
						babelrc: false,
						configFile: false,
						shouldPrintComment
					},
					settings.babel
				)
			})
		)
	}
}