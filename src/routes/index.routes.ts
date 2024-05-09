import { Router } from 'express';
import { authRouter } from './auth.routes';
import { clasificationsRouter } from './clasifications.routes';
import { gendersRouter } from './genders.routes';
import { moviesRouter } from './movies.routes';
import { validateJWT } from '../middlewares/validateJWT';

const router = Router();

router.use('/api/v1/auth', authRouter);

router.use('/', validateJWT);
router.use('/api/v1/clasifications', clasificationsRouter);
router.use('/api/v1/genders', gendersRouter);
router.use('/api/v1/movies', moviesRouter);

export default router;