import { Router } from 'express';
import { userRouter } from './userRoutes.js'
import { thoughtsRouter } from './thoughtRoutes.js'

const router = Router();

router.use('/users', userRouter);
router.use('/thoughts', thoughtsRouter);

export default router;