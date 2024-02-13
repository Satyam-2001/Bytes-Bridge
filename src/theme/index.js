import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

// mui theme settings
export const themeSettings = (mode) => {
    const typography = {
        allVariants: {
            color: (mode === 'light' ? 'black' : 'white'),
        },
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 40,
        },
        h2: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 32,
        },
        h3: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 24,
        },
        h4: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 20,
        },
        h5: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 16,
        },
        h6: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 14,
        },
    }
    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: 'rgb(47, 133, 247)',
            },
            background: {
                default: '#e9e9e9',
                paper: '#ffffff',
            },
        },
        typography,
    })
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: 'rgb(47, 133, 247)',
            },
            background: {
                default: '#101418',
                paper: '#101418',
            },
        },
        typography,
    })

    return mode === 'light' ? lightTheme : darkTheme;
};

export const ColorModeContext = createContext({ mode: 'dark', toggleMode: () => { } });

export const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = useState('dark')

    useEffect(() => {
        const storedMode = localStorage.getItem('mode');
        if (storedMode) {
            setMode(storedMode)
        }
    }, [])

    // useEffect(() => {
    //     localStorage.setItem('mode', mode)
    // }, [mode])

    const toggleMode = () => {
        setMode(prop => {
            const new_mode = prop === 'light' ? 'dark' : 'light'
            localStorage.setItem('mode', new_mode)
            return new_mode
        })
    }

    const theme = themeSettings(mode);
    return (
        <ColorModeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>)
}