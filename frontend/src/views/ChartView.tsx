import { DataView } from '../types';
import React from 'react';

function ChartView({data, isError, isLoading}: DataView) {
    return <div>
        Chart View

        {isLoading && (
            <p>Loading...</p>
        )}
        {!isLoading && !isError && (
            data?.map((d) => (
                <>
                    <p>{d.sensor_name} | {d.sensor_value}</p>
                </>
            ))
        )}
    </div>;
}

export default ChartView;