import React, { Fragment, useState } from 'react'
import { AppBar, Box, Button, FormControl, InputAdornment, InputLabel, makeStyles, MenuItem, Pagination, Paper, Select, Stack, TextField, useTheme } from '@mui/material'
import SearchBar from '../../../utils/SearchBar'
import SolutionCard from './SolutionCard'
import SortIcon from '@mui/icons-material/Sort';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import FloatingActionButton from '../../../UI/FloatingActionButton';
import { Outlet, useNavigate } from 'react-router';
import { useSearchParams } from "react-router-dom";

function CreateSolutionFloatingButton(props) {
    return (
        <FloatingActionButton label='Write Your Solution' onClick={props.onClick}>
            <ModeEditIcon />
        </FloatingActionButton>
    )
}

function Solutions() {
    const theme = useTheme()
    const naviagte = useNavigate()
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const createSolutionHandler = () => {
        naviagte('./post')
    }

    const pageChangeHandler = (event, value) => {
        setSearchParams((prev) => { return { ...prev, page: value } })
    }

    const page = searchParams.has('page') ? parseInt(searchParams.get('page')) : 1

    const dummyData = [
        { id: 1, username: 'satyam2001', avatar: 'https://assets.leetcode.com/users/avatars/avatar_1670096509.png', title: 'Optimized Simple Solution', votes: 121, views: 1020 },
        { id: 2, username: 'shabby', avatar: '', title: "✅3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥", votes: 120, views: 820 },
        { id: 3, username: 'lee215', avatar: '', title: 'Begineers Soluton O(n^2)', votes: 324, views: 1324 },
        { id: 4, username: '2001', avatar: 'https://assets.leetcode.com/users/avatars/avatar_1670096509.png', title: 'Optimized Simple Solution', votes: 121, views: 1000 },
        { id: 5, username: 'shabby', avatar: '', title: "✅3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥", votes: 120, views: 820 },
        { id: 6, username: 'lee215', avatar: '', title: 'Begineers Soluton O(n^2)', votes: 324, views: 1324 },
        { id: 7, username: 'satyam2001', avatar: 'https://assets.leetcode.com/users/avatars/avatar_1670096509.png', title: 'Optimized Simple Solution', votes: 121, views: 1000 },
        { id: 8, username: 'shabby', avatar: '', title: "✅3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥", votes: 120, views: 820 },
        { id: 9, username: 'lee215', avatar: '', title: 'Begineers Soluton O(n^2)', votes: 320014, views: 1324 },
    ]

    return (
        <Box height='100%' boxSizing='border-box' position='relative' >
            <Stack height='100%' width={1} boxSizing='border-box' alignItems={'center'} sx={{ zIndex: 0, position: 'absolute' }}>
                <AppBar position="sticky" sx={{ borderRadius: '5px 5px 0px 0px', backgroundColor: theme.palette.background.paper, height: '48px', p: 1 }} >
                    <Stack height='100%' direction='row' justifyContent='center' alignItems='center'>
                        <SearchBar value={value} setValue={setValue} placeholder='Search...' />
                        {/* <Button startIcon={<SortIcon />} variant='none'>Votes</Button> */}
                        <TextField
                            id="standard-select-currency"
                            select
                            // label="Sort By"
                            size='small'
                            value={'Votes'}
                            // onChange={}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SortIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{p: 0}}
                        >
                            <MenuItem value={'Votes'}>Votes</MenuItem>
                            <MenuItem value={'Recent'}>Recent</MenuItem>
                            <MenuItem value={'Trending'}>Trending</MenuItem>
                        </TextField>
                    </Stack>
                </AppBar>
                <Stack height='100%' width='100%' boxSizing={'border-box'} overflow='auto' pt={1} >
                    {dummyData.map((data) => {
                        return <SolutionCard key={data.id} data={data} />
                    })}
                    <Stack py={2} alignItems={'center'}>
                        <Pagination count={70} page={page} onChange={pageChangeHandler} variant="outlined" shape="rounded" />
                    </Stack>
                </Stack>
                <CreateSolutionFloatingButton onClick={createSolutionHandler} />
            </Stack >
            <Outlet />
        </Box>
    )
}

export default Solutions