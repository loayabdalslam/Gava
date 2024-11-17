import UserModel from '../models/User.js';

class UserController {
  static async createUser(req, res) {
    try {
      const { username, email, avatar, bio } = req.body;
      
      const existingUser = await UserModel.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      const user = await UserModel.create({
        username,
        email,
        avatar,
        bio,
      });

      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getUser(req, res) {
    try {
      const { username } = req.params;
      const user = await UserModel.findByUsername(username);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default UserController; 