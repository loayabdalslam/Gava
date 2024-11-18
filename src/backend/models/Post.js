import { v4 as uuidv4 } from 'uuid';
import Neo4jConnection from '../config/neo4j.js';

class PostModel {
  static async create(postData, authorUsername) {
    const session = Neo4jConnection.getSession();
    try {
      const result = await session.executeWrite(async (tx) => {
        const query = `
          MATCH (author:User {username: $username})
          CREATE (p:Post {
            id: $id,
            authorId: author.id,
            content: $content,
            hashtags: $hashtags,
            createdAt: datetime(),
            likes: [],
            shares: 0
          })<-[:POSTED]-(author)
          RETURN p, author
        `;

        const params = {
          id: uuidv4(),
          username: authorUsername,
          content: postData.content,
          hashtags: postData.hashtags || []
        };

        const response = await tx.run(query, params);
        const post = response.records[0].get('p').properties;
        const author = response.records[0].get('author').properties;
        
        return {
          ...post,
          author,
          likes: [],
          shares: 0,
          createdAt: new Date(post.createdAt)
        };
      });
      return result;
    } finally {
      await session.close();
    }
  }

  static async findAll() {
    const session = Neo4jConnection.getSession();
    try {
      const result = await session.executeRead(async (tx) => {
        const query = `
          MATCH (p:Post)<-[:POSTED]-(author:User)
          RETURN p, author
          ORDER BY p.createdAt DESC
        `;
        const response = await tx.run(query);
        return response.records.map(record => {
          const post = record.get('p').properties;
          const author = record.get('author').properties;
          return {
            ...post,
            author,
            likes: post.likes || [],
            shares: post.shares || 0,
            createdAt: new Date(post.createdAt)
          };
        });
      });
      return result;
    } finally {
      await session.close();
    }
  }

  static async delete(postId, username) {
    const session = Neo4jConnection.getSession();
    try {
      await session.executeWrite(async (tx) => {
        const query = `
          MATCH (u:User {username: $username})-[:POSTED]->(p:Post {id: $postId})
          DETACH DELETE p
        `;
        await tx.run(query, { postId, username });
      });
      return true;
    } finally {
      await session.close();
    }
  }

  static async like(postId, username) {
    const session = Neo4jConnection.getSession();
    try {
      const result = await session.executeWrite(async (tx) => {
        const query = `
          MATCH (u:User {username: $username}), (p:Post {id: $postId})
          MERGE (u)-[r:LIKED]->(p)
          ON CREATE SET p.likes = COALESCE(p.likes, 0) + 1
          RETURN p, u
        `;
        const response = await tx.run(query, { postId, username });
        return {
          ...response.records[0].get('p').properties,
          author: response.records[0].get('u').properties
        };
      });
      return result;
    } finally {
      await session.close();
    }
  }
}

export default PostModel; 