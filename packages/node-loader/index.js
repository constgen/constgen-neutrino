module.exports = function () {
	return function (neutrino) {
		let productionMode = neutrino.config.get('mode') === 'production'
		let name           = productionMode ? '[name].[hash:8].[ext]' : '[path][name].[ext]'

		neutrino.config
			.module
				.rule('node')
					.test(/\.node$/i)
					.use('native-addon')
						.loader(require.resolve('native-addon-loader'))
						.options({
							name
						})
						.end()
					.end()
				.end()
	}
}