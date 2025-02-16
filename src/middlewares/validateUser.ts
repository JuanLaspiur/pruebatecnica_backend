import { Request, Response, NextFunction } from 'express';

const validateUserRoutes = (route: 'login' | 'register') :any=> {
  return (req: Request, res: Response, next: NextFunction) => {
    const requiredFields = route === 'register' ? ['name', 'email', 'password'] : ['email', 'password'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Faltan campos requeridos. Asegúrese de incluir ${missingFields.map(field => `"${field}"`).join(', ')}.`,
      });
    }

    next();
  };
};

export default validateUserRoutes;

