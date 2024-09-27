import { Router } from 'express';
import { postPos } from './fudi';
import { postSoundscape } from './osc';

const router = Router();

router.post(
    '/api/pos',
    postPos,
);

router.post(
    'api/soundscape',
    postSoundscape
)

export default router;