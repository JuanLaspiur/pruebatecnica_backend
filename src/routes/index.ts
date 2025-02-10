import express from 'express';
import userRoutes from './user.routes';
import taskRoutes from './task.routes';

const router = express.Router();

router.use(`/users`, userRoutes);
router.use(`/tasks`, taskRoutes);
export default router;