import React, { useState } from 'react'
import { Box, Button, Paper, Stack, TextField, IconButton, useTheme, Typography } from '@mui/material'
import MDEditor from '../../../../components/MDEditor'
import RichTextEditor from '../../../../components/RichTextEditor'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import TagSelector from '../../../../utils/TagSelector';
import { useNavigate } from 'react-router';


function Soltuion(props) {

    const navigate = useNavigate()

    const closePostSolutionHandler = () => {
        navigate('../')
    }


    return (
        <Paper elevation={3} sx={{ height: 1, width: 1, zIndex: 1, position: 'absolute' }}>
            <Stack p={1} gap={2} height={1} width={1} boxSizing={'border-box'} >
                <Stack direction='row' width={1} gap={1} alignItems='center' >
                    <IconButton onClick={closePostSolutionHandler}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Stack sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }}>
                        <Typography variant='h4' sx={{ letterSpacing: '2px' }}>Optimized Simple Solution</Typography>
                    </Stack>
                </Stack>
                <Stack direction='row' gap={2} width={1} alignItems='center'>
                </Stack>
                <Stack component={Paper} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }}>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default Soltuion