let getDirectoryHashFromPath = require('./utils/get-directory-hash-from-path')

module.exports = function componentLoader (source, sourceMaps) {
	let { globalsPrefix = 'app' } = this.query
	const CLASS_EXPR              = /classname:\s(["'].*?["']|.*?\))/gi
	const CLASS_STRING_EXPRESSION = /["'|](.*?)["'|]/g

	if (!source.match(CLASS_EXPR)) {
		return source
	}
	let [directoryName, directoryHash] = getDirectoryHashFromPath(this.context)

	function privateClassName (_match, classNames) {
		let uniqueClassNames = classNames.split(' ')
				.filter(Boolean)
				.map(className => {
					let containsPrefix  = className.startsWith(`${globalsPrefix}-`)
					let uniqueClassName = `${directoryName}-${directoryHash}-${className}`

					return containsPrefix ? className : uniqueClassName
				})
				.join(' ')

		return JSON.stringify(uniqueClassNames)
	}

	let output = source.replace(CLASS_EXPR, classExpr => classExpr.replace(CLASS_STRING_EXPRESSION, privateClassName))

	this.cacheable && this.cacheable(true)
	this.callback(undefined, output, sourceMaps)
}