import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActionArea, CardActions, Divider, Stack, Box } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import CustomAvatar from '../../../../utils/CustomAvatar';
import IconView from '../../../../UI/IconHelper/IconView';
import { useNavigate } from 'react-router';


function SolutionCard({ data }) {
    const navigate = useNavigate()
    const { avatar, title, votes, views, username, id } = data

    const openSolutionHandler = () => {
        navigate(`./${id}`)
    }

    return (
        <Stack direction='row' alignItems='center' >
            <CardActionArea onClick={openSolutionHandler} >
                <Stack direction='row' alignItems='center' gap={1} pl={2}>
                    <CustomAvatar name={username} src={avatar} />
                    <CardContent sx={{ py: 1, flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }} >
                        <Typography variant="body2" color="text.secondary" >
                            {username}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" letterSpacing={1} >
                            {title}
                        </Typography>
                        <Stack direction='row' gap={2} pb={1}>
                            <IconView value={votes} Icon={ThumbUpAltOutlinedIcon} />
                            <IconView value={views} Icon={VisibilityOutlinedIcon} />
                            <IconView value={0} Icon={ModeCommentOutlinedIcon} />
                        </Stack>
                        <Divider />
                    </CardContent>
                </Stack>
            </CardActionArea>
        </Stack>
    )
}

export default SolutionCard;