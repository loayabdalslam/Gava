import express from 'express';
import { PostController } from '../controllers/PostController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/posts', auth, PostController.createPost);
router.get('/posts', auth, PostController.getPosts);
router.delete('/posts/:id', auth, PostController.deletePost);
router.post('/posts/:id/like', auth, PostController.likePost);

export default router; 