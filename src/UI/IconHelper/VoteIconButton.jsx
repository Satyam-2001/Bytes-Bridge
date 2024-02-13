import React from 'react'
import { Button, Stack, Typography, useTheme } from '@mui/material'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import CustomIcon from './CustomIcon';
import FormatValue from './FoematValue';

function VoteIconButton({ value }) {
    const theme = useTheme()
    return (
        <Stack direction='row' gap={'1px'}>
            <Button variant='text' color={'primary'} sx={{ borderRadius: '10px 0px 0px 10px', backgroundColor: 'rgba(150, 150, 150, 0.1)', padding: '6px 6px' }}>
                <Stack direction='row' gap={1} alignItems='center'>
                    <CustomIcon Icon={ThumbUpAltOutlinedIcon} />
                    <FormatValue value={value} />
                </Stack>
            </Button>
            <Button variant='text' sx={{ borderRadius: '0px 10px 10px 0px', width: '30px', minWidth: '30px', maxWidth: '30px', backgroundColor: 'rgba(150, 150, 150, 0.1)', padding: '6px 6px' }}>
                <CustomIcon Icon={ThumbDownAltOutlinedIcon} />
            </Button>
        </Stack>)
}

export default VoteIconButton