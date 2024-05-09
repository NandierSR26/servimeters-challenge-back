import { NextFunction, Request, Response } from "express";
import { handleError } from "../config/handleReponses";

export const validateEmployeRol = (req: Request, res: Response, next: NextFunction) => {

  if (req.user?.rol[0] !== 'EMPLOYEE') return handleError({ code: 401, message: "You don't have permissions to perform this action", res });
  next();

}