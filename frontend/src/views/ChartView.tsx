import {SensorData} from '../types';
import React, {useEffect, useMemo, useState} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import {Autocomplete, Box, Card, CircularProgress, Grid, TextField, Toolbar, Typography} from '@mui/material';
import useData from '../api/useData';
import {DateTimePicker} from '@mui/x-date-pickers';
import dayjs, {Dayjs} from 'dayjs';

const chartColourMap: { [k: string]: string } = {
    humidity: '#2095e3',
    temperature: '#a60016',
    conductivity: '#e3c500',
    phosphorus: '#30d933',
    nitrogen: '#969696',
    potassium: '#8f70ff',
    ph: '#000000',
    salinity: '#ff8400',
};

function transformDataToHighcharts(data: SensorData[]): {
    [k: string]: { name: string, data: any[], color?: string }[]
} {
    return data.reduce((acc: { [k: string]: { name: string, data: any[], color?: string }[] }, curr) => {
        const sensorName = `${curr.sensor_name}${!!curr.units ? (' (' + curr.units + ')') : ''}`;
        const sensorId = curr.sensor_id;
        const sensorKey = `sensor-${sensorId}`;

        if (!acc[sensorName]) {
            acc[sensorName] = [];
        }

        const sensorIndex = acc[sensorName].findIndex(item => item.name === sensorKey);

        if (sensorIndex === -1) {
            acc[sensorName].push({
                name: sensorKey,
                data: [[new Date(curr.timestamp).getTime(), curr.sensor_value]],
                // color: chartColourMap[sensorName],
            });
        } else {
            acc[sensorName][sensorIndex].data.push([new Date(curr.timestamp).getTime(), curr.sensor_value]);
        }

        return acc;
    }, {});
}

const currentTime = new Date();

const TIME_OPTIONS = [
    {label: 'Last hour', value: 'hour'},
    {label: 'Last day', value: 'day'},
    {label: 'Last week', value: 'week'},
    {label: 'All', value: 'all'},
    {label: 'Custom', value: 'custom'},
];


function ChartView({isMonitoring = false}: { isMonitoring?: boolean }) {
    const [timeRange, setTimeRange] = useState('day');
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);
    const {
        data,
        isError,
        isLoading
    } = useData(isMonitoring, undefined, startTime?.toISOString(), endTime?.toISOString());
    const series = useMemo(() => !!data ? transformDataToHighcharts(data) : [], [data]);

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
                    <CircularProgress size={75} />
                )}
                {!isLoading && (isError || !data || !data.length) && (
                    <Typography variant="h5" color="grey">
                        No data available
                    </Typography>
                )}
                {!isLoading && !isError && !!data && !!data.length && (
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={1}
                        height="100%"
                    >
                        {Object.entries(series).map(([name, conf]) => (
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
