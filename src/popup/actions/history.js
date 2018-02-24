import call from './action';
import router from '../router';

export const setLocation = pathname => call('SET_LOCATION', router.resolve({ pathname }));