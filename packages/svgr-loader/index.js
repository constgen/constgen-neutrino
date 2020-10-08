module.exports = function () {
	return function (neutrino) {
		const SVG_EXTENSIONS        = /\.svg$/i
		const REACT_EXTENSIONS      = /\.jsx?$/i
		const TYPESCRIPT_EXTENSIONS = /\.tsx?$/i
		// const REACT_QUERY           = /^\?jsx/i
		// const TYPESCRIPT_QUERY      = /^\?tsx/i
		let svgrLoaderPath = require.resolve('@svgr/webpack')
		// let productionMode          = neutrino.config.get('mode') !== 'development'
		let settings = {
			ref        : true,
			memo       : true,
			native     : false,
			dimensions : true,
			expandProps: 'end',
			prettier   : false,
			svgo       : false,
			svgoConfig : undefined,
			svgProps   : {},
			titleProp  : true
		}

		neutrino.config.module
			.rule('svg-component')
				.before('svg')
				.test(SVG_EXTENSIONS)
				.oneOf('react')
					.set('issuer', REACT_EXTENSIONS)
					.use('svgr')
						.loader(svgrLoaderPath)
						.options(settings)
						.end()
					.end()
				.oneOf('react-typescript')
					.set('issuer', TYPESCRIPT_EXTENSIONS)
					.use('svgr')
						.loader(svgrLoaderPath)
						.options({
							...settings,
							typescript: true
						})
						.end()
					.end()
				.end()

		// .rule('svg')
		// 	.oneOf('react')
		// 		.before('style')
		// 		.resourceQuery(REACT_QUERY)
		// 		.use('svgr')
		// 			.loader(svgrLoaderPath)
		// 			.options(settings)
		// 			.end()
		// 		.end()
		// 	.oneOf('react-typescript')
		// 		.after('react')
		// 		.resourceQuery(TYPESCRIPT_QUERY)
		// 		.use('svgr')
		// 			.loader(svgrLoaderPath)
		// 			.options({
		// 				...settings,
		// 				typescript: true
		// 			})
		// 			.end()
		// 		.end()
		// 	.end()
	}
}