import React from 'react';
import moment from 'moment';
import { likePost, deletePost } from '../../../api';

const Post = ({ post, setCurrentId }) => {
  const handleLike = async () => {
    await likePost(post._id);
    window.location.reload(); // Simple reload to trigger refetch
  };

  const handleDelete = async () => {
    await deletePost(post._id);
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 relative">
      <img
        src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
        alt={post.title}
        className="rounded w-full h-48 object-cover mb-4"
      />
      <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
        <p className="text-sm">{post.creator}</p>
        <p className="text-xs">{moment(post.createdAt).fromNow()}</p>
      </div>
      <div className="absolute top-4 right-4">
        <button onClick={() => setCurrentId(post._id)} className="text-white bg-black bg-opacity-50 px-2 py-1 rounded">...</button>
      </div>
      <div className="text-gray-600 mb-2">{post.tags.map((tag) => `#${tag} `)}</div>
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-sm text-gray-700 my-2">{post.message}</p>
      <div className="flex justify-between items-center mt-4">
        <button onClick={handleLike} className="text-blue-500 hover:underline">Like {post.likeCount}</button>
        <button onClick={handleDelete} className="text-red-500 hover:underline">Delete</button>
      </div>
    </div>
  );
};

export default Post;
