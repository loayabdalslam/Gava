import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import Neo4jConnection from '../config/neo4j.js';

class UserModel {
  static async create(userData) {
    const session = Neo4jConnection.getSession();
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const result = await session.executeWrite(async (tx) => {
        const query = `
          CREATE (u:User {
            id: $id,
            username: $username,
            email: $email,
            password: $password,
            avatar: $avatar,
            bio: $bio,
            joinedAt: datetime()
          })
          RETURN u
        `;

        const params = {
          id: uuidv4(),
          username: userData.username,
          email: userData.email,
          password: hashedPassword,
          avatar: userData.avatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${userData.username}`,
          bio: userData.bio || '',
        };

        const response = await tx.run(query, params);
        const user = response.records[0].get('u').properties;
        delete user.password;
        return user;
      });
      return result;
    } finally {
      await session.close();
    }
  }

  static async verifyCredentials(username, password) {
    const session = Neo4jConnection.getSession();
    try {
      const result = await session.executeRead(async (tx) => {
        const query = `
          MATCH (u:User {username: $username})
          RETURN u
        `;
        const response = await tx.run(query, { username });
        const user = response.records[0]?.get('u').properties;
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return null;
        }
        
        delete user.password;
        return user;
      });
      return result;
    } finally {
      await session.close();
    }
  }
}

export default UserModel; 