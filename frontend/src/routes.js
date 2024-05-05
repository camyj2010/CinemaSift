import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import Movie from './pages/Movie';

const routes = createBrowserRouter(
    [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/:title',
            element: <Movie/>
        }
    ]
);

export default routes;