const links = (state = {}, action) => {
    console.log("action", action);
    switch (action.type) {
    case 'GET_LINKS':
        return {
            ...state,
            links: action.payload
        };
    case 'ADD_LINK':
        return {
            ...state,
            links: [...action.payload]
        };
    default:
        return state;
    }
};

export default links;