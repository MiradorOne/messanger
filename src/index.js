import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {store} from './app/store/index';
import App from './App';
import AuthModal from './app/components/_common/AuthModal';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import './index.css';

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} />
            <Route path="/auth" component={AuthModal}/>                    
        </Router>
    </Provider>,
  document.getElementById('root')
);
