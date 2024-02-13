import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MDPreview from '../../../components/MDPreview';
// import IconView from '../../../UI/IconHelper/IconView';
// import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import VoteIconButton from '../../../UI/IconHelper/VoteIconButton';


function Description({ problem }) {
    const { title, content, subject, votes } = problem;

    const [saveIcon, setSaveIcon] = useState(false);
    const theme = useTheme();

    const toggleSaveButton = () => {
        setSaveIcon(prop => !prop);
    }

    return (
        <Box p={2} sx={{ height: '100%' }} overflow='auto' boxSizing={'border-box'} >
            <Stack direction='row' mt={1} mx={1} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant='h4' letterSpacing={1} fontWeight={600} color={theme.palette.text.primary} >
                    {title}
                </Typography>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    id="basic-button-save"
                    sx={{ m: 0, p: 1 }}
                    onClick={toggleSaveButton}
                >
                    {saveIcon ? <BookmarkIcon color={'primary'} /> : <BookmarkBorderIcon />}
                </IconButton>
            </Stack>
            <Stack direction='row' my={1} mx={1} gap={2} alignItems={'center'}  >
                <Typography variant='body2' letterSpacing={1} color={theme.palette.primary.main} >
                    {subject}
                </Typography>
                <VoteIconButton value={votes} />
                {/* <IconView value={votes} Icon={ThumbUpAltOutlinedIcon} /> */}
            </Stack>
            <Divider />
            <Box px={1} pb={1} pt={2}>
                <MDPreview content={content} />
            </Box>
        </Box>
    )
}

export default Description;