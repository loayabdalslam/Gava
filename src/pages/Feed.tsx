import React from 'react';
import PostEditor from '../components/PostEditor';
import Post from '../components/Post';
import { usePostsStore } from '../store/posts';

export default function Feed() {
  const posts = usePostsStore((state) => state.posts);

  return (
    <div>
      <PostEditor />
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}