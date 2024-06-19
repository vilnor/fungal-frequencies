import React, { useState } from 'react';
import './App.css';
import { AppBar, Box, Button, CssBaseline, PaletteMode, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { useTheme } from './theme';
import { Outlet, useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MushroomIcon from './MushroomIcon';

function App() {
    const [mode, setMode] = useState<PaletteMode>('light');
    const theme = useTheme(mode);

    const navigate = useNavigate();
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar
                    position="absolute"
                    elevation={0}
                >
                    <Toolbar>
                        <MushroomIcon sx={{ mr: 1 }}/>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >Biome Data</Typography>
                        <Button
                            color="inherit"
                            onClick={() => navigate('/')}
                        >Chart View</Button>
                        <Button
                            color="inherit"
                            onClick={() => navigate('/table')}
                        >Table View</Button>
                    </Toolbar>
                </AppBar>
                <Box
                    component="main"
                    sx={{
                        bgcolor: 'background.default',
                        height: '100vh',
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Toolbar/>
                    <Outlet/>
                </Box>
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;
