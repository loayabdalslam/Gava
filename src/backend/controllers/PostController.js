import PostModel from '../models/Post.js';

export class PostController {
  static async createPost(req, res) {
    try {
      const { content, hashtags } = req.body;
      const username = req.user?.username;
      
      if (!username) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const post = await PostModel.create({ content, hashtags }, username);
      res.status(201).json(post);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  }

  static async getPosts(req, res) {
    try {
      const posts = await PostModel.findAll();
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  }

  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      const username = req.user?.username;

      if (!username) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      await PostModel.delete(id, username);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  }

  static async likePost(req, res) {
    try {
      const { id } = req.params;
      const username = req.user?.username;

      if (!username) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const post = await PostModel.like(id, username);
      res.json(post);
    } catch (error) {
      console.error('Error liking post:', error);
      res.status(500).json({ error: 'Failed to like post' });
    }
  }
}

export default PostController; 