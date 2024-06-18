import { Router } from 'express';
import {
    getData,
    getHealth,
    getSensorData,
    saveSensorData,
    saveSensorDataMulti
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
)

export default router;