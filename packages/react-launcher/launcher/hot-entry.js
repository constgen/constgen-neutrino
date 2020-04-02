import { hot, setConfig } from 'react-hot-loader'

setConfig({ logLevel: 'error' })

function requireEntry () {
	let Entry = require('__entry__') // eslint-disable-line import/no-unresolved

	return Entry.default || Entry
}

if (module.hot) {
	console.clear() // eslint-disable-line no-console
}

export default hot(module)(requireEntry())