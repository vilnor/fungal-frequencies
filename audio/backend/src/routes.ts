import { Router } from 'express';
import { postPos, postRot } from './fudi';
import { initialiseOscMappings, getSoundscape } from './sonification';

const router = Router();

router.get(
    '/api/health',
    (_req, res) => res.send('it work'),
);

router.post(
    '/api/pos',
    postPos,
);

router.post(
    '/api/rot',
    postRot,
);

router.get(
    '/api/soundscape',
    getSoundscape,
);

router.get(
    '/api/mappings',
    initialiseOscMappings,
);

export default router;