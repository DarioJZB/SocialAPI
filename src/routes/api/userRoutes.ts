import { Router } from 'express';
import { 
    addFriend,
    createUser, 
    deleteFriend, 
    deleteUser, 
    getAllUsers, 
    getUserById, 
    updateUser 
} from '../../controllers/userController';

const router = Router();

// /api/users
router.route('/').get(getAllUsers);
router.route('/').post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserById);
router.route('/:userId').put(updateUser);
router.route('/:userId').delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route(':userId/friends/:friendId').post(addFriend);
router.route(':userId/friends/:friendId').delete(deleteFriend);

export { router as userRouter };