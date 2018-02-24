export default (state = {}, action) => {
    switch (action.type) {
    case 'ACTIVATE':
        return {
            ...state,
            activation: Boolean(action.payload)
        };
    case 'SET_TAB':
        return {
            ...state,
            tab: action.payload
        };
    case 'SET_LOCATION':
        return {
            ...state,
            location: action.payload
        }
    default:
        return { ...state };
    }
};