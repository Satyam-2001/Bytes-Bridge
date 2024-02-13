import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import router from './routes'
import { ColorModeProvider } from "./theme";
import { AuthProvider } from './context/AuthProvider';

import './index.css'

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ColorModeProvider>
      <RouterProvider router={router} />
    </ColorModeProvider>
  </AuthProvider>
);