import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {store} from './app/store/index';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
      <Provider store={store}>
          <App />
      </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
