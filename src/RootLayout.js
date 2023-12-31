import React from 'react'
import { Outlet } from 'react-router'
import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import { ThemeProvider } from "@mui/material";
import { useMode } from "./theme";

function RootLayout() {

    return (
        <WebAppProvider options={{ smoothButtonsTransition: true }}>
            <Outlet />
        </WebAppProvider>
    )
}

export default RootLayout