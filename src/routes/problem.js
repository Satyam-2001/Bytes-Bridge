import { Fragment } from 'react';
import { Outlet } from 'react-router';
import App from '../App';
import PrloblemBlock from '../pages/Problem';
import Solutions from '../pages/Problem/Solutions'
import Solution from '../pages/Problem/Solutions/Solution'
import CreateSoltuion from '../pages/Problem/Solutions/CreateSolution';

const problem = {
    path: '/problem',
    children: [
        {
            index: true,
            element: <Fragment />
        },
        {
            path: ':problemID',
            element: <PrloblemBlock />,
            children: [
                {
                    path: ':solutionID',
                    element: <Solution />
                },
                {
                    path: 'post',
                    element: <CreateSoltuion />,
                }
            ]
        },
    ]
}

export default problem;