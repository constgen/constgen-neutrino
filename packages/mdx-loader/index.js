let arrify = require('arrify')

module.exports = function () {
	return function (neutrino) {
		const LOADER_EXTENSIONS = /\.mdx$/
		const STORY_EXTENSIONS  = /\.(stories|story).mdx$/
		let compileRule         = neutrino.config.module.rules.get('compile')
		let compileExtensions   = compileRule && arrify(compileRule.get('test')).concat(LOADER_EXTENSIONS)

		neutrino.options.extensions.push('mdx')

		neutrino.config
			.resolve
				.alias
					.set('@mdx-js/tag', require.resolve('@mdx-js/tag'))
					.set('@mdx-js/react', require.resolve('@mdx-js/react'))
					.end()
				.end()
			.module
				.when(compileRule, function (module) {
					module.rule('compile')
						.test(compileExtensions)
						.end()
				})
				.rule('markdown-jsx')
					.test(LOADER_EXTENSIONS)
					.exclude
						.add(STORY_EXTENSIONS)
						.end()
					.use('mdx')
						.loader(require.resolve('mdx-loader'))
						.end()
					.end()
				.end()
	}
}