let CircularDependencyPlugin      = require('circular-dependency-plugin')
let DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
let CaseSensitivePathsPlugin      = require('case-sensitive-paths-webpack-plugin')

module.exports = function () {
	return function (neutrino) {
		neutrino.config
			.plugin('circular')
				.use(CircularDependencyPlugin, [{
					exclude         : /node_modules/,
					failOnError     : false,
					allowAsyncCycles: true,
					cwd             : process.cwd()
				}])
				.end()
			.plugin('duplicate')
				.use(DuplicatePackageCheckerPlugin, [{
					verbose  : true,
					emitError: false,
					showHelp : true,
					strict   : true
				}])
				.end()
			.plugin('case-sense')
				.use(CaseSensitivePathsPlugin, [{
					debug: neutrino.options.debug
				}])
				.end()
	}
}