import { Request, Response } from 'express';
import pool from './database';
import { SensorDataBody, SensorDataQueryParams, SensorId, SensorName } from './types';

export async function getHealth(_req: Request, res: Response) {
    try {
        await pool.query('SELECT NOW()');
        res.send('it work');
    } catch (e) {
        res.send('fail lmao');
    }
}

const SENSOR_UNITS = {
    humidity: '%',
    temperature: '°C',
    conductivity: 'us/cm',
    ph: 'level',
    nitrogen: 'mg/kg',
    phosphorus: 'mg/kg',
    potassium: 'mg/kg',
    salinity: 'mg/L',
    tds: 'mg/L',
    voltage: 'mg',
    default: '',
};

// This function transforms the sensor data into a format that can be used by Highcharts to minimize computation on the frontend.
function transformDataToHighcharts(data: SensorDataBody[]): {
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
            });
        } else {
            acc[sensorName][sensorIndex].data.push([new Date(curr.timestamp).getTime(), curr.sensor_value]);
        }

        return acc;
    }, {});
}

// This function is a GET request handler that retrieves sensor data from the database.
export async function getData(req: Request<any, any, any, SensorDataQueryParams>, res: Response) {
    const { startTime, endTime, format } = req.query;

    const date = new Date();
    date.setDate(date.getDate() - 1);

    const values = [!!startTime ? new Date(startTime) : date];

    let whereClause = 'WHERE timestamp >= $1';
    if (endTime) {
        whereClause += ' AND timestamp <= $2';
        values.push(new Date(endTime));
    }

    const { rows } = await pool.query<SensorDataBody>(
        `SELECT *
         from sensor_data ${whereClause}
         ORDER BY timestamp, sensor_id, sensor_name`,
        values,
    );

    const rowsWithUnits = rows.map((row) => ({
        ...row,
        units: SENSOR_UNITS[row.sensor_name || 'default'],
    }));

    if (format === 'highcharts') {
        res.send(transformDataToHighcharts(rowsWithUnits));
        return;
    }

    res.send(rowsWithUnits);
}


// This function is a GET request handler that retrieves monitoring data from the database.
export async function getMonitoringData(req: Request<any, any, any, SensorDataQueryParams>, res: Response) {
    const { startTime, endTime, format } = req.query;

    const date = new Date();
    date.setDate(date.getDate() - 1);

    const values = [!!startTime ? new Date(startTime) : date];

    let whereClause = 'WHERE timestamp >= $1';
    if (endTime) {
        whereClause += ' AND timestamp <= $2';
        values.push(new Date(endTime));
    }

    const { rows } = await pool.query<SensorDataBody>(
        `SELECT *
         from monitoring_data ${whereClause}
         ORDER BY timestamp, sensor_id, sensor_name`,
        values,
    );
    const rowsWithUnits = rows.map((row) => ({
        ...row,
        units: SENSOR_UNITS[row.sensor_name || 'default'],
    }));

    if (format === 'highcharts') {
        res.send(transformDataToHighcharts(rowsWithUnits));
        return;
    }

    res.send(rows);
}

// This function is a GET request handler that retrieves sensor data from the database.
export async function getSensorData(req: Request, res: Response) {
    const { rows } = await pool.query(
        'SELECT * from sensor_data WHERE sensor_name = $1',
        [req.params.sensorName],
    );
    res.send(rows);
}

// This function is a POST request handler that saves sensor data to the database.
export async function saveSensorData(req: Request<any, any, SensorDataBody>, res: Response) {
    const {
        sensor_id,
        sensor_name,
        sensor_value,
        timestamp,
    } = req.body;

    if (!sensor_id || !sensor_name || !sensor_value || !timestamp) {
        res.status(400).send('missing required fields');
        return;
    }

    if (!(sensor_id in SensorId)) {
        res.status(400).send('invalid sensor_id');
        return;
    }

    // @ts-ignore
    if (!(Object.values(SensorName).includes(sensor_name))) {
        res.status(400).send('invalid sensor_name');
        return;
    }

    await pool.query<any, any>(
        'INSERT INTO sensor_data (sensor_id, sensor_name, sensor_value, timestamp) VALUES ($1::integer, $2, $3::real, $4)',
        [sensor_id, sensor_name, sensor_value, timestamp] as const,
    );

    res.send('ok');
}

// This function is a POST request handler that saves multiple rows of sensor data to the database.
export async function saveSensorDataMulti(req: Request<any, any, SensorDataBody[]>, res: Response) {
    const data = req.body;

    if (!data.length) {
        res.status(400).send('missing required fields');
        return;
    }

    let missingFields = false;
    let invalidSensorId = false;
    let invalidSensorName = false;

    const values = data.map(({ sensor_id, sensor_name, sensor_value, timestamp }) => {
        if (sensor_id === undefined || sensor_name === undefined || sensor_value === undefined || timestamp === undefined) {
            missingFields = true;
            return;
        }

        if (!(sensor_id in SensorId)) {
            invalidSensorId = true;
            return;
        }

        // @ts-ignore
        if (!(Object.values(SensorName).includes(sensor_name))) {
            invalidSensorName = true;
            return;
        }

        return [sensor_id, sensor_name, sensor_value, timestamp] as const;
    });

    if (missingFields) {
        res.status(400).send('missing required fields');
        return;
    }

    if (invalidSensorId) {
        res.status(400).send('invalid sensor id');
        return;
    }

    if (invalidSensorName) {
        res.status(400).send('invalid sensor name');
        return;
    }

    values.forEach((row) => {
        if (!row) return;
        pool.query<any, any>(
            'INSERT INTO sensor_data (sensor_id, sensor_name, sensor_value, timestamp) VALUES ($1::integer, $2, $3::real, $4)',
            row,
        );
    });

    res.send('ok');
}

// This function is a POST request handler that saves monitoring data to the database.
export async function saveMonitoringDataMulti(req: Request<any, any, SensorDataBody[]>, res: Response) {
    const data = req.body;

    if (!data.length) {
        res.status(400).send('missing required fields');
        return;
    }

    let missingFields = false;
    let invalidSensorId = false;
    let invalidSensorName = false;

    const values = data.map(({ sensor_id, sensor_name, sensor_value, timestamp }) => {
        if (sensor_id === undefined || sensor_name === undefined || sensor_value === undefined || timestamp === undefined) {
            missingFields = true;
            return;
        }

        return [sensor_id, sensor_name, sensor_value, timestamp] as const;
    });

    if (missingFields) {
        res.status(400).send('missing required fields');
        return;
    }

    if (invalidSensorId) {
        res.status(400).send('invalid sensor id');
        return;
    }

    if (invalidSensorName) {
        res.status(400).send('invalid sensor name');
        return;
    }

    values.forEach((row) => {
        if (!row) return;
        pool.query<any, any>(
            'INSERT INTO monitoring_data (sensor_id, sensor_name, sensor_value, timestamp) VALUES ($1::integer, $2, $3::real, $4)',
            row,
        );
    });

    res.send('ok');
}
