import './index.css';
import '../node_modules/roboto-fontface/css/roboto/roboto-fontface.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configureStore } from 'store';
//import * as serviceWorker from './serviceWorker';

import { initializeIcons } from '@uifabric/icons';
import { Provider } from 'react-redux';

initializeIcons();

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
