/*
 * import App from './components/App';
 *
 */
import React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
    render() {
        return (
            <div>
                {
                    "ssssssssssssssssssss"
                }
            </div>
        );
    }
}
// console.log(document.getElementById('app'));
render(<App />, document.getElementById('app'));

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