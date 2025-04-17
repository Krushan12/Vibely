import React from 'react';
import moment from 'moment';
import { likePost, deletePost } from '../../../api';
import { FiHeart, FiTrash2, FiEdit } from 'react-icons/fi';

const Post = ({ post, setCurrentId }) => {
  const handleLike = async () => {
    await likePost(post._id);
    window.location.reload();
  };

  const handleDelete = async () => {
    await deletePost(post._id);
    window.location.reload();
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 transition-transform hover:scale-[1.02] hover:shadow-xl">
      <div className="relative h-64">
        <img
          src={post.selectedFile || 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent flex justify-between items-start">
          <div>
            <p className="text-white font-medium">{post.creator}</p>
            <p className="text-gray-300 text-xs">{moment(post.createdAt).fromNow()}</p>
          </div>
          <button
            onClick={() => setCurrentId(post._id)}
            className="text-white bg-black/30 hover:bg-black/50 p-2 rounded-full"
            aria-label="Edit post"
          >
            <FiEdit className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-700 text-indigo-300 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
        <p className="text-gray-300 mb-4">{post.message}</p>
        <div className="flex justify-between items-center border-t border-gray-700 pt-4">
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 text-gray-400 hover:text-indigo-400 transition-colors"
          >
            <FiHeart className="w-5 h-5" />
            <span>{post.likeCount}</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors"
          >
            <FiTrash2 className="w-5 h-5" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;