import { Router } from 'express';
import { GendersController } from '../controllers/genders.controller';

export const gendersRouter = Router();

const gendersController = new GendersController();

gendersRouter.get('/', gendersController.getAll);
gendersRouter.get('/:id', gendersController.getByID);
gendersRouter.post('/create', gendersController.create);
gendersRouter.delete('/delete/:id', gendersController.delete);