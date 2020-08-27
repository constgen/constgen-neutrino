import Vue from 'vue'
import Entry from '__entry__' // eslint-disable-line import/no-unresolved

let rootElement     = document.querySelector('#root')
let productionMode  = process.env.NODE_ENV === 'production'
let developmentMode = !productionMode

if (!rootElement) {
	rootElement    = document.createElement('div')
	rootElement.id = 'root'
	document.body.appendChild(rootElement)
}

Vue.config.productionTip = productionMode
Vue.config.performance   = developmentMode

if (Entry instanceof Vue) {
	Entry.$mount(rootElement)
}
else {
	new Vue({
		el  : rootElement,
		name: 'Launcher',
		render (createElement) {
			return createElement('div', {
				style: {
					display: 'block',
					height : '100%'
				}
			}, [createElement(Entry)])
		}
	})
}