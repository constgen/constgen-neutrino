import 'react-hot-loader/patch'
import React from 'react'
import { render } from 'react-dom'

import HotEntry from './hot-entry'

let rootElement = document.getElementById('root')

if (!rootElement) {
	rootElement = document.createElement('div')
	rootElement.id = 'root'
	document.body.appendChild(rootElement)
}

rootElement.style.width = '100%'
rootElement.style.height = '100%'

render(React.createElement(HotEntry), rootElement)