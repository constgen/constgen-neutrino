import 'react-hot-loader/patch';
import React from 'react'; // eslint-disable-line import/no-unresolved
import { render } from 'react-dom'; // eslint-disable-line import/no-unresolved

import HotEntry from './hot-entry';

render(React.createElement(HotEntry), document.getElementById('root'));