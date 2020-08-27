let path = require('path')

let compileLoader          = require('@neutrinojs/compile-loader')
let babelMerge             = require('babel-merge')
let deepmerge              = require('deepmerge')
let { shouldPrintComment } = require('babel-plugin-smart-webpack-import')

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		const DEFAULT_COREJS = 3
		let testEnv          = process.env.NODE_ENV === 'test'
		let defaultSettings  = {
			babel    : {},
			test     : [],
			polyfills: false,
			targets  : {},
			include  : [],
			exclude  : []
		}
		let settings         = deepmerge(defaultSettings, customSettings)
		let coreJsVersion    = neutrino.getDependencyVersion('core-js')
		let corejs           = coreJsVersion ? coreJsVersion.major : DEFAULT_COREJS

		neutrino.config
			.resolve
				.alias
					.set('core-js', require.resolve('core-js').replace(/index\.js$/, ''))
					.set('regenerator-runtime', require.resolve('regenerator-runtime').replace(/runtime\.js$/, ''))
					.end()
				.end()
			.module
				.rules
					.delete('compile')
					.end()
				.end()

		neutrino.use(
			compileLoader({
				test   : [neutrino.regexFromExtensions()].concat(settings.test),
				include: [neutrino.options.source, neutrino.options.tests].concat(settings.include),
				exclude: settings.exclude,
				babel  : babelMerge(
					{
						plugins: [
							require.resolve('@babel/plugin-syntax-dynamic-import'),
							[require.resolve('@babel/plugin-proposal-decorators'), {
								// decoratorsBeforeExport: true,
								legacy: true
							}],
							[require.resolve('@babel/plugin-proposal-class-properties'), {
								loose: true
							}],
							require.resolve('babel-plugin-smart-webpack-import'),
							!settings.polyfills && [require.resolve('@babel/plugin-transform-runtime'), {
								corejs         : false,
								helpers        : true,
								version        : require('@babel/runtime/package.json').version,
								regenerator    : true,
								useESModules   : false,
								absoluteRuntime: path.dirname(require.resolve('@babel/runtime/package.json'))
							}]
						].filter(Boolean),
						presets: [
							[
								require.resolve('@babel/preset-env'),
								{
									debug      : neutrino.options.debug,
									targets    : testEnv ? { node: 'current' } : settings.targets,
									spec       : false,
									modules    : testEnv ? 'auto' : false,
									useBuiltIns: settings.polyfills ? 'usage' : false,
									bugfixes   : true,
									...(settings.polyfills && { corejs })
								}
							],
							[require.resolve('@babel/preset-typescript'), {
								isTSX          : false,
								allExtensions  : false,
								allowNamespaces: true
							}]
						],
						ignore: [
							'**/node_modules/core-js/**'
						],
						sourceType      : 'unambiguous',
						cacheDirectory  : true,
						cacheCompression: false,
						babelrc         : false,
						configFile      : false,
						shouldPrintComment
					},
					settings.babel
				)
			})
		)
	}
}