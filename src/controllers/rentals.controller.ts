import { Request, Response } from "express";
import { MoviesModel } from "../models/movies.model";
import { handleError, handleSuccess } from "../config/handleReponses";
import { RentalsModel } from "../models/rentals.model";

export class RentalsController {
  public async newRental(req: Request, res: Response) {

    try {
      const { movieID } = req.body;
      const uid = req.uid;
      const user = req.user;

      if(!uid || !user) return handleError({code: 401, message: 'User not authenticated', res});

      const movie = await MoviesModel.findById(movieID);
      if(!movie) return handleError({code: 404, message: 'Movie not found', res});

      if(user.balance < movie.price) return handleError({code: 400, message: "You don't have enough money", res});

      const rentalDb = await RentalsModel.findOne({userID: uid, movieID: movie.id});
      if(rentalDb) return handleError({code: 400, message: "You've already rented this movie", res});

      const rental = await RentalsModel.create({...req.body, userID: uid});
      handleSuccess({code: 200, message: "Movie rented successfully", res, data: rental});
      

    } catch (error) {
      console.log(error);
    }

  }
}