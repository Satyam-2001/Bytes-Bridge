import React, { useState } from 'react'
import { Box, Button, Paper, Stack, TextField, IconButton, useTheme, Typography } from '@mui/material'
import MDEditor from '../../../../components/MDEditor'
import RichTextEditor from '../../../../components/RichTextEditor'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import TagSelector from '../../../../utils/TagSelector';
import { useNavigate } from 'react-router';

const tagOptions = [
  { label: 'Python', value: 'Python' },
  { label: 'C++', value: 'C++' },
  { label: 'Java', value: 'Java' },
]

function CreateSoltuion(props) {

  const navigate = useNavigate()
  const [tags, setTags] = useState()

  const filterTags = (inputValue) => {
    return tagOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterTags(inputValue));
    }, 1000);
  }

  const closePostSolutionHandler = () => {
    navigate('../')
  }


  return (
    <Paper elevation={3} sx={{ height: 1, width: 1, zIndex: 1, position: 'absolute' }}>
      <Stack p={1} gap={2} height={1} width={1} boxSizing={'border-box'} >
        <Stack direction='row' width={1} gap={1} >
          <IconButton onClick={closePostSolutionHandler}>
            <ArrowBackIcon />
          </IconButton>
          <Stack sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }}>
            <TextField
              id="standard-basic"
              // label="Title"
              placeholder='Enter your title'
              variant="standard"
              InputProps={{ style: { fontSize: 18, letterSpacing: '2px' } }}
            />
          </Stack>
          <Button variant='contained' onClick={closePostSolutionHandler} sx={{ backgroundColor: 'rgba(150, 150 ,150, 0.5)' }}>
            Cancel
          </Button>
          <Button variant='contained'>
            Post
          </Button>
        </Stack>
        <Stack direction='row' gap={2} width={1} alignItems='center'>
          <Paper sx={{ px: 2, py: 1 }}>
            <Typography variant='h5' letterSpacing={'2px'}>
              Tags
            </Typography>
          </Paper>
          <Stack sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }}>
            <TagSelector
              value={tags}
              onChange={(tags) => setTags(tags)}
              loadOptions={loadOptions}
            />
          </Stack>
        </Stack>
        <Stack component={Paper} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }}>
          <MDEditor height='400px' />
          {/* <RichTextEditor /> */}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default CreateSoltuion