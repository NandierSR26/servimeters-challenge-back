import { Router } from 'express';
import { RentalsController } from '../controllers/rentals.controller';

export const rentalsRouter = Router();

const rentalsController = new RentalsController();

rentalsRouter.post('/add-rental', rentalsController.newRental);