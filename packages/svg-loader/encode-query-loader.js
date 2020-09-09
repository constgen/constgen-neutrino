function hasCssRule (rule) {
	return rule.uses.values().some(use => use.name === 'css')
}

function useEncodeQueryLoader (rule) {
	rule
		.use('css')
			.tap((options = {}) => ({
				...options,
				importLoaders: (options.importLoaders || 0) + 1
			}))
			.end()
		.use('encode-query')
			.after('css')
			.loader(require.resolve('svg-transform-loader/encode-query'))
		.end()
}


module.exports = function () {
	return function (neutrino) {
		let styleRule = neutrino.config.module.rules.get('style')

		if (styleRule) {
			let oneOfs = styleRule.oneOfs.values()
			let rules  = oneOfs.concat(styleRule)

			rules
				.filter(hasCssRule)
				.forEach(useEncodeQueryLoader)
		}
	}
}