let path = require('path')

let deepmerge        = require('deepmerge')
let { DefinePlugin } = require('webpack')

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		const HTTP_PORT         = 80
		const HTTPS_PORT        = 443
		let launcherPath        = path.resolve(__dirname, './launcher/launcher.js')
		let certPath            = path.resolve(__dirname, './ssl/localhost.pem')
		let developmentMode     = neutrino.config.get('mode') === 'development'
		let defaultSettings     = {
			port: undefined,
			http: 1,
			ssl : undefined
		}
		let settings            = deepmerge(defaultSettings, customSettings)
		let useSSL              = Boolean(settings.ssl)
		let httpVersion         = parseInt(settings.http, 10) || 1
		let defaultProtocolPort = useSSL ? HTTPS_PORT : HTTP_PORT
		let defaultPort         = developmentMode ? 0 : defaultProtocolPort
		let defaultHost         = ''
		let port                = parseFloat(settings.port) >= 0 ? Number(settings.port) : defaultPort
		let protocol            = (httpVersion > 1 && `http${httpVersion}`) || (useSSL && 'https') || 'http'

		neutrino.config
			.when(developmentMode, function (config) {
				config
					.watch(true)
					.resolve
						.alias
							.set('webpack/hot/log', require.resolve('webpack/hot/log'))
							.end()
						.end()
					.plugin('hot')
						.use(require.resolve('webpack/lib/HotModuleReplacementPlugin'))
						.end()
			})
			.plugin('define-env')
				.use(DefinePlugin, [{
					'process.env.PORT': `process.env.PORT || ${port}`,
					'process.env.HOST': `process.env.HOST || ${JSON.stringify(defaultHost)}`,
					'__http__'        : JSON.stringify(protocol),
					'__ssl__'         : JSON.stringify(settings.ssl),
					'__CERT_PATH__'   : JSON.stringify(certPath)
				}])
				.end()

		Object.keys(neutrino.options.mains).forEach(function (key) {
			neutrino.config
				.entry(key)
					.clear()
					.add(launcherPath)
					.when(developmentMode, function (entry) {
						entry.add(`${require.resolve('webpack/hot/poll')}?1000`)
					})
					.end()
				.resolve
					.alias
						.set('__entry__', path.resolve(__dirname, neutrino.options.mains[key].entry))
						.end()
					.end()
		})
	}
}