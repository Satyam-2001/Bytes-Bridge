import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { useTheme } from '@mui/material';

const RichTextEditor = ({ placeholder }) => {
    const theme = useTheme();
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = useMemo(() => {
        return {
            theme: theme.palette.mode,
            style: {
                background: theme.palette.background.default,
                minHeight: '100%',
                height: '100%',
            }
        }
    },
        [theme]
    );

    console.log(content)

    return (
        // <JoditEditor
        //     ref={editor}
        //     value={content}
        //     config={config}
        //     tabIndex={1} // tabIndex of textarea
        //     onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        //     onChange={newContent => { }}
        // />
        <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onChange={(newContent) => setContent(newContent)}
        />

    );
};

export default RichTextEditor;