import { create } from 'zustand';
import { Post } from '../types';

interface PostsState {
  posts: Post[];
  addPost: (content: string, hashtags: string[]) => void;
  likePost: (postId: string, userId: string) => void;
  sharePost: (postId: string) => void;
}

const mockPosts: Post[] = [
  {
    id: '1',
    authorId: '1',
    content: '🚀 Just launched my new React project! Check out the code:\n\n```typescript\nconst App = () => {\n  return <div>Hello World!</div>;\n};\n```\n\n#react #typescript',
    createdAt: new Date(),
    likes: [],
    shares: 0,
    hashtags: ['#react', '#typescript']
  },
  {
    id: '2',
    authorId: '1',
    content: 'TIL: You can use the nullish coalescing operator (??) to provide default values:\n\n```javascript\nconst value = null;\nconst result = value ?? "default";\nconsole.log(result); // "default"\n```\n\n#javascript #coding',
    createdAt: new Date(Date.now() - 86400000),
    likes: [],
    shares: 0,
    hashtags: ['#javascript', '#coding']
  }
];

export const usePostsStore = create<PostsState>((set) => ({
  posts: mockPosts,
  addPost: (content, hashtags) =>
    set((state) => ({
      posts: [
        {
          id: Date.now().toString(),
          authorId: '1',
          content,
          createdAt: new Date(),
          likes: [],
          shares: 0,
          hashtags,
        },
        ...state.posts,
      ],
    })),
  likePost: (postId, userId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes.includes(userId)
                ? post.likes.filter((id) => id !== userId)
                : [...post.likes, userId],
            }
          : post
      ),
    })),
  sharePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, shares: post.shares + 1 }
          : post
      ),
    })),
}));