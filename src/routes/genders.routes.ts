import { Router } from 'express';
import { GendersController } from '../controllers/genders.controller';
import { validateEmployeRol } from '../middlewares/validateRol';

export const gendersRouter = Router();

const gendersController = new GendersController();

gendersRouter.get('/', gendersController.getAll);
gendersRouter.get('/:id', gendersController.getByID);
gendersRouter.post('/create', [ validateEmployeRol ], gendersController.create);
gendersRouter.delete('/delete/:id', [ validateEmployeRol ], gendersController.delete);