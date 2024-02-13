import React from 'react'
import { Fab, Tooltip, Typography } from '@mui/material';
import Zoom from '@mui/material/Zoom';

function FloatingActionButton({ onClick, label, children }) {
    return (
        <Zoom
            in={true}
            timeout={200}
            style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                transitionDelay: `200ms`,
            }}
            unmountOnExit
        >
            <Tooltip title={<Typography sx={{ color: '#fff' }} variant='h5'>{label}</Typography>} placement="left" arrow >
                <Fab onClick={onClick} color="primary" aria-label="add">
                    {children}
                </Fab>
            </Tooltip>
        </Zoom>
    )
}

export default FloatingActionButton