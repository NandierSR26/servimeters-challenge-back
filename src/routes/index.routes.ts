import { Router } from 'express';
import { authRouter } from './auth.routes';

const router = Router();

router.use('/api/v1/auth', authRouter);

export default router;