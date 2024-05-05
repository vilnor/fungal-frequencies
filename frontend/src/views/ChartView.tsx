import { DataView, SensorData } from '../types';
import React, { useMemo } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Grid } from '@mui/material';

function transformDataToHighcharts(data: SensorData[]): { name: string, data: any[] }[] {
    return data.reduce((acc: { name: string, data: any[] }[], curr) => {
        const index = acc.findIndex(item => item.name === curr.sensor_name);
        if (index === -1) {
            acc.push({
                name: curr.sensor_name,
                data: [[new Date(curr.timestamp).getTime(), curr.sensor_value]],
            });
        } else {
            acc[index].data.push([new Date(curr.timestamp).getTime(), curr.sensor_value]);
        }
        return acc;
    }, []);

}

function ChartView({data, isError, isLoading}: DataView) {
    const series = useMemo(() => !!data ? transformDataToHighcharts(data) : [], [data]);
    return <div>
        {isLoading && (
            <p>Loading...</p>
        )}
        <Grid container rowSpacing={1} columnSpacing={1}>
        {!isLoading && !isError && (
            series.map((conf) => (
                <Grid xs={4}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            title: {
                                text: conf.name
                            },
                            time: {
                                useUTC: false,
                            },
                            chart: {
                                zoomType: 'x',
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            series: [conf]
                        }}
                    />
                </Grid>
            ))
        )}
        </Grid>
    </div>;
}

export default ChartView;