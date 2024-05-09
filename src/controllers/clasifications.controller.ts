import { Request, Response } from "express";
import { ClasificationsModel } from "../models/clasifications.model";
import { handleError, handleSuccess } from "../config/handleReponses";

export class ClasificationsController {


  public async getAll(req: Request, res: Response) {

    try {
      const clasifications = await ClasificationsModel.find();
      return handleSuccess({code: 200, message: 'Clasifications listed', res, data: clasifications});
      
    } catch (error) {
      return handleError({ code: 500, message: 'Something went wrong', res });
    }

  }

  public async getByID(req: Request, res: Response) {
    try {
      const clasification = await ClasificationsModel.findById(req.params.id);
      
      if(!clasification) return handleError({code: 404, message: 'Clasification not found', res});

      return handleSuccess({code: 200, message: 'Clasification found', res, data: clasification});
      
    } catch (error) {
      return handleError({ code: 500, message: 'Something went wrong', res, error });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const clasifications = await ClasificationsModel.create(req.body);
      return handleSuccess({code: 200, message: 'Clasification created', res, data: clasifications});
      
    } catch (error) {
      return handleError({ code: 500, message: 'Something went wrong', res });
    }
  }

  public async update(req: Request, res: Response) {

  }

  public async delete(req: Request, res: Response) {
    try {
      const clasification = await ClasificationsModel.findById(req.params.id);
      
      if(!clasification) return handleError({code: 404, message: 'Clasification not found', res});

      await ClasificationsModel.findByIdAndDelete(req.params.id);

      return handleSuccess({code: 200, message: 'Clasification deleted', res});
      
    } catch (error) {
      return handleError({ code: 500, message: 'Something went wrong', res, error });
    }
  }


}