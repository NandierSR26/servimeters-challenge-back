import { Router } from 'express';
import { MoviesController } from '../controllers/movies.controller';

export const moviesRouter = Router();

const moviesController = new MoviesController();

moviesRouter.get('/', moviesController.getAll);
moviesRouter.get('/:id', moviesController.getByID);
moviesRouter.post('/create', moviesController.create);
moviesRouter.patch('/update/:id', moviesController.update);
moviesRouter.delete('/delete/:id', moviesController.delete);