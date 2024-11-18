import { jest } from '@jest/globals';
import request from 'supertest';
import { app } from '../server.js';
import Neo4jConnection from '../config/neo4j.js';

describe('API Tests', () => {
  let testUser;
  let authToken;

  beforeAll(async () => {
    // Create test user
    testUser = {
      username: `testuser_${Date.now()}`,
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    };
  });

  afterAll(async () => {
    await Neo4jConnection.close();
  });

  describe('Health Check', () => {
    it('GET /api/health - should return server status', async () => {
      const response = await request(app).get('/api/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
    });
  });

  describe('User Operations', () => {
    it('POST /api/users - should create new user', async () => {
      const response = await request(app)
        .post('/api/users')
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('username', testUser.username);
    });

    it('POST /api/users/login - should login user', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          username: testUser.username,
          password: testUser.password
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      authToken = response.body.token;
    });
  });

  describe('Post Operations', () => {
    let testPostId;

    it('POST /api/posts - should create new post', async () => {
      const postData = {
        content: 'Test post content',
        hashtags: ['test']
      };

      const response = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${authToken}`)
        .send(postData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('content', postData.content);
      testPostId = response.body.id;
    });

    it('GET /api/posts - should get all posts', async () => {
      const response = await request(app)
        .get('/api/posts')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
}); 