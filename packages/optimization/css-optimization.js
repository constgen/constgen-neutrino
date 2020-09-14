let deepmerge  = require('deepmerge')
let CssoPlugin = require('csso-webpack-plugin').default

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		let defaultSettings = {
			restructure: true,
			comments   : false
		}
		let settings        = deepmerge(defaultSettings, customSettings)

		neutrino.config
			.plugin('css-optimization')
			.use(CssoPlugin, [{
				debug          : neutrino.options.debug,
				forceMediaMerge: false,
				...settings
			}])
	 }
}