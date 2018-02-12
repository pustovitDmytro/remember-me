import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import browser from '../polifils/browser.js';

import App from './components/App';

const loggerMiddleware = createLogger();

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

const init = () => {
    const getTab = new Promise((res, rej) => {
        browser.tabs.query({ active: true, currentWindow: true }, arrayOfTabs => {
            const [activeTab] = arrayOfTabs;
            console.log("activeTab", activeTab.url);
        });
    });
}


const launch = () => {
    render(<Provider store={store}>
        <App store={store}/>
    </Provider>, document.getElementById('app'));
};

launch();
// /*
//  * import browser from './../polifils/browser.js';
//  * import css from './popup.scss';
//  */

// /*
//  * const photo = document.getElementById("photo");
//  * photo.className=`${css.eye} ${css.eye__closed}`;
//  * photo.onclick=function(){
//  *     console.log('clicked in popup');
//  *     console.log(window.location.href);
//  *     browser.tabs.query({ active: true, currentWindow: true }, (arrayOfTabs) => {
//  *         const [activeTab] = arrayOfTabs;
//  *         console.log("activeTab", activeTab.url);
//  *     });
//  *     chrome.storage.sync.get('value', (obj) => {
//  *         console.log(obj);
//  *     });
//  *     photo.className=`${css.eye} ${css.eye__opened}`;
//  * }
//  */