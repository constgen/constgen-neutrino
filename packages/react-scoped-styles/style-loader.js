/* eslint-disable promise/no-callback-in-promise */
let csstree = require('css-tree')
let { SourceMapConsumer } = require('source-map')

let { createDirHash } = require('./utils/dirhash')
let toUnixPath = require('./utils/to-unix-path')

module.exports = function styleLoader (source, sourceMap) {
	let { globalsPrefix = 'app' } = this.query
	let [dirName, dirHash] = createDirHash(this.context)
	let filename = this.resourcePath
	let ast = csstree.parse(source, {
		filename: toUnixPath(filename),
		positions: true
	})
	let callback = this.async()

	this.cacheable && this.cacheable(true)
	csstree.walk(ast, {
		visit: 'ClassSelector',
		enter (node) {
			let className = node.name

			if (className.startsWith(globalsPrefix)) return
			node.name = `${dirName}-${dirHash}-${className}`
		}
	})

	new SourceMapConsumer(sourceMap)
		.then(mapConsumer => {
			let result = csstree.generate(ast, {
				sourceMap: this.sourceMap // if true, returns object instead of string
			})
			let css = result
			let map

			if (typeof result === 'object') {
				css = result.css
				map = result.map
				map.applySourceMap(mapConsumer, toUnixPath(filename))
				map = map.toJSON()
			}
			mapConsumer.destroy()
			return { css, map }
		})
		.then(({ css, map }) => callback(null, css, map))
		.catch(err => callback(err))
}
/* eslint-enable */