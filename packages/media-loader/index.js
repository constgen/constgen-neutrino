const VIDEO_EXTENSIONS = /\.(mp4|webm|mpeg|ogv|avi|mov)$/i
const AUDIO_EXTENSIONS = /\.(webm|wav|mp3|m4a|aac|oga)$/i
// eslint-disable-next-line const-case/uppercase
const MEDIA_EXTENSIONS = Object.freeze([VIDEO_EXTENSIONS, AUDIO_EXTENSIONS])

module.exports = function () {
	return function (neutrino) {
		let productionMode = neutrino.config.get('mode') === 'production'
		let outputPath     = productionMode ? 'media' : undefined
		let name           = productionMode ? '[name].[hash:8].[ext]' : '[path][name].[ext]'

		neutrino.config
			.module
				.rules
					.delete('media')
					.end()
				.rule('media')
					.test(MEDIA_EXTENSIONS)
					.use('file')
						.loader(require.resolve('file-loader'))
						.options({
							outputPath,
							name
						})
						.end()
					.end()
				.end()
	}
}

module.exports.VIDEO_EXTENSIONS = VIDEO_EXTENSIONS
module.exports.AUDIO_EXTENSIONS = AUDIO_EXTENSIONS
module.exports.MEDIA_EXTENSIONS = MEDIA_EXTENSIONS