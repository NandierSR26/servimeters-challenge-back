import { Request, Response, Router } from 'express'
import { AuthController } from '../controllers/auth.controller';

export const authRouter = Router();

const authController = new AuthController();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.get('/validate-auth/:token', authController.validateAuth);

authRouter.get('/test', (req: Request, res: Response) => {
  res.json({
    message: 'Auth router works!'
  })
})
