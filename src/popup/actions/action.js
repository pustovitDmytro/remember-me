export default (type, promise) => dispatch => promise.then(response => new Promise( resolve => {
    dispatch({
        type,
        payload: response
    })
    resolve(response);
})).catch(error => {
    console.error(error);
    dispatch({
        type: "ERROR",
        error,
    });
})
