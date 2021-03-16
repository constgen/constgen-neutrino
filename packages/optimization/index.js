let deepmerge = require('deepmerge')

let cssOptimization = require('./middlewares/css-optimization')
let cssSideEffect   = require('./middlewares/css-side-effect')

function MiB (size) {
	const KIB       = 1024
	const MIB_POWER = 2

	return Number(size) * Math.pow(KIB, MIB_POWER)
}

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		const MAX_ASSET_SIZE   = MiB`2` // eslint-disable-line const-case/uppercase
		const MAX_ENTRY_SIZE   = MiB`4` // eslint-disable-line const-case/uppercase
		const NODE_MODULES_EXP = /[/\\]node_modules[/\\]/i
		let developmentMode    = neutrino.config.get('mode') === 'development'
		let productionMode     = !developmentMode
		let targetIsNode       = ['node', 'async-node', 'node-webkit', 'electron-main'].includes(neutrino.config.get('target'))
		let defaultSettings    = {
			chunks  : true,
			minimize: true
		}
		let settings           = deepmerge(defaultSettings, customSettings)

		neutrino.use(cssSideEffect())
		if (settings.minimize) neutrino.use(cssOptimization())

		neutrino.config
			.performance
				.hints('warning')
				.maxAssetSize(MAX_ASSET_SIZE)
				.maxEntrypointSize(MAX_ENTRY_SIZE)
				.assetFilter(fileName => fileName.endsWith('.js') || fileName.endsWith('.css') || fileName.endsWith('.html'))
				.when(targetIsNode, function (performance) {
					performance.hints(false)
				})
				.when(developmentMode, function (performance) {
					performance.hints(false)
				})
				.end()
			.optimization
				.minimize(productionMode)
				.runtimeChunk(false)
				.set('moduleIds', developmentMode ? 'named' : 'hashed')
				.set('chunkIds', developmentMode ? 'named' : 'total-size')
				.removeAvailableModules(productionMode)
				.removeEmptyChunks(productionMode)
				.mergeDuplicateChunks(true)
				.flagIncludedChunks(productionMode)
				.occurrenceOrder(productionMode)
				.splitChunks({
					chunks            : 'all',
					name              : false,
					maxInitialRequests: 6,
					maxAsyncRequests  : Infinity,
					minSize           : 30000,
					maxSize           : developmentMode ? 0 : MAX_ASSET_SIZE,
					minChunks         : 2,
					cacheGroups       : {
						default       : false,
						defaultVendors: false,
						vendors       : {
							priority          : 10,
							test              : NODE_MODULES_EXP,
							name              : 'vendor',
							chunks            : 'initial',
							reuseExistingChunk: true,
							enforce           : true
						},

						// async_vendor: {
						// 	priority: 9,
						// 	test              : NODE_MODULES_EXP,
						// 	name              : developmentMode,
						// 	chunks            : 'async',
						// 	reuseExistingChunk: true,
						// 	enforce           : true
						// },
						async_vendor: {
							priority          : 9,
							test              : NODE_MODULES_EXP,
							name              : 'async_vendor',
							chunks            : 'async',
							reuseExistingChunk: true,
							enforce           : true
						},

						// common: {
						// 	priority: 8,
						// 	// idHint: 'common',
						// 	name              : developmentMode,
						// 	chunks            : 'all',
						// 	minChunks         : 2,
						// 	reuseExistingChunk: true
						// },
						common: {
							priority: 8,

							// idHint: 'common',
							name              : 'common',
							chunks            : 'initial',
							minChunks         : 2,
							reuseExistingChunk: true
						},
						async_common: {
							priority: 7,

							// idHint: 'async_common',
							name              : 'async_common',
							chunks            : 'async',
							minChunks         : 2,
							reuseExistingChunk: true
						}

						// config: {
						// 	test: /[/\\](.+\.)?config.json$/,
						// 	chunks: 'initial',

						// 	// name: true,
						// 	enforce: true,
						// 	filename: '[name].json',

						// 	// type: 'json',
						// 	maxSize: 0
						// }
					}
				})
				.when(!settings.minimize, function (optimization) {
					optimization.minimize(false)
				})
				.when(!settings.chunks, function (optimization) {
					optimization
						.removeAvailableModules(false)
						.removeEmptyChunks(false)
						.mergeDuplicateChunks(false)
						.flagIncludedChunks(false)
						.occurrenceOrder(false)
						.splitChunks(false)
				})
				.end()
	}
}