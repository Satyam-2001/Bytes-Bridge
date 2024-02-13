import React from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useTheme } from '@mui/material';

function MDPreview(props) {
    const theme = useTheme()
    return (
        <MarkdownPreview
            style={{ backgroundColor: 'transparent', color: props.color || theme.palette.text.primary, fontSize: '0.9rem' }}
            source={props.content}
            wrapperElement={{ "data-color-mode": props.mode || theme.palette.mode }}
        />
    )
}

export default MDPreview