import 'react-hot-loader/patch'
import React from 'react'
import { render } from 'react-dom'
import HotEntry from '__hot-entry__' // eslint-disable-line import/no-unresolved

let rootElement = document.querySelector('#root')

if (!rootElement) {
	rootElement    = document.createElement('div')
	rootElement.id = 'root'
	document.body.appendChild(rootElement)
}

rootElement.style.display = 'block'
rootElement.style.height  = '100%'

render(React.createElement(HotEntry), rootElement)