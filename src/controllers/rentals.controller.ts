import { Request, Response } from "express";
import { MoviesModel } from "../models/movies.model";
import { handleError, handleSuccess } from "../config/handleReponses";
import { RentalsModel } from "../models/rentals.model";

export class RentalsController {

  public async getAll(req: Request, res: Response) {

    try {
      const rentals = await RentalsModel.find()
        .populate('userID')
        .populate('movieID');
      return handleSuccess({ code: 200, message: "Listed rents", res, data: rentals });
    } catch (error) {
      return handleError({ code: 500, message: "Something went wrong", res, error });
    }

  }

  public async newRental(req: Request, res: Response) {

    try {
      const { movieID } = req.body;
      const uid = req.uid;
      const user = req.user;

      if (!uid || !user) return handleError({ code: 401, message: 'User not authenticated', res });

      const movie = await MoviesModel.findById(movieID);
      if (!movie) return handleError({ code: 404, message: 'Movie not found', res });

      // if(user.balance < movie.price) return handleError({code: 400, message: "You don't have enough money", res});

      const rentalDb = await RentalsModel.findOne({ userID: uid, movieID: movie.id });
      if (rentalDb) return handleError({ code: 400, message: "You've already rented this movie", res });

      const rental = await RentalsModel.create({ ...req.body, userID: uid });
      handleSuccess({ code: 200, message: "Movie rented successfully", res, data: rental });


    } catch (error) {
      console.log(error);
    }

  }

  public async endMovieRent(req: Request, res: Response) {

    try {
      const { id } = req.params;

      const rent: any = await RentalsModel.findById(id).populate('movieID').populate('userID').exec();
      if (!rent) return handleError({ code: 404, message: 'Rent not found', res });
      

      // console.log({start: rent.rental_date, end: rent.return_date})
      const start = rent.rental_date;
      const end = rent.return_date
      const currentDate = new Date()
      const dayMiliseconds = 24 * 60 * 60 * 1000;

      const diffMiliseconds = Math.abs(start.getTime() - currentDate.getTime());
      const diffDays = Math.round(diffMiliseconds / dayMiliseconds);
      const rentPrice = rent.movieID.price * diffDays;

      await RentalsModel.findByIdAndDelete( id );

      return handleSuccess({
        code: 200,
        message: "Rent finished",
        res,
        data: {
          movie: rent.movieID,
          user: rent.userID,
          startRent: rent.rental_date,
          endRent: currentDate.setUTCHours(0,0,0,0),
          totalPrice: rentPrice
        }
      })


    } catch (error) {

    }

  }
}