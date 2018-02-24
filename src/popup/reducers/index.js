import { combineReducers } from 'redux';
import links from './links';
import error from './error';
import app from './app';

const rootReducer = combineReducers({
    links,
    error,
    app
});

export default rootReducer;