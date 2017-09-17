import {applyMiddleware, createStore, compose} from 'redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import {config} from '../../db/index';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers';

const middleware = applyMiddleware(thunk.withExtraArgument(getFirebase));

const createStoreWithFirebase = compose(
    reactReduxFirebase(config, { userProfile: 'users', enableLogging: false }),
    middleware,
)(createStore);

export const store = createStoreWithFirebase(rootReducer, {});