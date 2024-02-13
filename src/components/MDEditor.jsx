import React, { Fragment, useRef, useState } from 'react'
import 'react-markdown-editor-lite/lib/index.css';
import { useTheme } from '@mui/material';
import './MDEditor.css'

import MDEditor from '@uiw/react-md-editor';


function MDEditor_(props) {

    const theme = useTheme()
    const [value, setValue] = useState('')

    return (
        <Fragment>
            <div data-color-mode={theme.palette.mode}>
                <MDEditor value={value} onChange={setValue} />
            </div>
        </Fragment>
    )
}


export default MDEditor_