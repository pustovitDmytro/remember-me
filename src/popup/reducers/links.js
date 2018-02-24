const links = (state = [], action) => {
    switch (action.type) {
    case 'GET_LINKS':
        return [...action.payload];
    case 'ADD_LINK':
        return [...action.payload];
    case 'LOAD_LINKS':
        return [...action.payload]
    default:
        return state;
    }
};

export default links;