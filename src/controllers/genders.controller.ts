import { Request, Response } from "express";
import { handleError, handleSuccess } from "../config/handleReponses";
import { GendersModel } from "../models/genders.model";

export class GendersController {


  public async getAll(req: Request, res: Response) {

    try {
      const genders = await GendersModel.find();
      return handleSuccess({code: 200, message: 'genders listed', res, data: genders});
      
    } catch (error) {
      return handleError({ code: 500, message: 'Something went wrong', res });
    }

  }

  public async getByID(req: Request, res: Response) {
    try {
      const gender = await GendersModel.findById(req.params.id);
      
      if(!gender) return handleError({code: 404, message: 'gender not found', res});

      return handleSuccess({code: 200, message: 'gender found', res, data: gender});
      
    } catch (error) {
      return handleError({ code: 500, message: 'Something went wrong', res, error });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const gender = await GendersModel.create(req.body);
      return handleSuccess({code: 200, message: 'Clasification created', res, data: gender});
      
    } catch (error) {
      return handleError({ code: 500, message: 'Something went wrong', res });
    }
  }

  public async update(req: Request, res: Response) {

  }

  public async delete(req: Request, res: Response) {
    try {
      const gender = await GendersModel.findById(req.params.id);
      
      if(!gender) return handleError({code: 404, message: 'gender not found', res});

      await GendersModel.findByIdAndDelete(req.params.id);

      return handleSuccess({code: 200, message: 'gender deleted', res});
      
    } catch (error) {
      return handleError({ code: 500, message: 'Something went wrong', res, error });
    }
  }


}