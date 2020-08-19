let path = require('path')

module.exports = function () {
	return function (neutrino) {
		let launcherPath = path.resolve(__dirname, './launcher/launcher.js')

		neutrino.config
			.devServer
				.merge({
					clientLogLevel: 'silent'
				})
				.end()

		Object.keys(neutrino.options.mains).forEach(function (key) {
			neutrino.config
				.entry(key)
					.clear()
					.add(launcherPath)
					.end()
				.resolve
					.alias
						.set('__entry__', path.resolve(__dirname, neutrino.options.mains[key].entry))
						.end()
					.end()
		})
	}
}