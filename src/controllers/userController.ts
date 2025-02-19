import { Request, Response } from 'express';
import { UserService } from '../services/userServices';
import User from '../models/User';

const userService = new UserService();

export class UserController {

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     description: Registers a new user in the system.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 example: "John Doe"
   *               email:
   *                 type: string
   *                 example: "john@example.com"
   *               password:
   *                 type: string
   *                 example: "SecurePassword123"
   *     responses:
   *       201:
   *         description: User successfully created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   example: "userId"
   *                 name:
   *                   type: string
   *                   example: "John Doe"
   *       400:
   *         description: Bad request, validation failed
   *       500:
   *         description: Internal server error
   */
  static async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      const newUser = await userService.register(name, email, password);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el usuario', error });
    }
  }

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get all users
   *     description: Fetches all users in the system.
   *     responses:
   *       200:
   *         description: A list of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   name:
   *                     type: string
   *                   email:
   *                     type: string
   *       500:
   *         description: Internal server error
   */
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
  }

  /**
   * @swagger
   * /users/login:
   *   post:
   *     summary: User login
   *     description: Authenticates a user and returns a token.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: "john@example.com"
   *               password:
   *                 type: string
   *                 example: "SecurePassword123"
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Login exitoso"
   *                 user:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                       example: "userId"
   *                     name:
   *                       type: string
   *                       example: "John Doe"
   *                 token:
   *                   type: string
   *                   example: "JWTTokenExample"
   *       401:
   *         description: Unauthorized, invalid credentials
   *       500:
   *         description: Internal server error
   */
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
