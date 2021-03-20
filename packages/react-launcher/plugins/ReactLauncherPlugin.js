let fs   = require('fs')
let path = require('path')

let VirtualModulesPlugin = require('webpack-virtual-modules')
let babelMerge           = require('babel-merge')

function readFile (filePath) {
	const BOM = 0xFEFF
	let text  = fs.readFileSync(filePath, 'utf-8')

	// strip BOM
	if (text.charCodeAt(0) === BOM) {
		text = text.slice(1)
	}
	return text
}

function ReactLauncherPlugin () {}

ReactLauncherPlugin.prototype.apply = function (compiler) {
	let launcherPath     = require.resolve('../launcher/launcher.js')
	let hotEntryPath     = require.resolve('../launcher/hot-entry.js')
	let launcherTemplate = readFile(launcherPath)
	let hotEntryTemplate = readFile(hotEntryPath)
	let virtualEntries   = Object.entries(compiler.options.entry)
		.reduce(function (modules, [name, modulePath]) {
			let launcherModulePath = launcherPath.replace('.js', `-${name}.js`)
			let hotEntryModulePath =  hotEntryPath.replace('.js', `-${name}.js`)
			let modulesPaths       = [].concat(modulePath)
			let entryPath          = modulesPaths
				.filter(filePath => path.isAbsolute(filePath))
				.filter(filePath => !filePath.includes('node_modules'))
				.pop()
			let entryIndex         = modulesPaths.indexOf(entryPath)
			let launcherCode       = launcherTemplate.replace('__hot-entry__', `./hot-entry-${name}`)
			let hotEntryCode       = hotEntryTemplate.replace('__entry__', entryPath.replace(/\\/g, '/'))

			modulesPaths[entryIndex]     = launcherModulePath
			compiler.options.entry[name] = modulesPaths
			modules[launcherModulePath]  = launcherCode
			modules[hotEntryModulePath]  = hotEntryCode

			return modules
		}, {})
	let virtualModules = new VirtualModulesPlugin(virtualEntries)


	compiler.options.module.rules.forEach(function addReactHotLoaderBabelPlugin (rule) {
		if (rule.oneOf) {
			rule.oneOf.forEach(addReactHotLoaderBabelPlugin)
		}
		if (rule.use) {
			rule.use
			.filter(function isBabelLoader (use) {
				const BABEL_NAME_EXP = /\bbabel-loader\b/

				return BABEL_NAME_EXP.test(use.loader)
			})
			.forEach(function addPlugin (use) {
				use.options = babelMerge(use.options, {
					plugins: [require.resolve('react-hot-loader/babel')]
				})
			})
		}
	})

	compiler.options.resolve.alias['react-dom'] = require.resolve('@hot-loader/react-dom')

	// console.log(compiler.options.resolve.alias)
	virtualModules.apply(compiler)
}

module.exports = ReactLauncherPlugin