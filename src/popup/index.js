import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import App from './components/App';
import { getCurrentTab } from './actions/app.js';
import { loadLinks } from './actions/lists.js';
import { setLocation } from './actions/history.js';

const loggerMiddleware = createLogger();

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

const init = () => Promise.all([
    store.dispatch(getCurrentTab()),
    store.dispatch(loadLinks()),
    store.dispatch(setLocation('/home'))
]);


const launch = async () => {
    await init();
    render(<Provider store={store}>
        <App store={store}/>
    </Provider>, document.getElementById('app'));
};

launch();