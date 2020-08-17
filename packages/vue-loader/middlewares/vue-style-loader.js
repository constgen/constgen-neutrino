module.exports = function () {
	return function (neutrino) {
		let vueStyleLoaderPath = require.resolve('vue-style-loader')
		let styleRule = neutrino.config.module.rules.get('style')
		let styleUse = styleRule && styleRule.uses.get('style')
		let normalStyleExtensions = styleRule.oneOf('normal').get('test')

		if (styleUse) {
			styleUse.loader(vueStyleLoaderPath)
		}

		if (styleRule) {
			let oneOfs = styleRule.oneOfs.values().filter(oneOf => oneOf.get('test'))
			let defaultOneOfs = oneOfs.filter(oneOf => !oneOf.uses.get('css').get('options').modules)
			let moduleOneOfs = oneOfs.filter(oneOf => oneOf.uses.get('css').get('options').modules)

			defaultOneOfs
				.map(oneOf => oneOf.uses.get('style'))
				.filter(Boolean)
				.forEach(function (use) {
					use.loader(vueStyleLoaderPath)
				})

			moduleOneOfs
				.filter(oneOf => oneOf.uses.get('style'))
				.forEach(function (oneOf) {
					styleRule
						.oneOf(`vue-${oneOf.name}`)
							.before(oneOf.name)
							.test(normalStyleExtensions)
							.resourceQuery(/module/)
							.batch(function (rule) {
								oneOf.uses.values().forEach(function (use) {
									rule.use(use.name).merge(use.entries())
								})
							})
							.use('style')
								.loader(vueStyleLoaderPath)
								.end()
							.end()
				})
		 }
	}
}