let path = require('path')

module.exports = function () {
	return function (neutrino) {
		let launcherPath           = path.resolve(__dirname, './launcher/launcher.js')
		let projectNodeModulesPath = path.resolve(process.cwd(), 'node_modules')

		neutrino.config
			.devServer
				.merge({
					clientLogLevel: 'silent'
				})
				.end()
			.resolve
				.alias
					.set('vue$', path.resolve(path.join(projectNodeModulesPath, 'vue')))
					.end()
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