import React from 'react'
import { Box, Button, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import TextareaComment from '../../../utils/TextareaComment';

function Discussion() {
    const theme = useTheme();
    return (
        <Stack p={2} sx={{ height: '100%' }} overflow='auto' boxSizing={'border-box'} >
            <Stack direction='row' my={1} mx={1} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant='h4' letterSpacing={1} fontWeight={600} color={theme.palette.text.primary} >
                    Discussion
                </Typography>
            </Stack>
            <Divider />
            <Stack sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }}>
            </Stack>
            <TextareaComment />
        </Stack>
    )
}

export default Discussion