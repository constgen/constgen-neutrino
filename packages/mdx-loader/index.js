let arrify = require('arrify')

module.exports = function () {
	return function (neutrino) {
		const LOADER_EXTENSIONS = /\.mdx$/
		let mdxLoader = require.resolve('mdx-loader')
		let compileRule = neutrino.config.module.rule('compile')
		let compileExtensions = arrify(compileRule.get('test')).concat(LOADER_EXTENSIONS)

		neutrino.options.extensions.push('mdx')

		neutrino.config
			.resolve
				.alias
					.set('@mdx-js/tag', require.resolve('@mdx-js/tag'))
					.end()
				.end()
			.module
				.rule('compile')
					.test(compileExtensions)
					.end()
				.rule('markdown-jsx')
					.test(LOADER_EXTENSIONS)
					.use('mdx')
						.loader(mdxLoader)
						.end()
					.end()
				.end()
	}
}