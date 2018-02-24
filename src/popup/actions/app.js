import { getTab } from '../api';
import call from './action';

export const getCurrentTab = (...params) => call('SET_TAB', getTab(...params));