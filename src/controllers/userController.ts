import { Request, Response } from "express"
import { Thought, User } from "../models/index.js"

const deleteThoughts = async (userId: string) => {
    try {
        const user = await User.findById(userId);
        const userThoughts = await Thought.deleteMany(
            { username: user?.username },
            { runValidators: true, new: true }
        )
        if(userThoughts) {
            console.log('User thoughts deleted');
        } 
    } catch (error: any) {
        console.log('Error: ', error);
    } 
}

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json({ users });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json({ user })
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!updatedUser) {
            res.status(404).json({ message: 'No user found' });
        }
        res.json(updatedUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        await deleteThoughts (userId);
        const user = await User.findOneAndDelete({ _id: userId })
        if (!user) {
            res.status(404).json({ message: 'User does not exsist' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }    
};

export const addFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params; 
    try {
        const userFriend = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { friends: friendId } },
            { runValidators: true, new: true }
        );
        if (!userFriend) {
           res.status(404).json({ message: 'No user found with that ID' });
        }
        res.json(userFriend);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params; 
    try {
        const deleteUserFriend = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { friends: friendId } },
            { runValidators: true, new: true }
        );
        if (!deleteUserFriend) {
            res.status(404).json({ message: 'No user found with that ID'});
        }
        res.json(deleteUserFriend);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};