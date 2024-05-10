import { Request, Response } from "express";
import { handleError, handleSuccess } from "../config/handleReponses";
import { MoviesModel } from "../models/movies.model";
import { GendersModel } from "../models/genders.model";
import { ClasificationsModel } from "../models/clasifications.model";

export class MoviesController {
  public async getAll(req: Request, res: Response) {

    try {
      const movies = await MoviesModel.find()
        .populate('clasification')
        .populate('gender');
      return handleSuccess({ code: 200, message: 'movies listed', res, data: movies });

    } catch (error) {
      return handleError({ code: 500, message: 'Something went wrong', res });
    }

  }

  public async searchMovies(req: Request, res: Response) {

    const { name, director, gender, clasification, year } = req.query;
    const query: any = {};

    if (name) {
      query.name = name;
    }
    if (director) {
      query.director = director;
    }

    if (gender) {
      query.gender = gender;
    }
    if (year) {
      query.year = year;
    }
    if (clasification) {
      query.clasification = clasification;
    }

    const movies = await MoviesModel.find(query);
    return handleSuccess({ code: 200, message: "Ready search results", res, data: movies });

  }

  public async getByID(req: Request, res: Response) {
    try {
      const movie = await MoviesModel.findById(req.params.id)
        .populate('clasification')
        .populate('gender');

      if (!movie) return handleError({ code: 404, message: 'movie not found', res });

      return handleSuccess({ code: 200, message: 'movie found', res, data: movie });

    } catch (error) {
      return handleError({ code: 500, message: 'Something went wrong', res, error });
    }
  }

  public async create(req: Request, res: Response) {

    try {
      const { clasification, gender, price, ...rest } = req.body;
      const { filename } = req.file!;
      let priceNumber = +price;

      const genderDb = await GendersModel.findById(gender);
      const clasificationDb = await ClasificationsModel.findById(clasification);

      if (!genderDb) handleError({ code: 404, message: 'Gender not exist', res });
      if (!clasificationDb) handleError({ code: 404, message: 'Clasification not exist', res });

      const movies = await MoviesModel.create({ clasification, gender, price: priceNumber, poster: filename, ...rest });
      return handleSuccess({ code: 200, message: 'Clasification created', res, data: movies });

    } catch (error) {
      return handleError({ code: 500, message: 'Something went wrong', res, error });
    }
  }

  public async update(req: Request, res: Response) {

    try {
      let filename;
      const { clasification, gender, price, ...rest } = req.body;
      let priceNumber = +price;

      if (req.file?.filename) {
        filename = req.file.filename;
      }

      const movie = await MoviesModel.findById(req.params.id);
      if (!movie) return handleError({ code: 404, message: 'movie not found', res });

      if (gender) {
        const genderDb = await GendersModel.findById(gender);
        if (!genderDb) handleError({ code: 404, message: 'Gender not exist', res });
      }

      if (clasification) {
        const clasificationDb = await ClasificationsModel.findById(clasification);
        if (!clasificationDb) handleError({ code: 404, message: 'Clasification not exist', res });
      }

      const data = { clasification, gender, price: priceNumber, poster: filename, ...rest };

      const updatedMovie = await MoviesModel.findByIdAndUpdate(req.params.id, data, { new: true });

      return handleSuccess({ code: 200, message: 'movie found', res, data: updatedMovie });

    } catch (error) {
      return handleError({ code: 500, message: 'Something went wrong', res, error });
    }

  }

  public async delete(req: Request, res: Response) {
    try {
      const movie = await MoviesModel.findById(req.params.id);

      if (!movie) return handleError({ code: 404, message: 'movie not found', res });

      await MoviesModel.findByIdAndDelete(req.params.id);

      return handleSuccess({ code: 200, message: 'movie deleted', res });

    } catch (error) {
      return handleError({ code: 500, message: 'Something went wrong', res, error });
    }
  }
}