import 'react-hot-loader/patch'
import React from 'react'
import { render } from 'react-dom'

import HotEntry from './hot-entry'

render(React.createElement(HotEntry), document.getElementById('root'))