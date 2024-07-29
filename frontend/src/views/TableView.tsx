import {DataGrid, GridColDef, GridToolbar} from '@mui/x-data-grid';
import {SensorData} from '../types';
import React, {useEffect, useState} from 'react';
import useData from '../api/useData';
import {Autocomplete, Box, CircularProgress, TextField, Toolbar, Typography} from '@mui/material';
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";

const columnDefinition: GridColDef<SensorData>[] = [
    {field: 'timestamp', headerName: 'Time', flex: 1, type: 'dateTime', valueGetter: (v) => new Date(v)},
    {field: 'sensor_name', headerName: 'Sensor', flex: 1, type: 'string'},
    {field: 'sensor_id', headerName: 'Sensor ID', flex: 1, type: 'number'},
    {field: 'sensor_value', headerName: 'Value', flex: 1, type: 'number'},
    {field: 'units', headerName: 'Units', flex: 1, type: 'string'},
];

const currentTime = new Date();
const TIME_OPTIONS = [
    {label: 'Last hour', value: 'hour'},
    {label: 'Last day', value: 'day'},
    {label: 'Last week', value: 'week'},
    {label: 'All', value: 'all'},
    {label: 'Custom', value: 'custom'},
];

function TableView({isMonitoring = false}: { isMonitoring?: boolean }) {
    // const { data, isError, isLoading } = useData();
    const [timeRange, setTimeRange] = useState('day');
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);
    const {
        data,
        isError,
        isLoading
    } = useData(isMonitoring, undefined, startTime?.toISOString(), endTime?.toISOString());

    useEffect(() => {
        if (timeRange === 'hour') {
            setStartTime(dayjs(currentTime).subtract(1, 'hour'));
            setEndTime(null);
        } else if (timeRange === 'day') {
            setStartTime(dayjs(currentTime).subtract(1, 'day'));
            setEndTime(null);
        } else if (timeRange === 'week') {
            setStartTime(dayjs(currentTime).subtract(1, 'week'));
            setEndTime(null);
        } else if (timeRange === 'all') {
            setStartTime(dayjs(new Date(2020, 0, 1)));
            setEndTime(null);
        } else {
            setStartTime(null);
            setEndTime(null);
        }
    }, [timeRange]);
    return (
        <>
            <Toolbar sx={{justifyContent: 'flex-end', gap: 1, p: 3}}>
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
                        />
                    </>
                )}
                <Autocomplete
                    value={TIME_OPTIONS.find(option => option.value === timeRange) ?? null}
                    onChange={(_, value) => setTimeRange(value?.value ?? 'day')}
                    options={TIME_OPTIONS}
                    sx={{width: 300}}
                    size="small"
                    renderInput={
                        (params) => <TextField
                            {...params}
                            label="Time Range"
                        />
                    }
                />
            </Toolbar>
            <Box sx={{
                p: 5,
                pt: 0,
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'auto'
            }}>
                {isLoading && (
                    <CircularProgress size={75}/>
                )}
                {!isLoading && (isError || !data || !data.length) && (
                    <Typography variant="h5" color="grey">
                        No data available
                    </Typography>
                )}
                {!isLoading && !isError && !!data && !!data.length && (
                    <DataGrid
                        columns={columnDefinition}
                        rows={data}
                        getRowId={(r) => r.sensor_name + r.timestamp + `${r.sensor_id}`}
                        slots={{toolbar: GridToolbar}}
                    />
                )}
            </Box>
        </>
    );
}

export default TableView;