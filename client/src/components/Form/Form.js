import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { createPost, updatePost } from '../../api';

const Form = ({ currentId, setCurrentId, refreshPosts }) => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });

  useEffect(() => {
    if (!currentId) return;

    const fetchPost = async () => {
      const response = await fetch(`https://vibely-93ba.onrender.com/posts/${currentId}`);
      const data = await response.json();
      setPostData(data);
    };

    fetchPost();
  }, [currentId]);

  const clear = () => {
    setCurrentId(null);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId) {
      await updatePost(currentId, postData);
    } else {
      await createPost(postData);
    }

    clear();
    refreshPosts();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-indigo-400">
          {currentId ? 'Edit Memory' : 'Create Memory'}
        </h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Creator</label>
          <input
            type="text"
            placeholder="Your name"
            value={postData.creator}
            onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Title</label>
          <input
            type="text"
            placeholder="Memory title"
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Message</label>
          <textarea
            rows="3"
            placeholder="Your memory description"
            value={postData.message}
            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Tags</label>
          <input
            type="text"
            placeholder="comma,separated,tags"
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Image</label>
          <div className="flex items-center justify-center w-full bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg p-4">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
              className="text-gray-300 text-sm"
            />
          </div>
        </div>
        
        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            {currentId ? 'Update' : 'Create'}
          </button>
          <button
            type="button"
            onClick={clear}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg border border-gray-600 transition duration-200"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;