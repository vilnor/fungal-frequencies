import { Router } from 'express';
import { getData, getHealth, getSensorData, saveSensorData } from './controllers';

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
    '/api/data/:sensorId',
    getSensorData,
);

router.post(
    '/api/data/:sensorId/emails',
    saveSensorData,
);

export default router;