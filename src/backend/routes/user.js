import express from 'express';
import UserController from '../controllers/UserController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/users/login', UserController.login);
router.post('/users', UserController.createUser);
router.get('/users/:username', auth, UserController.getUser);

export default router; 