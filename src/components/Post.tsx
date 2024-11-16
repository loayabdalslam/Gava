import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Star, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAuthStore } from '../store/auth';
import { usePostsStore } from '../store/posts';
import { useGamificationStore } from '../store/gamification';
import type { Post as PostType } from '../types';

interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps) {
  const user = useAuthStore((state) => state.user);
  const { likePost, sharePost } = usePostsStore();
  const addPoints = useGamificationStore((state) => state.addPoints);

  const isLiked = user ? post.likes.includes(user.id) : false;

  const handleLike = () => {
    if (!user) return;
    likePost(post.id, user.id);
    if (!isLiked) {
      addPoints(5); // Add points for liking a post
    }
  };

  const handleShare = () => {
    sharePost(post.id);
    if (user) {
      addPoints(10); // Add points for sharing
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <img
            src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${post.authorId}`}
            alt="avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-semibold">@user_{post.authorId}</h3>
            <p className="text-sm text-gray-400">
              {formatDistanceToNow(post.createdAt)} ago
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-invert max-w-none mb-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 ${
            isLiked ? 'text-yellow-500' : 'text-gray-400'
          }`}
        >
          <Star size={20} fill={isLiked ? 'currentColor' : 'none'} />
          <span>{post.likes.length}</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center space-x-2 text-gray-400"
        >
          <Share2 size={20} />
          <span>{post.shares}</span>
        </button>
      </div>

      {post.hashtags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.hashtags.map((tag) => (
            <span
              key={tag}
              className="text-blue-400 text-sm hover:text-blue-300 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}