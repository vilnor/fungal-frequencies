import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import {
    AppBar,
    Autocomplete,
    Box,
    CssBaseline,
    IconButton,
    PaletteMode,
    TextField,
    ThemeProvider,
    Toolbar,
    Typography,
} from '@mui/material';
import { useTheme } from './theme';
import { Outlet, useNavigate } from 'react-router-dom';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MushroomIcon from './MushroomIcon';
import dayjs, { Dayjs } from 'dayjs';
import { PlayArrow, Stop } from '@mui/icons-material';
import useSoundscape from './api/useSoundscape';

const currentTime = new Date();

const TIME_OPTIONS = [
    { label: 'Live', value: 'live' },
    { label: 'Last hour', value: 'hour' },
    { label: 'Last day', value: 'day' },
    { label: 'Last week', value: 'week' },
    { label: 'All', value: 'all' },
    { label: 'Custom', value: 'custom' },
];

function App() {
    const [mode, setMode] = useState<PaletteMode>('light');
    const theme = useTheme(mode);
    const [timeRange, setTimeRange] = useState('day');
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);

    useEffect(() => {
        if (timeRange === 'hour') {
            setStartTime(dayjs(currentTime).subtract(1, 'hour'));
            setEndTime(null);
        } else if (timeRange === 'day') {
            setStartTime(dayjs(currentTime).subtract(1, 'day'));
            setEndTime(dayjs(currentTime));
        } else if (timeRange === 'week') {
            setStartTime(dayjs(currentTime).subtract(1, 'week'));
            setEndTime(dayjs(currentTime));
        } else if (timeRange === 'all') {
            setStartTime(dayjs(new Date(2020, 0, 1)));
            setEndTime(dayjs(currentTime));
        } else {
            setStartTime(null);
            setEndTime(null);
        }
    }, [timeRange]);

    const {
        startSoundscape,
        stopSoundscape,
    } = useSoundscape(startTime?.toISOString(), endTime?.toISOString(), timeRange === 'live');

    const onStartSoundscape = useCallback(async () => {
        await startSoundscape();
    }, [startSoundscape]);

    const onStopSoundscape = useCallback(async () => {
        await stopSoundscape();
    }, [stopSoundscape]);

    const navigate = useNavigate();
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar
                    position="absolute"
                    elevation={0}
                >
                    <Toolbar sx={{ gap: 1 }}>
                        <MushroomIcon
                            sx={{ mr: 1 }}
                            onClick={() => navigate('/')}
                        />
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ flexGrow: 1 }}
                            onClick={() => navigate('/')}
                        >Fungal Frequency Control</Typography>
                        {timeRange === 'custom' && (
                            <>
                                <DateTimePicker
                                    label="Start Time"
                                    value={startTime}
                                    onChange={setStartTime}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                        },
                                    }}
                                    sx={{
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white',
                                        },
                                        '.MuiFormLabel-root': {
                                            color: 'white',
                                        },
                                        '.MuiInputBase-input': {
                                            color: 'white',
                                        },
                                    }}
                                />
                                <DateTimePicker
                                    label="End Time"
                                    value={endTime}
                                    onChange={setEndTime}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                        },
                                    }}
                                    sx={{
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white',
                                        },
                                        '.MuiFormLabel-root': {
                                            color: 'white',
                                        },
                                        '.MuiInputBase-input': {
                                            color: 'white',
                                        },
                                    }}
                                />
                            </>
                        )}
                        <Autocomplete
                            value={TIME_OPTIONS.find(option => option.value === timeRange) ?? null}
                            onChange={(_, value) => setTimeRange(value?.value ?? 'day')}
                            options={TIME_OPTIONS}
                            sx={{
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '.MuiFormLabel-root': {
                                    color: 'white',
                                },
                                '.MuiInputBase-input': {
                                    color: 'white',
                                },
                                width: 300,
                            }}
                            size="small"
                            renderInput={
                                (params) => <TextField
                                    {...params}
                                    label="Time Range"
                                />
                            }
                        />
                        <IconButton onClick={onStartSoundscape}><PlayArrow sx={{ color: 'white' }}/></IconButton>
                        <IconButton onClick={onStopSoundscape}><Stop sx={{ color: 'white' }}/></IconButton>
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
