import React, { useState } from 'react';
import { usePostsStore } from '../store/posts';

export default function PostEditor() {
  const [content, setContent] = useState('');
  const addPost = usePostsStore((state) => state.addPost);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const hashtags = content.match(/#[\w]+/g) || [];
    addPost(content, hashtags);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="bg-gray-800 rounded-lg p-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your code thoughts..."
          className="w-full bg-gray-700 text-gray-100 rounded-lg p-4 mb-4 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}