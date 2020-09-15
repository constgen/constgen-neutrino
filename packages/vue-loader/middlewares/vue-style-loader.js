module.exports = function () {
	return function (neutrino) {
		let vueStyleLoaderPath = require.resolve('vue-style-loader')
		let styleRule          = neutrino.config.module.rules.get('style')
		let styleUse           = styleRule && styleRule.uses.get('style')

		if (styleUse) {
			styleUse.loader(vueStyleLoaderPath)
		}

		if (styleRule) {
			let oneOfs        = styleRule.oneOfs.values()
			let defaultOneOfs = oneOfs.filter(oneOf => !oneOf.uses.get('css').get('options').modules)
			let moduleOneOfs  = oneOfs.filter(oneOf => oneOf.uses.get('css').get('options').modules)

			defaultOneOfs
				.map(oneOf => oneOf.uses.get('style'))
				.filter(Boolean)
				.forEach(function (use) {
					use.loader(vueStyleLoaderPath)
				})

			moduleOneOfs
				.forEach(function (oneOf) {
					styleRule
						.oneOf(`vue-${oneOf.name}`)
							.before(oneOf.name)
							.resourceQuery(/^\?vue&.*?module=true/)
							.batch(function (vueOneOf) {
								oneOf.uses.values().forEach(function (use) {
									vueOneOf
										.use(use.name)
											.merge(use.entries())
											.when(use.name === 'style', function (vueUse) {
												vueUse.loader(vueStyleLoaderPath)
											})
								})
							})
				})
		 }
	}
}