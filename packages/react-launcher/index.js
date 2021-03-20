let ReactLauncher = require('./plugins/ReactLauncherPlugin')

module.exports = function () {
	return function (neutrino) {
		let projectPath = process.cwd()

		neutrino.config
			.devServer
				.merge({
					clientLogLevel: 'silent'
				})
				.end()
			.resolve
				.alias
					.set('react', require.resolve('react', { paths: [projectPath] }))
					.set('react-dom', require.resolve('react-dom', { paths: [projectPath] }))
					.end()
				.end()
		.plugin('launcher')
			.use(ReactLauncher)
			.end()
	}
}