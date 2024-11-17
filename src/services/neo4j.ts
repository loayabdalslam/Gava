import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const neo4jService = {
  async createUser(userData: {
    username: string;
    email: string;
    avatar?: string;
    bio?: string;
  }) {
    try {
      const response = await axios.post(`${API_URL}/users`, userData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  async getUser(username: string) {
    try {
      const response = await axios.get(`${API_URL}/users/${username}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }
}; 