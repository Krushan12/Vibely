import React from 'react';
import Post from './Post/Post';

const Posts = ({ posts, setCurrentId }) => {
  if (!posts.length) return <p className="text-center text-gray-500">No posts available.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {posts.map((post) => (
        <Post key={post._id} post={post} setCurrentId={setCurrentId} />
      ))}
    </div>
  );
};

export default Posts;
