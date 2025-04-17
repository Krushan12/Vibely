import React from 'react';
import Post from './Post/Post';

const Posts = ({ posts, setCurrentId }) => {
  if (!posts.length) return (
    <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
      <p className="text-gray-400">No memories yet. Create your first one!</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <Post key={post._id} post={post} setCurrentId={setCurrentId} />
      ))}
    </div>
  );
};

export default Posts;