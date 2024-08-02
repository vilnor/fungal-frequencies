import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Autocomplete, Box, CircularProgress, Grid, TextField, Toolbar, Typography } from '@mui/material';
import useData from '../api/useData';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

const currentTime = new Date();

const TIME_OPTIONS = [
    {label: 'Last hour', value: 'hour'},
    {label: 'Last day', value: 'day'},
    {label: 'Last week', value: 'week'},
    {label: 'All', value: 'all'},
    {label: 'Custom', value: 'custom'},
];
type ChartSeries = {
    [k: string]: { name: string, data: any[], visible?: boolean }[]
}

function ChartView({isMonitoring = false}: { isMonitoring?: boolean }) {
    const [timeRange, setTimeRange] = useState('day');
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);
    const {
        data,
        isError,
        isLoading,
    } = useData<ChartSeries>(isMonitoring, undefined, startTime?.toISOString(), endTime?.toISOString(), 'highcharts');

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
                overflow: 'auto',
            }}>
                {isLoading && (
                    <CircularProgress size={75}/>
                )}
                {!isLoading && (isError || !data) && (
                    <Typography variant="h5" color="grey">
                        No data available
                    </Typography>
                )}
                {!isLoading && !isError && !!data && (
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={1}
                        height="100%"
                    >
                        {Object.entries(data).map(([name, conf]) => (
                            <Grid
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={{
                                        title: {
                                            text: name,
                                        },
                                        time: {
                                            useUTC: false,
                                        },
                                        chart: {
                                            zoomType: 'x',
                                        },
                                        xAxis: {
                                            type: 'datetime',
                                        },
                                        series: conf,
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </>
    );
}

export default ChartView;
