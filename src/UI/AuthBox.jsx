import React, { useState } from 'react'
import { Stack, Box, Typography, Paper, Avatar } from '@mui/material'
import Button from "@mui/material/Button";
import logo from '../assets/logo.png'

function AuthBox({ title, onSubmit, children }) {
    return (
        <Box display={'flex'} justifyContent='center' alignItems='center' p={3} flex={1} boxSizing={'border-box'} >
            <Paper elevation={2} sx={{ width: '30rem', padding: '1rem' }} >
                <Stack gap={1} direction={'column'} alignItems={'center'} justifyContent='center' >
                    {/* <Avatar src={logo} variant="square" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Typography variant='h3' sx={{
                        // fontFamily: '',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                    }} >{title}</Typography>
                    <Stack component="form" gap={1} onSubmit={onSubmit} noValidate sx={{ mt: 1, width: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {children}
                        {/* {status === 'invalid' && <Typography color='error'>Invalid username or password</Typography>} */}
                        <Button
                            size='large'
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {title}
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    )
}

export default AuthBox