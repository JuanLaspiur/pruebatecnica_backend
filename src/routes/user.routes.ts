import express from 'express';
import { UserController } from '../controllers/userController';
import validateUserRoutes from '../middlewares/validateUser';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post(`/login`, validateUserRoutes('login'), UserController.login);
router.post(`/`,validateUserRoutes('register'), UserController.createUser); 
router.get(`/`,authMiddleware, UserController.getAllUsers);



export default router;