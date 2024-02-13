import React, { Fragment, useState } from 'react'

import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { Box, Button, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import WrapTextIcon from '@mui/icons-material/WrapText';

import themesData from '../data/themesData';
import languageData from '../data/languageData';

function FormatWrapText({ setWrapTextToggle }) {
    return (<IconButton
        size="large"
        edge="start"
        color="inherit"
        id="basic-button-wrap-text"
        sx={{ mx: 0, my: 1 }}
        onClick={() => setWrapTextToggle(prop => !prop)}
    >
        <WrapTextIcon />
    </IconButton>)
}

function FormatCopy({ code }) {

    const [copySuccess, setCopySuccess] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code)
        setCopySuccess(true)
        setTimeout(() => {
            setCopySuccess(false)
        }, 1000)
    }

    return (<IconButton
        size="large"
        edge="start"
        color="inherit"
        sx={{ mx: 0, my: 1 }}
        onClick={copyToClipboard}
    >
        <ContentCopyIcon color={copySuccess ? 'success' : 'inherit'} />
    </IconButton>)
}

function FormatTheme({ codeTheme, setCodeTheme }) {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        // setFontSize(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (value) => {
        setCodeTheme(value);
        setAnchorEl(null);
    };

    return (<Fragment>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            id="basic-button-theme"
            aria-controls={open ? 'basic-menu-theme' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{ mx: 0, my: 1 }}
            onClick={handleClick}
        >
            <SettingsSharpIcon />
        </IconButton>
        <Menu
            id="basic-menu-theme"
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose(codeTheme)}
            MenuListProps={{
                'aria-labelledby': 'basic-button-theme',
            }}
        >
            {themesData.map(({ name }) => {
                return <MenuItem key={name} sx={{ bgcolor: (name === codeTheme ? theme.palette.primary.light : 'transparent') }} onClick={() => handleClose(name)}>{name}</MenuItem>
            })}
        </Menu>
    </Fragment>)
}

function FormatSize({ fontSize, setFontSize }) {

    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        // setFontSize(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (value) => {
        setFontSize(value);
        setAnchorEl(null);
    };
    const menuItems = [8, 10, 11, 12, 14, 16, 18, 20];
    return (<Fragment>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{ mx: 0, my: 1 }}
            onClick={handleClick}
        >
            <FormatSizeIcon />
        </IconButton>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose(fontSize)}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {menuItems.map((value) => {
                return <MenuItem key={value} sx={{ bgcolor: (value === fontSize ? theme.palette.primary.light : 'transparent') }} onClick={() => handleClose(value)}>{`${value} Pt`}</MenuItem>
            })}
        </Menu>
    </Fragment>)
}

function CodeBox({ data }) {

    const { language: initalLanguage, code } = data

    const muiTheme = useTheme()


    const [language, setLanguage] = useState(initalLanguage);
    const [codeTheme, setCodeTheme] = useState(muiTheme.palette.mode == 'dark' ? 'XCode Dark' : 'XCode Light');
    const [wrapText, setWrapTextToggle] = useState(undefined)
    const [value, setValue] = useState(code);
    const [fontSize, setFontSize] = useState(10);


    const handleLanguage = (event) => {
        setLanguage(event.target.value);
    };

    const onChange = React.useCallback((val, viewUpdate) => {
        setValue(val);
    }, []);

    const themeState = themesData.find(({ name }) => (codeTheme || 'XCode Dark') === name)?.value
    const languageState = languageData.find(({ name }) => (language || 'C++') === name)?.value

    return (
        <Box sx={{ height: '100%' }} >
            <Paper elevation={3}>
                <Stack
                    direction='row'
                    justifyContent='space-between'
                // bgcolor={muiTheme.palette.background.default}
                >
                    <FormControl sx={{ minWidth: '35%', m: 1, p: 0 }}>
                        {/* <InputLabel id="demo-simple-select-helper-label">Language</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={language}
                            // label="Language"
                            onChange={handleLanguage}
                            sx={{ m: 0, p: 0 }}
                        >
                            {languageData.map(({ name }) => {
                                return <MenuItem key={name} value={name}>{name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <Stack direction='row'>
                        <FormatWrapText setWrapTextToggle={setWrapTextToggle} />
                        <FormatCopy code={value} />
                        <FormatSize fontSize={fontSize} setFontSize={setFontSize} />
                        <FormatTheme codeTheme={codeTheme} setCodeTheme={setCodeTheme} />
                    </Stack>
                </Stack>
                <CodeMirror
                    height='auto'
                    // maxHeight={'80vh'}
                    value={value}
                    theme={themeState}
                    style={{ backgroundColor: 'transparent' }}
                    extensions={[languageState?.(), EditorView.theme({
                        "&": {
                            fontSize: `${fontSize}Pt`,
                            // border: "1px solid #c0c0c0"

                        }
                    }), ...(wrapText ? [EditorView.lineWrapping] : [])]}
                    onChange={onChange} />
            </Paper>
        </Box>
    )
}

export default CodeBox