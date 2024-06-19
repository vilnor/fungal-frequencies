import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { SensorData } from '../types';
import React from 'react';
import useData from '../api/useData';
import { Box } from '@mui/material';

const columnDefinition: GridColDef<SensorData>[] = [
    { field: 'timestamp', headerName: 'Time', flex: 1, type: 'dateTime', valueGetter: (v) => new Date(v) },
    { field: 'sensor_name', headerName: 'Sensor', flex: 1, type: 'string' },
    { field: 'sensor_id', headerName: 'Sensor ID', flex: 1, type: 'number' },
    { field: 'sensor_value', headerName: 'Value', flex: 1, type: 'number' },
];

function TableView() {
    const { data, isError, isLoading } = useData();
    return (
        <Box sx={{ p: 5, height: '100%', overflow: 'auto' }}>
            {isLoading && (
                <p>Loading...</p>
            )}
            {!isLoading && !isError && (
                <DataGrid
                    columns={columnDefinition}
                    rows={data}
                    getRowId={(r) => r.sensor_name + r.timestamp + `${r.sensor_id}`}
                    slots={{ toolbar: GridToolbar }}
                />
            )}
        </Box>
    );
}

export default TableView;