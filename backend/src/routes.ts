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
    '/api/data/:sensorName',
    getSensorData,
);

router.post(
    '/api/data',
    saveSensorData,
);

export default router;