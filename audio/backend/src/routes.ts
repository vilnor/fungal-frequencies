import { Router } from 'express';
import { postPos } from './fudi';
import { postSoundscape } from './sonification';

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
    postSoundscape
)

export default router;