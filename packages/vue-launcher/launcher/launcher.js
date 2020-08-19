import Vue from 'vue'
import Entry from '__entry__' // eslint-disable-line import/no-unresolved

let rootElement = document.querySelector('#root')

if (!rootElement) {
	rootElement    = document.createElement('div')
	rootElement.id = 'root'
	document.body.appendChild(rootElement)
}

rootElement.style.width  = '100%'
rootElement.style.height = '100%'

new Vue({
	el  : rootElement,
	name: 'Launcher',
	render (createElement) { return createElement(Entry) }
})