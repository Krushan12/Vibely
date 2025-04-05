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
      const response = await fetch(`http://localhost:5000/posts/${currentId}`);
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
    <div className="bg-white p-6 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">{currentId ? 'Edit Memory' : 'Create Memory'}</h2>
        <input
          type="text"
          placeholder="Creator"
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          className="border p-2 rounded"
        />
        <textarea
          rows="3"
          placeholder="Message"
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
          className="border p-2 rounded"
        />
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
        <button type="button" onClick={clear} className="bg-gray-300 p-2 rounded">Clear</button>
      </form>
    </div>
  );
};

export default Form;
