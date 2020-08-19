let path = require('path')

let copy = require('@neutrinojs/copy')

module.exports = function () {
	return function (neutrino) {
		let staticDirectoryPath = path.join(neutrino.options.source, 'static')

		neutrino.use(copy({
			patterns: [{
			  context: staticDirectoryPath,
			  from   : '**/*',
			  to     : path.basename(staticDirectoryPath)
			}]
		 }))
	}
}