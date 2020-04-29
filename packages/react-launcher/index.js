let path = require('path')

let deepmerge = require('deepmerge')

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		let launcherPath = path.resolve(__dirname, './launcher/launcher.js')
		let projectNodeModulesPath = path.resolve(process.cwd(), 'node_modules')
		let defaultSettings = {
			entries: neutrino.options.mains
		}
		let settings = deepmerge(defaultSettings, customSettings)

		neutrino.config
			.devServer
				.merge({
					clientLogLevel: 'silent'
				})
				.end()
			.resolve
				.alias
					.set('react', path.resolve(path.join(projectNodeModulesPath, 'react')))
					.set('react-dom', require.resolve('@hot-loader/react-dom'))
					.end()
				.end()
			.module
				.rule('compile')
					.use('babel')
						.tap((options = {}) => deepmerge(options, {
							plugins: [require.resolve('react-hot-loader/babel')]
						}))
						.end()
					.end()
				.end()

		Object.keys(settings.entries).forEach(function (key) {
			neutrino.config
				.entry(key)
					.clear()
					.add(launcherPath)
					.end()
				.resolve.alias
					.set('__entry__', path.resolve(__dirname, settings.entries[key].entry))
					.end().end()
		})
	}
}