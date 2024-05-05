import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { DataView, SensorData } from '../types';
import React from 'react';

const columnDefinition: GridColDef<SensorData>[] = [
    {field: 'timestamp', headerName: 'Time', flex: 1, type: 'dateTime', valueGetter: (v) => new Date(v)},
    {field: 'sensor_name', headerName: 'Sensor', flex: 1, type: 'string'},
    {field: 'sensor_value', headerName: 'Value', flex: 1, type: 'number'},
];

function TableView({data, isError, isLoading}: DataView) {
    return <div>
        {isLoading && (
            <p>Loading...</p>
        )}
        {!isLoading && !isError && (
            <DataGrid
                columns={columnDefinition}
                rows={data}
                getRowId={(r) => r.sensor_name + r.timestamp}
                slots={{toolbar: GridToolbar}}
            />
        )}
    </div>;
}

export default TableView;