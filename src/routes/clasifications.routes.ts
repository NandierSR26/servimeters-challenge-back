import { Router } from 'express';
import { ClasificationsController } from '../controllers/clasifications.controller';
import { validateEmployeRol } from '../middlewares/validateRol';

export const clasificationsRouter = Router();

const clasificationsController = new ClasificationsController();

clasificationsRouter.get('/', clasificationsController.getAll);
clasificationsRouter.get('/:id', clasificationsController.getByID);
clasificationsRouter.post('/create', [ validateEmployeRol ], clasificationsController.create);
clasificationsRouter.delete('/delete/:id', [ validateEmployeRol ], clasificationsController.delete);