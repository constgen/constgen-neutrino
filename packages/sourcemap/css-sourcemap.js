function isConfigurable (use) {
	const COMPATIBLE_NAME_EXPRESSION = /^(css|less|sass|postcss|stylus)$/i

	return COMPATIBLE_NAME_EXPRESSION.test(use.name)
}

module.exports = function ({ prod: production = false, dev: development = true } = {}) {
	return function (neutrino) {
		let developmentMode      = neutrino.config.get('mode') === 'development'
		let productionMode       = !developmentMode
		let productionSourcemap  = Boolean(production)
		let developmentSourcemap = Boolean(development)
		let sourceMap            = Boolean(
			(developmentMode && developmentSourcemap) || (productionMode && productionSourcemap)
		)
		let styleRule            = neutrino.config.module.rules.get('style')

		function configureSourceMap (use) {
			use.tap(options => Object.assign({}, options, { sourceMap }))
		}

		if (styleRule) {
			let oneOfs = styleRule.oneOfs.values()
			let uses   = styleRule.uses.values()

			uses
				.filter(isConfigurable)
				.forEach(configureSourceMap)

			oneOfs
				.map(oneOf => oneOf.uses.values())
				.reduce((allUses, oneOfuses) => allUses.concat(oneOfuses), [])
				.filter(isConfigurable)
				.forEach(configureSourceMap)
		}
	}
}