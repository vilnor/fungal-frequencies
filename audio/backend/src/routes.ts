import { Router } from 'express';
import { postPos } from './fudi';
import { getSoundscape } from './sonification';

const router = Router();

router.get(
    '/api/health',
    (_req, res) => res.send('it work'),
);

router.post(
    '/api/pos',
    postPos,
);

router.get(
    '/api/soundscape',
    getSoundscape
)

export default router;