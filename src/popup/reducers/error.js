export default (state = {}, action) => {
    switch (action.type) {
    case 'API_ERROR':
        return {
            ...action.payload
        }
    default:
        return {};
    }
};