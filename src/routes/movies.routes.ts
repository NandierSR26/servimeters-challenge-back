import { Router } from 'express';
import { MoviesController } from '../controllers/movies.controller';
import { upload } from '../helpers/upload-file';
import { validateEmployeRol } from '../middlewares/validateRol';

export const moviesRouter = Router();

const moviesController = new MoviesController();

moviesRouter.get('/', moviesController.getAll);
moviesRouter.get('/:id', moviesController.getByID);
moviesRouter.post('/create', [ upload.single('poster'), validateEmployeRol ], moviesController.create);
moviesRouter.patch('/update/:id', [ upload.single('poster'), validateEmployeRol ], moviesController.update);
moviesRouter.delete('/delete/:id', [ validateEmployeRol ], moviesController.delete);