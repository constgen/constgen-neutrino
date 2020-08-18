import Vue from 'vue'
import Entry from '__entry__' // eslint-disable-line import/no-unresolved

let rootElement = document.getElementById('root')

if (!rootElement) {
	rootElement = document.createElement('div')
	rootElement.id = 'root'
	document.body.appendChild(rootElement)
}

rootElement.style.width = '100%'
rootElement.style.height = '100%'

new Vue({
	el: rootElement,
	render (createElement) { return createElement(Entry) }
})