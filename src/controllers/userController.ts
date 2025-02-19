import { Request, Response } from 'express';
import { UserService } from '../services/userServices';
import User from '../models/User';

const userService = new UserService();

export class UserController {

 
  static async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      const newUser = await userService.register(name, email, password);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el usuario', error });
    }
  }

 
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
  }


  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const { user, token } = await userService.login(email, password);
      res.status(200).json({ message: 'Login exitoso', user, token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}
