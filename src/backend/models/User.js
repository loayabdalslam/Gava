import { v4 as uuidv4 } from 'uuid';
import Neo4jConnection from '../config/neo4j.js';

class UserModel {
  static async create(userData) {
    const driver = Neo4jConnection.getInstance();
    const session = driver.session();

    try {
      const result = await session.executeWrite(async (tx) => {
        const query = `
          CREATE (u:User {
            id: $id,
            username: $username,
            email: $email,
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
          avatar: userData.avatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${userData.username}`,
          bio: userData.bio || '',
        };

        const response = await tx.run(query, params);
        return response.records[0].get('u').properties;
      });

      return result;
    } finally {
      await session.close();
    }
  }

  static async findByUsername(username) {
    const driver = Neo4jConnection.getInstance();
    const session = driver.session();

    try {
      const result = await session.executeRead(async (tx) => {
        const query = `
          MATCH (u:User {username: $username})
          RETURN u
        `;

        const response = await tx.run(query, { username });
        return response.records[0]?.get('u').properties || null;
      });

      return result;
    } finally {
      await session.close();
    }
  }
}

export default UserModel; 