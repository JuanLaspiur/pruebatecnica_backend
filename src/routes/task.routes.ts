import express from 'express';
import { TaskController } from '../controllers/taskController';
import authMiddleware from '../middlewares/authMiddleware'; 
import { handleAsync } from '../helpers/handleAsyncHelper';

const router = express.Router();


router.post('/', authMiddleware, handleAsync(TaskController.createTask));
router.get('/', authMiddleware, handleAsync(TaskController.getAllTasks));
router.get('/id/:taskId', authMiddleware, handleAsync(TaskController.getTaskById));
router.put('/id/:taskId', authMiddleware, handleAsync(TaskController.updateTask));
router.delete('/id/:taskId', authMiddleware, handleAsync(TaskController.deleteTask));

export default router;

