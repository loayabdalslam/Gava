export interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  joinedAt: Date;
  following: string[];
  followers: string[];
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
  likes: string[];
  shares: number;
  hashtags: string[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  likes: string[];
}