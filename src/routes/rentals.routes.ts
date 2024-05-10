import { Router } from 'express';
import { RentalsController } from '../controllers/rentals.controller';
import { validateEmployeRol } from '../middlewares/validateRol';

export const rentalsRouter = Router();

const rentalsController = new RentalsController();

rentalsRouter.get('/', [ validateEmployeRol ], rentalsController.getAll)
rentalsRouter.post('/add-rental', rentalsController.newRental);
rentalsRouter.delete('/end-rent/:id', [ validateEmployeRol ], rentalsController.endMovieRent)