import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App.js'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import RootLayout from './RootLayout.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [{
      path: "/",
      element: <App />,
    },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);