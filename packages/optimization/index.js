let deepmerge = require('deepmerge')
let styleMinify = require('@neutrinojs/style-minify')

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		const SIZE_2MB = 2000000
		const SIZE_4MB = 4000000
		const NODE_MODULES_EXP = /[/\\]node_modules[/\\]/i
		let devMode = neutrino.config.get('mode') === 'development'
		let prodMode = !devMode
		let targetIsNode = ['node', 'async-node', 'node-webkit', 'electron-main'].includes(neutrino.config.get('target'))
		let defaultSettings = {
			chunks: true,
			minimize: true
		}
		let settings = deepmerge(defaultSettings, customSettings)

		// https://linguinecode.com/post/reduce-css-file-size-webpack-tree-shaking

		// https://www.npmjs.com/package/optimize-css-assets-webpack-plugin
		if (settings.minimize) neutrino.use(styleMinify())

		neutrino.config
			.performance
				.hints('warning')
				.maxAssetSize(SIZE_2MB)
				.maxEntrypointSize(SIZE_4MB)
				.assetFilter(fileName => fileName.endsWith('.js') || fileName.endsWith('.css') || fileName.endsWith('.html'))
				.when(targetIsNode, function (performance) {
					performance.hints(false)
				})
				.end()
			.optimization
				.minimize(prodMode)
				.runtimeChunk(false)
				.set('moduleIds', devMode ? 'named' : 'hashed')
				.set('chunkIds', devMode ? 'named' : 'total-size')
				.removeAvailableModules(prodMode)
				.removeEmptyChunks(prodMode)
				.mergeDuplicateChunks(true)
				.flagIncludedChunks(prodMode)
				.occurrenceOrder(prodMode)
				.splitChunks({
					chunks: 'all',
					name: false,
					maxInitialRequests: 6,
					maxAsyncRequests: 6,
					minSize: 30000,
					minChunks: 2,
					cacheGroups: {
						default: false,
						defaultVendors: false,
						vendors: {
							test: NODE_MODULES_EXP,
							name: 'vendor',
							chunks: 'initial',
							enforce: true,
							maxSize: SIZE_2MB
						},
						async_vendor: {
							test: NODE_MODULES_EXP,
							name: devMode,
							chunks: 'async',
							reuseExistingChunk: true,
							enforce: true,
							maxSize: SIZE_2MB
						},
						common: {
							// idHint: 'common',
							name: devMode,
							chunks: 'all',
							minChunks: 2,
							reuseExistingChunk: true,
							maxSize: SIZE_2MB
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