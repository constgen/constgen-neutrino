module.exports = function toUnixPath (pathname) {
	return pathname.replace(/\\/g, '/')
}