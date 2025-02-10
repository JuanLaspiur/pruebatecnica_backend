import express from 'express';
import { UserController } from '../controllers/userController';
 import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post(`/register`, UserController.createUser);
router.get(`/getAll`, UserController.getAllUsers);
router.post(`/login`,UserController.login)


export default router;