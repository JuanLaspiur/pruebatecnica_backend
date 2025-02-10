import express from 'express';
import { UserController } from '../controllers/userController';

const router = express.Router();

router.post(`/login`,UserController.login);
router.post(`/`, UserController.createUser);
router.get(`/`, UserController.getAllUsers);



export default router;