import { Pool } from 'pg';

// connection settings are handled by env variables
const pool = new Pool();

pool.query('CREATE TABLE IF NOT EXISTS sensor_data (\n' +
    '    sensor text not null,\n' +
    '    "timestamp" timestamp not null,\n' +
    '    value decimal, \n' +
    '    primary key (sensor, "timestamp")\n' +
    ');');

export default pool;