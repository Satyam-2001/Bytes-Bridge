import React, { useRef, useState } from 'react';
import { CssBaseline, ThemeProvider, Stack, Box, Button } from "@mui/material";

import './index.css';
import logo from './logo.svg';
import CodeBlock from './components/CodeBlock';

import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { useInitData } from '@vkruglikov/react-telegram-web-app';
import { useSearchParams } from "react-router-dom";
import { decode } from 'data-compression';
import { useMode } from "./theme";



const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <ModeEditIcon />, name: 'Theme' },
  { icon: <ShareIcon />, name: 'Share' },
];

const App = () => {
  const { theme, themeParams } = useMode();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get("tgWebAppStartParam")

  const [initDataUnsafe] = useInitData();
  console.log(initDataUnsafe)
  // const code = decode(param)
  const data = {
    title: param || 'No Param',
    language: 'Javascript',
    code: (initDataUnsafe ? JSON.stringify(initDataUnsafe) : 'No InitData') + '\n' + (themeParams ? JSON.stringify(themeParams) : 'No Theme Params'),
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        px={{ xs: 3, sm: 8, md: 15, lg: 22 }}
        py={2}
        bgcolor={theme.palette?.background?.default}
        height='100vh'
        minHeight='100vh'
        overflow='auto'
        boxSizing={'border-box'}
      // position='relative'
      >
        <CodeBlock data={data} />
        {/* <MainButton text="COPY" onClick={() => { }} /> */}
      </Box>
    </ThemeProvider>

  );
};

export default App