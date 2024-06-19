import React, { useState } from 'react';
import './App.css';
import { AppBar, Box, Button, CssBaseline, PaletteMode, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { useTheme } from './theme';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {
    const [mode, setMode] = useState<PaletteMode>('light');
    const theme = useTheme(mode);

    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar
                position="absolute"
                elevation={0}
            >
                <Toolbar>
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
    );
}

export default App;
