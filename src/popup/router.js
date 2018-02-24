import UniversalRouter from 'universal-router';
import routes from './routes';

export default new UniversalRouter(routes, {
    errorHandler(error) {
        console.error(error);
        throw error;
    }
})