import { create } from 'zustand';
import { Post } from '../types';
import { neo4jService } from '../services/neo4j';

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (content: string, hashtags: string[]) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  sharePost: (postId: string) => Promise<void>;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  loading: false,
  error: null,
  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const posts = await neo4jService.getPosts();
      set({ posts, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  addPost: async (content, hashtags) => {
    try {
      const post = await neo4jService.createPost({ content, hashtags });
      set((state) => ({ posts: [post, ...state.posts] }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },
  deletePost: async (postId) => {
    try {
      await neo4jService.deletePost(postId);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== postId)
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },
  likePost: async (postId) => {
    try {
      const updatedPost = await neo4jService.likePost(postId);
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId ? updatedPost : post
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },
  sharePost: async (postId) => {
    try {
      const updatedPost = await neo4jService.sharePost(postId);
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId ? updatedPost : post
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  }
}));