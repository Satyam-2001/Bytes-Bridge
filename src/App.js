import React from 'react';
import { Stack, Box } from "@mui/material";
import MainAppBar from './components/MainAppBar';
import { useTheme } from '@mui/material';
import { Outlet } from 'react-router'

import './index.css';

function App() {
  const theme = useTheme();

  return (
    <Stack height='100%'>
      <MainAppBar />
      <Box
        bgcolor={theme.palette.background.default}
        sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }}
        overflow='hidden'
      >
        <Box height='100%' overflow='auto'>
          <Outlet />
        </Box>
      </Box>
    </Stack>
  )
}

export default App