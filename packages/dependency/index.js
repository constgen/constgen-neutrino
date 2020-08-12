let CircularDependencyPlugin = require('circular-dependency-plugin')
let DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

module.exports = function () {
	return function (neutrino) {
		neutrino.config
			.plugin('depend')
				.use(CircularDependencyPlugin, [{
					exclude: /node_modules/,
					failOnError: false,
					allowAsyncCycles: true,
					cwd: process.cwd()
				}])
				.end()
			.plugin('depend')
				.use(DuplicatePackageCheckerPlugin, [{
					verbose: true,
					emitError: false,
					showHelp: true,
					strict: true
				}])
				.end()
	}
}