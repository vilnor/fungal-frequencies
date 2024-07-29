import { Router } from 'express';
import {
    getData,
    getHealth,
    getMonitoringData,
    getSensorData,
    saveSensorData,
    saveSensorDataMulti,
    saveMonitoringDataMulti,
} from './controllers';

const router = Router();

router.get(
    '/api/health',
    getHealth,
);

router.get(
    '/api/data',
    getData,
);

router.get(
    '/api/monitoring_data',
    getMonitoringData
);

router.get(
    '/api/data/:sensorName',
    getSensorData,
);

router.post(
    '/api/data/single',
    saveSensorData,
);

router.post(
    '/api/data',
    saveSensorDataMulti,
);

router.post(
    '/api/monitoring_data',
    saveMonitoringDataMulti,
);

export default router;
