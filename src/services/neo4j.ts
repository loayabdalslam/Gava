import axios from 'axios';
import { Post, User, Comment } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const neo4jService = {
  setAuthToken(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  async login(username: string, password: string) {
    const response = await axios.post(`${API_URL}/users/login`, {
      username,
      password
    });
    const { token, user } = response.data;
    this.setAuthToken(token);
    return user;
  },

  // User operations
  async createUser(userData: {
    username: string;
    email: string;
    avatar?: string;
    bio?: string;
  }) {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  },

  async getUser(username: string) {
    const response = await axios.get(`${API_URL}/users/${username}`);
    return response.data;
  },

  async updateUser(username: string, userData: Partial<User>) {
    const response = await axios.put(`${API_URL}/users/${username}`, userData);
    return response.data;
  },

  async deleteUser(username: string) {
    const response = await axios.delete(`${API_URL}/users/${username}`);
    return response.data;
  },

  // Post operations
  async createPost(postData: { content: string; hashtags: string[] }) {
    const response = await axios.post(`${API_URL}/posts`, postData);
    return response.data;
  },

  async getPosts() {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  },

  async getUserPosts(username: string) {
    const response = await axios.get(`${API_URL}/users/${username}/posts`);
    return response.data;
  },

  async deletePost(postId: string) {
    const response = await axios.delete(`${API_URL}/posts/${postId}`);
    return response.data;
  },

  async likePost(postId: string) {
    const response = await axios.post(`${API_URL}/posts/${postId}/like`);
    return response.data;
  },

  async sharePost(postId: string) {
    const response = await axios.post(`${API_URL}/posts/${postId}/share`);
    return response.data;
  },

  // Comment operations
  async addComment(postId: string, content: string) {
    const response = await axios.post(`${API_URL}/posts/${postId}/comments`, { content });
    return response.data;
  },

  async getComments(postId: string) {
    const response = await axios.get(`${API_URL}/posts/${postId}/comments`);
    return response.data;
  },

  async deleteComment(commentId: string) {
    const response = await axios.delete(`${API_URL}/comments/${commentId}`);
    return response.data;
  }
}; 