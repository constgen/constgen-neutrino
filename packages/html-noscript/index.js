let HtmlWebpackNoscriptPlugin = require('html-webpack-noscript-plugin')

module.exports = function (innerHTML) {
	return function (neutrino) {
		const DEFAULT_MESSAGE = 'We’re sorry but our app doesn’t work properly without JavaScript enabled. Please enable it to continue.'
		let message           = innerHTML || DEFAULT_MESSAGE

		neutrino.config
			.plugin('noscript')
				.use(HtmlWebpackNoscriptPlugin, [message])
				.end()
	}
}