import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { useThemeParams } from '@vkruglikov/react-telegram-web-app';

// mui theme settings
export const themeSettings = (mode, themeParams) => {
    const theme = createTheme({
        palette: {
            mode: mode,
            ...(themeParams.bg_color
                ? {
                    // palette values for dark mode
                    primary: {
                        main: themeParams.button_color,
                    },
                    secondary: {
                        main: themeParams.button_text_color,
                    },
                    // neutral: {
                    //     dark: colors.grey[700],
                    //     main: 'black',
                    //     light: colors.grey[100],
                    // },
                    text: {
                        primary: themeParams.text_color
                    },
                    background: {
                        paper: themeParams.secondary_bg_color,
                        default: themeParams.bg_color,
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        main: 'rgb(47, 133, 247)',
                    },
                    // secondary: {
                    //     main: colors.greenAccent[500],
                    // },
                    // neutral: {
                    //     dark: colors.grey[700],
                    //     main: colors.grey[500],
                    //     light: colors.grey[100],
                    // },
                    // text: {
                    //     primary: 'white',
                    // },
                    background: {
                        default: "#212121"
                        // "#fcfcfc",
                    },
                }),
        },
        typography: {
            allVariants: {
                color: themeParams.text_color || 'white',
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
        },
    });
    return theme;
};

export const useMode = () => {
    const [colorMode, themeParams] = useThemeParams();
    const [mode, setMode] = useState('system')
    useEffect(() => {
        setMode(localStorage.getItem(mode) || 'dark')
    }, [])
    const changeMode = (mode) => {
        localStorage.setItem(mode)
        setMode(mode)
    }
    const finalMode = mode === 'system' ? colorMode : mode;
    const theme = themeSettings(finalMode, themeParams);
    return { mode: finalMode, theme, changeMode, themeParams };
};
