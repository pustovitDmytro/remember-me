import { addOne, addMany, getAll } from '../api';
import call from './action';

export const addLink = (...params) => call('ADD_LINK', addOne(...params));
export const addLinks = (...params) => call('ADD_LINK', addMany(...params));
export const loadLinks = (...params) => call('LOAD_LINKS', getAll(...params));