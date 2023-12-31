import React, { useState } from 'react';
import CodeMirror, { EditorSelection, EditorState, EditorView } from '@uiw/react-codemirror';
import { Box, Button, Stack, Typography } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import themesData from '../data/themesData';
import languageData from '../data/languageData';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { cpp } from '@codemirror/lang-cpp';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { sql } from '@codemirror/lang-sql';


const sampleCode = `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello World";
}
`

const CodeBlock = ({ data }) => {

    const { title, language: initalLanguage, code } = data

    const [language, setLanguage] = useState(initalLanguage);
    const [theme, setTheme] = useState('VSCode Dark');
    const [value, setValue] = useState(code);
    const [copySuccess, setCopySuccess] = useState(false)


    const handleLanguage = (event) => {
        setLanguage(event.target.value);
    };

    const handleTheme = (event) => {
        setTheme(event.target.value);
    };

    const onChange = React.useCallback((val, viewUpdate) => {
        setValue(val);
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value)
        setCopySuccess(true)
        setTimeout(() => {
            setCopySuccess(false)
        }, 1000)
    }

    const themeState = themesData.find(({ name }) => (theme || 'VSCode Dark') === name)?.value
    const languageState = languageData.find(({ name }) => (language || 'C++') === name)?.value


    return (
        <Box height='90vh'>
            <Stack direction='row' my={1} mb={3} mx={1} justifyContent={'space-between'}>
                <Typography variant='h3' letterSpacing={1} fontWeight={500} >
                    {title}
                </Typography>
                <Button onClick={copyToClipboard} size='large' color={copySuccess ? 'success' : 'primary'} sx={{ fontSize: '1rem', p: 0 }} >
                    {copySuccess ? 'Copied' : 'Copy'}
                </Button>
            </Stack>
            <Stack
                direction='row'
                justifyContent={'space-between'}
                mb={{ xs: 1, md: 2 }}
            >
                <FormControl sx={{ minWidth: '45%', mb: 1 }}>
                    <InputLabel id="demo-simple-select-helper-label">Language</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={language}
                        label="Language"
                        onChange={handleLanguage}
                    >
                        {languageData.map(({ name }) => {
                            return <MenuItem key={name} value={name}>{name}</MenuItem>
                        })}
                    </Select>
                    {/* <FormHelperText>With label + helper text</FormHelperText> */}
                </FormControl>
                <FormControl sx={{ minWidth: '50%', mb: 1 }}>
                    <InputLabel id="demo-simple-select-helper-label">Theme</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={theme}
                        label="Theme"
                        onChange={handleTheme}
                    >
                        {themesData.map(({ name, value }) => {
                            return <MenuItem key={name} value={name}>{name}</MenuItem>
                        })}
                    </Select>
                    {/* <FormHelperText>With label + helper text</FormHelperText> */}
                </FormControl>
            </Stack>
            {/* <TransformWrapper> */}
            {/* <TransformComponent> */}
            <CodeMirror
                // className={'prevent-select parent'}
                // contentEditable={'false'}
                // readOnly={true}
                // onMouseDown={(e) => {e.preventDefault()}}
                // onClick={(e) => {e.preventDefault()}}
                // onSelect={(e) => {e.preventDefault()}}
                // onMouseUp={(e) => {e.preventDefault()}}
                height='auto'
                maxHeight={'70vh'}
                value={value}
                theme={themeState}
                extensions={[languageState?.(), EditorView.lineWrapping]}
                onChange={onChange} />
            {/* </TransformComponent> */}
            {/* </TransformWrapper> */}
        </Box>)
}

export default CodeBlock