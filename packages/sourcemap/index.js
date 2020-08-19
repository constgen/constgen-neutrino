let cssSourcemap = require('./css-sourcemap')
let jsSourcemap  = require('./js-sourcemap')

module.exports = function (settings) {
	return function (neutrino) {
		let developmentMode = neutrino.config.get('mode') === 'development'

		neutrino.use(cssSourcemap(settings))
		neutrino.use(jsSourcemap(settings))
		neutrino.config
			.when(developmentMode, function (config) {
				config
					.module
						.rule('source-map')
							.test(/\.js$/i)
							.pre()
							.include
								.add(/node_modules/)
								.end()
							.use('smart-source-map')
								.loader(require.resolve('smart-source-map-loader'))
								.end()
							.end()
						.end()
			})
	}
}