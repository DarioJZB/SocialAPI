import { Router } from 'express';

const router = Router();

// /api/users
router.route('/').get(getAllUsers);

// /api/:userId
router.route('/:userId').get(setUserById);