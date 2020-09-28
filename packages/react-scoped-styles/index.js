const { ConfigurationError } = require('neutrino/errors')

const STYLE_EXTENSIONS         = /\.(css|scss|sass|less|styl|pcss)$/
const STYLE_MODULES_EXTENSIONS = /\.module\.(css|scss|sass|less|styl|pcss)$/
const JSX_EXTENSIONS           = /\.(jsx|tsx)$/

function reactScopedComponent (settings = {}) {
	return function (neutrino) {
		neutrino.config.module
			.rule('scoped-component')
				.test(JSX_EXTENSIONS)
				.post() // Should process pure JS after all transformations
				.include
					.merge([neutrino.options.source, neutrino.options.tests])
					.end()
				.use('react-scoped-styles')
					.loader(require.resolve('./loaders/component-loader'))
					.options(settings)
	}
}

function reactScopedStyle (settings = {}) {
	return function (neutrino) {
		let styleRule = neutrino.config.module.rules.get('style')

		if (!styleRule) {
			throw new ConfigurationError(`’react-scoped-styles’ middleware requires ’neutrino.config.module.rule("style")’ to be defined before`)
		}

		neutrino.config.module
			.rule('scoped-style')
				.after('style') // Should process pure CSS before it is passed to css-loader but after CSS preprocessors
				.test(STYLE_EXTENSIONS)
				.include
					.merge([neutrino.options.source, neutrino.options.tests])
					.end()
				.exclude
					.add(STYLE_MODULES_EXTENSIONS)
					.end()
				.set('issuer', JSX_EXTENSIONS)
				.use('react-scoped-styles')
					.loader(require.resolve('./loaders/style-loader'))
					.options(settings)
					.end()
	}
}

module.exports = function () {
	let scopedStylesSettings = {
		globalsPrefix: 'app'
	}

	return function (neutrino) {
		neutrino.use(reactScopedComponent(scopedStylesSettings))
		neutrino.use(reactScopedStyle(scopedStylesSettings))
	}
}

module.exports.reactScopedComponent = reactScopedComponent
module.exports.reactScopedStyle     = reactScopedStyle