import { DataView, SensorData } from '../types';
import React, { useMemo } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Grid } from '@mui/material';

const chartColourMap: {[k: string]: string} = {
	humidity: '#2095e3',
	temperature: '#a60016',
	conductivity: '#e3c500',
	phosphorus: '#30d933',
	nitrogen: '#969696',
	potassium: '#8f70ff',
	ph: '#000000',
	salinity: '#ff8400'
};

function transformDataToHighcharts(data: SensorData[]): { name: string, data: any[], color: string }[] {
    return data.reduce((acc: { name: string, data: any[], color: string }[], curr) => {
        const index = acc.findIndex(item => item.name === curr.sensor_name);
        if (index === -1) {
            acc.push({
                name: curr.sensor_name,
                data: [[new Date(curr.timestamp).getTime(), curr.sensor_value]],
		color: chartColourMap[curr.sensor_name],
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
