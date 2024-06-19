import { SensorData } from '../types';
import React, { useMemo } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Box, Grid } from '@mui/material';
import useData from '../api/useData';

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
        const sensorName = curr.sensor_name;
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


function ChartView() {
    const { data, isError, isLoading } = useData();
    const series = useMemo(() => !!data ? transformDataToHighcharts(data) : [], [data]);
    return (
        <Box sx={{ p: 5, height: '100%', overflow: 'auto' }}>
            {isLoading && (
                <p>Loading...</p>
            )}
            <Grid
                container
                rowSpacing={1}
                columnSpacing={1}
            >
                {!isLoading && !isError && (
                    Object.entries(series).map(([name, conf]) => (
                        <Grid xs={12} md={6} lg={4}>
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
                    ))
                )}
            </Grid>
        </Box>
    );
}

export default ChartView;
