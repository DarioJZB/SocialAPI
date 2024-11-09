import { Router } from 'express';
import { 
    createReaction, 
    createThought, 
    deleteReactionById, 
    deleteThought, 
    getAllThoughts, 
    getThoughtById, 
    updateThought } 
from '../../controllers/thoughtsController';

const router = Router();

// /api/thoughts
router.route('/').get(getAllThoughts);
router.route('/').post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById);
router.route('/:thoughtId').put(updateThought);
router.route('/:thoughtId').delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactionById);

export { router as thoughtsRouter }