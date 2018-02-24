import browser from '../../polifils/browser.js';
import { isEmpty } from './utils'
class Client {
    constructor({ browser }){
        this.browser = browser;
    }

    get(key){
        return new Promise((res, rej) => {
            this.browser.storage.sync.get(key, value => {
                try {
                    if (this.browser.runtime.lastError){
                        return rej(this.browser.runtime.lastError);
                    }
                    if(isEmpty(value)) {
                        return res([]);
                    }
                    const parsed = JSON.parse(value[key]);
                    return res(parsed);
                } catch(error){
                    return rej({
                        type: 'STORAGE_ERROR',
                        code: error,
                        text: `Cannot get ${key}`,
                        field: key
                    })
                }
            });
        });
    }

    set(key, value){
        return new Promise((res, rej) => {
            const storageObject = { [key]: [JSON.stringify(value)] }
            this.browser.storage.sync.set(storageObject, () => {
                try {
                    if (this.browser.runtime.lastError){
                        return rej(this.browser.runtime.lastError);
                    }
                    return res(value);
                } catch(error){
                    return rej({
                        type: 'STORAGE_ERROR',
                        code: error,
                        text: `Cannot set ${key}`,
                        field: key
                    })
                }
            });
        });
    }

    append(key, value){
        return new Promise(async (res, rej) => {
            try{
                const stored = await this.get(key);
                const prev = Array.isArray(stored)
                    ? stored
                    : [];
                const filtered = Array.isArray(value)
                    ? value.filter(item => prev.includes(item))
                    : prev.includes(value)
                        ? []
                        : [value]
                prev.push(...filtered);
                return res(this.set(key, prev));
            }catch(error){
                return rej({
                    type: 'STORAGE_ERROR',
                    code: error,
                    text: `Cannot append ${key}`,
                    field: key
                })
            }
        });
    }
}

export default new Client({ browser });