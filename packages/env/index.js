let { EnvironmentPlugin } = require('webpack')

module.exports = function () {
	return function ({ config }) {
		let envVariables = Object.keys(process.env)

		config.plugin('env').use(EnvironmentPlugin, envVariables)
	}
}