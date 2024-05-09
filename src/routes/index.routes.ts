import { Router } from 'express';
import { authRouter } from './auth.routes';
import { clasificationsRouter } from './clasifications.routes';
import { gendersRouter } from './genders.routes';

const router = Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/clasifications', clasificationsRouter);
router.use('/api/v1/genders', gendersRouter);

export default router;