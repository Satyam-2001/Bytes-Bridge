import App from '../App'
import problem from './problem'

import {
    createBrowserRouter,
    createHashRouter,
} from "react-router-dom";
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <App />,
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/signin',
                element: <Signin />
            },
            problem,
        ],
    },
]);

export default router;