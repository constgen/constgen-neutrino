/* eslint-disable promise/no-callback-in-promise */
let csstree               = require('css-tree')
let { SourceMapConsumer } = require('source-map')

let getDirectoryHashFromPath = require('../utils/get-directory-hash-from-path')
let toUnixPath               = require('../utils/to-unix-path')

module.exports = function styleLoader (source, sourceMap) {
	let globalsPrefix                  = this.query.globalsPrefix || 'app'
	let [directoryName, directoryHash] = getDirectoryHashFromPath(this.context)
	let filename                       = this.resourcePath
	let ast                            = csstree.parse(source, {
		filename : toUnixPath(filename),
		positions: true
	})
	let callback                       = this.async()
	let whenSourceMapConsumerReady     = sourceMap ? new SourceMapConsumer(sourceMap) : Promise.resolve()

	this.cacheable && this.cacheable(true)
	csstree.walk(ast, {
		visit: 'ClassSelector',
		enter (node) {
			let className = node.name

			if (className.startsWith(globalsPrefix)) return
			node.name = `${directoryName}-${directoryHash}-${className}`
		}
	})

	whenSourceMapConsumerReady
		.then(mapConsumer => {
			let result = csstree.generate(ast, {
				sourceMap: this.sourceMap // if true, returns object instead of string
			})
			let css    = result
			let map    = {}

			if (typeof result === 'object') {
				css = result.css
				map = result.map
				if (mapConsumer) {
					map.applySourceMap(mapConsumer, toUnixPath(filename))
				}
				map = map.toJSON()
				if (!mapConsumer) {
					map.sourcesContent = [source]
				}
			}
			if (mapConsumer) {
				mapConsumer.destroy()
			}
			return { css, map }
		})
		.then(({ css, map }) => callback(undefined, css, map))
		.catch(err => callback(err))
}
/* eslint-enable */