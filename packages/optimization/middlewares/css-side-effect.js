module.exports = function () {
	return function (neutrino) {
		let styleRule = neutrino.config.module.rules.get('style')
		let cssUse    = styleRule && styleRule.uses.get('css')

		if (cssUse) {
			let sideEffects = !cssUse.get('options').modules

			styleRule.set('sideEffects', sideEffects)
		}

		if (styleRule) {
			let oneOfs        = styleRule.oneOfs.values().filter(oneOf => oneOf.uses.get('css'))
			let defaultOneOfs = oneOfs.filter(oneOf => !oneOf.uses.get('css').get('options').modules)
			let moduleOneOfs  = oneOfs.filter(oneOf => oneOf.uses.get('css').get('options').modules)

			defaultOneOfs
				.forEach(function (oneOf) {
					oneOf.set('sideEffects', true)
				})

			moduleOneOfs
				.forEach(function (oneOf) {
					oneOf.set('sideEffects', false)
				})
		}
	}
}