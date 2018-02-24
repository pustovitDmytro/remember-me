import browser from '../../polifils/browser.js';
class Client {
    constructor({ browser }){
        this.browser = browser;
    }

    get(){
        return new Promise((res, rej) => {
            this.browser.tabs.query({ active: true, currentWindow: true }, arrayOfTabs => {
                const [activeTab] = arrayOfTabs;
                res(activeTab.url)
            });
        });
    }
}

export default new Client({ browser });