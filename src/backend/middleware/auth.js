import jwt from 'jsonwebtoken';
import Neo4jConnection from '../config/neo4j.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const session = Neo4jConnection.getSession();
    
    try {
      const result = await session.executeRead(async (tx) => {
        const query = `
          MATCH (u:User {id: $userId})
          RETURN u
        `;
        const response = await tx.run(query, { userId: decoded.id });
        return response.records[0]?.get('u').properties;
      });

      if (!result) {
        throw new Error('User not found');
      }

      req.user = result;
      next();
    } finally {
      await session.close();
    }
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};