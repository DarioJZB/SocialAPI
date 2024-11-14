import { Request, Response } from "express";
import { Thought, User } from "../models/index.js";

const updateUserThoughtArr = async (username: any, thoughtId: any) => {
    try {
        const userThoughts = await User.findOneAndUpdate(
            { username: username },
            { $addToSet: { thoughts: thoughtId } },
            { runValidators: true, new: true }
        );
        if (!userThoughts) {
            return console.log(`Could not update ${username}'s thoughts`);
        }
        return console.log(`Updated ${username}'s thoughts`)
    } catch (error: any) {
        return console.log('Error: ', error);
    }
}

export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json({ thoughts });
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        res.json({ thought })
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
        await updateUserThoughtArr(thought.username, thought._id);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const updateThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        res.json(updatedThought);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findOneAndDelete({ _id: thoughtId })
        if (!thought) {
            res.status(404).json({ message: 'Thought does not exist' });
        }
        console.log(thought);
        res.json({ message: 'Thought deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createReaction = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $addToSet: req.body },
            { runValidators: true, new: true }
        );
        if (!reaction) {
            res.status(404).json({ message: 'Reaction does not exist' });
        }
        console.log(reaction);
        res.json({ message: 'Reaction deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteReactionById = async (req: Request, res: Response) => {
    const { thoughtId, reactionId } = req.params;
    try {
        const deleteReaction = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $pull: { reaction: reactionId } },
            { runValidators: true, new: true }
        );
        if (!deleteReaction) {
            res.status(404).json({ message: 'No reaction found' })
        }
        res.json(deleteReaction);
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
};