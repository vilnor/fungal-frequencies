import { Request, Response } from 'express';
import pool from './database';
import { SensorDataBody, SensorId, SensorName } from "./types";

export async function getHealth(_req: Request, res: Response) {
    try {
        await pool.query('SELECT NOW()');
        res.send('it work');
    } catch (e) {
        res.send('fail lmao');
    }
}

export async function getData(req: Request, res: Response) {
    const { rows } = await pool.query(
        'SELECT * from sensor_data',
    );
    res.send(rows);
}

export async function getSensorData(req: Request, res: Response) {
    const { rows } = await pool.query(
        'SELECT * from sensor_data WHERE sensor_name = $1',
        [req.params.sensorName]
    );
    res.send(rows);
}

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
    if (!(Object.values(SensorName).includes(sensor_name ))) {
        res.status(400).send('invalid sensor_name');
        return;
    }

    await pool.query<any, any>(
        'INSERT INTO sensor_data (sensor_id, sensor_name, sensor_value, timestamp) VALUES ($1::integer, $2, $3::real, $4)',
        [sensor_id, sensor_name, sensor_value, timestamp] as const
    );

    res.send('ok');
}

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
            invalidSensorName = true
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
            row
        );
    })

    res.send('ok');
}