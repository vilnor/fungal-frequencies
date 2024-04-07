import { Request, Response } from 'express';
import pool from './database';

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
        'SELECT * from sensor_data WHERE sensor = $1',
        [req.params.sensorId]
    );
    res.send(rows);
}

export async function saveSensorData(req: Request, res: Response) {
    res.send('ok');
}
