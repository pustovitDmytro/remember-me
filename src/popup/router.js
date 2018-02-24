import UniversalRouter from 'universal-router';
const routes = [
    {
        path: ['', 'home', '/home', 'home/'],
        action: () => {
            console.log('action home');
            return `<h1>Home</h1>`;
        }
    }, {
        path: '/browse',
        action: () => `<h1>Browse</h1>`
    }, {
        path: '.*',
        action: () => {
            console.log('any');
            return `<h1>404</h1>`;
        }
    }, {
        path: '/',
        action: () => {
            console.log('any2');
            return `<h1>404 2</h1>`;
        }
    }
]

export default new UniversalRouter(routes, {
    errorHandler(error) {
        console.error(error)
        console.dir(error.context)
        return error.code === 404
            ? '<h1>Page Not Found</h1>'
            : '<h1>Oops! Something went wrong</h1>'
    }
})