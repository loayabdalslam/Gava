import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.post('/users', UserController.createUser);
router.get('/users/:username', UserController.getUser);

export default router; 