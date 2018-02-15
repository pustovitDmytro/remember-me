import Client from './StorageClient.js';

const call = client => (method, type, ...params) => dispatch => client[method](...params).
    then(response => new Promise( resolve => {
        dispatch({
            type,
            payload: response
        })
        resolve(response);
    })).catch(error => {
        console.error(error);
        dispatch({
            type: "API_ERROR",
            error,
        });
    })

export const addLink = link => call(Client)('append', 'ADD_LINK', 'links', link);
export const saveList = list => call(Client)('set', 'SAVE_LIST', 'links', list);