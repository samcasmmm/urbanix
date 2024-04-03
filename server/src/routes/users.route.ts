import express from 'express';
import {
    health,
    signIn,
    signUp,
    profile,
    updateProfile,
    userById,
    searchUserByQuery,
    getAllUsers,
} from '../controllers/users.controller';
import { protect, isAdmin } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/health', health);

router.post('/signin', signIn);

router.post('/signup', signUp);

router.route('/profile').get(protect, profile).put(protect, updateProfile);

router.get('/profile/:id', protect, userById);

router.get('/search', protect, searchUserByQuery);

router.get('/', getAllUsers);

export default router;
