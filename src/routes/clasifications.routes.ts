import { Router } from 'express';
import { ClasificationsController } from '../controllers/clasifications.controller';

export const clasificationsRouter = Router();

const clasificationsController = new ClasificationsController();

clasificationsRouter.get('/', clasificationsController.getAll);
clasificationsRouter.get('/:id', clasificationsController.getByID);
clasificationsRouter.post('/create', clasificationsController.create);
clasificationsRouter.delete('/delete/:id', clasificationsController.delete);