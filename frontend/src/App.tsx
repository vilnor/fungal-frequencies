import React, { HTMLAttributes, useState } from 'react';
import './App.css';
import useData from './api/useData';
import { AppBar, Box, CssBaseline, PaletteMode, Tab, Tabs, ThemeProvider, Toolbar, Typography } from '@mui/material';
import TableView from './views/TableView';
import ChartView from './views/ChartView';
import { useTheme } from './theme';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps & HTMLAttributes<HTMLDivElement>) {
    const { children, value, index, ...other } = props;

    return (
        <div
            {...other}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}


function App() {
    const { data, isLoading, isError } = useData();
    const [tabValue, setTabValue] = useState(0);
    const [mode, setMode] = useState<PaletteMode>('light');
    const theme = useTheme(mode);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="absolute">
                <Toolbar>
                    <Typography variant="h5">Biome Data</Typography>
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
                <Tabs
                    value={tabValue}
                    onChange={(e, nV) => setTabValue(nV)}
                >
                    <Tab label="Chart View"/>
                    <Tab label="Table View"/>
                </Tabs>
                <CustomTabPanel
                    value={tabValue}
                    index={0}
                    style={{ overflow: 'auto' }}
                >
                    <ChartView
                        data={data}
                        isError={isError}
                        isLoading={isLoading}
                    />
                </CustomTabPanel>
                <CustomTabPanel
                    value={tabValue}
                    index={1}
                    style={{ overflow: 'auto' }}
                >
                    <TableView
                        data={data}
                        isError={isError}
                        isLoading={isLoading}
                    />
                </CustomTabPanel>
            </Box>
        </ThemeProvider>
    );
}

export default App;
