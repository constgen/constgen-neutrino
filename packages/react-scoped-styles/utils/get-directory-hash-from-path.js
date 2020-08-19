const path   = require('path')
const crypto = require('crypto')

module.exports = function getDirectoryHashFromPath (filePath) {
	const LENGTH                                    = 10
	let { dir: directoryPath, name: directoryName } = path.parse(filePath)

	let directoryHash = crypto
		.createHash('md5')
		.update(directoryPath)
		.digest('hex')
		.slice(0, LENGTH)

	return [directoryName, directoryHash]
}