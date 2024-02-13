import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { InputAdornment, Stack, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import logo from '../assets/logo.png';
import CustomAvatar from '../utils/CustomAvatar';
import { ColorModeContext, ColorModeProvider } from '../theme';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { AuthContext } from '../context/AuthProvider';

const drawerWidth = 280;
const navItems = ['Home', 'About', 'Contact'];

export default function MainAppBar() {
    const theme = useTheme();
    const { user } = React.useContext(AuthContext)
    const { mode, toggleMode } = React.useContext(ColorModeContext);
    const [searchBarOpen, setSearchBarOpen] = React.useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const container = window !== undefined ? () => window.document.body : undefined;

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Stack justifyContent='space-between' alignItems='center' >
                <Stack direction='row' height='3rem' gap={2} alignItems='center' maxWidth='auto' >
                    <img src={logo} style={{ height: '60%' }} />
                    <Typography variant="h5" sx={{ my: 2, letterSpacing: 1 }}>
                        Bytes Bridge
                    </Typography>
                </Stack>
            </Stack>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 0 }}>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <AppBar position="relative" sx={{ backgroundColor: theme.palette.background.paper }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center' height='3rem' px={2} >
                    <IconButton
                        size="medium"
                        edge="start"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon fontSize='large' />
                    </IconButton>
                    <Box sx={{ height: '80%', position: 'absolute', left: '50%', transform: 'translate(-50%,0%)' }}>
                        <img src={logo} style={{ height: '100%' }} />
                    </Box>
                    <Stack direction='row' gap='2'>
                        <IconButton
                            // size="medium"
                            sx={{ mx: 2 }}
                            onClick={toggleMode}
                        >
                            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                        <CustomAvatar name={user?.username}  src={user?.avatar} />
                    </Stack>
                </Stack>
            </AppBar>
        </Box>
    );
}