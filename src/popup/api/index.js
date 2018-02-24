import StorageClient from './StorageClient.js';
import TabClient from './TabClient.js';

const call = client => (method, ...params) => client[method](...params);

export const addOne = link => call(StorageClient)('append', 'links', link);
export const addMany = links => call(StorageClient)('append', 'links', links);
export const getAll = () => call(StorageClient)('get', 'links');

export const getTab = () => call(TabClient)('get');