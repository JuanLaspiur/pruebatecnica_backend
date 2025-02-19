import express from 'express';
import { UserController } from '../controllers/userController';
import validateUserRoutes from '../middlewares/validateUser';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

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
router.post(`/login`, validateUserRoutes('login'), UserController.login);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users need Bearer Token
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
router.get(`/`, authMiddleware, UserController.getAllUsers);

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
router.post(`/`, validateUserRoutes('register'), UserController.createUser); 


export default router;
