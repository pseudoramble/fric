import './favicon.ico';
import './index.html';
import 'babel-core/polyfill';
import 'normalize.css/normalize.css';
import './scss/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import startup from './startup';

startup();

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
