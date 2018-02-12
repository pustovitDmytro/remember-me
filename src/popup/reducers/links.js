const links = (state = {}, action) => {
    switch (action.type) {
    case 'GET_LINKS':
        return {
            ...state,
            array: action.payload
        };
    case 'ADD_LINK':
        return {
            ...state,
            array: action.payload
        };
    default:
        return state;
    }
};

export default links;