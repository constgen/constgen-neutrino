let HtmlWebpackNoscriptPlugin = require('html-webpack-noscript-plugin')

module.exports = function (innerHTML) {
	return function (neutrino) {
		neutrino.config
			.plugin('noscript')
				.use(HtmlWebpackNoscriptPlugin, [innerHTML])
				.end()
	}
}