import browser from '../../polifils/browser.js';
import { isEmpty } from './utils'
class Client {
    constructor({ browser }){
        this.browser = browser;
    }

    get(key){
        return new Promise((res, rej) => {
            this.browser.storage.sync.get(key, value => {
                console.log("value", value);
                try {
                    if(isEmpty(value)) {
                        console.log("isEmpty(value)", isEmpty(value));
                        return res([]);
                    }
                    const parsed = JSON.parse(value);
                    return res(parsed);
                } catch(error){
                    return rej({
                        type: 'STORAGE_ERROR',
                        code: error,
                        text: 'Wrong Item',
                        field: key
                    })
                }
            });
        });
    }

    set(key, value){
        return new Promise((res, rej) => {
            const storageObject = { [key]: [JSON.stringify(value)] }
            console.log("storageObject", storageObject);
            this.browser.storage.sync.set(storageObject, res);
        });
    }

    append(key, value){
        return new Promise(async (res, rej) => {
            try{
                let prev = await this.get(key);
                console.log("prev", prev);
                if(!prev.length){
                    prev = []
                }
                prev.append(value);
                console.log("prev", prev);
                return res(this.set(key, prev));
            }catch(error){
                return rej({
                    type: 'STORAGE_ERROR',
                    code: error,
                    text: 'Wrong Item',
                    field: key
                })
            }
        });
    }
}

export default new Client({ browser });