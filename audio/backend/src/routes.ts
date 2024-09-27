import { Router } from 'express';
import { postPos } from './fudi';

const router = Router();

router.post(
    '/api/pos',
    postPos,
);

export default router;