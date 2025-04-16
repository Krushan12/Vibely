import React, { useState, useEffect } from 'react';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import axios from 'axios';
import memories from './images/memories.png';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('https://vibely-93ba.onrender.com/posts');
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentId]);

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="flex items-center justify-between bg-white rounded-xl shadow p-6 mb-10">
        <h1 className="text-3xl font-bold text-blue-500">Vibely</h1>
        <img src={memories} alt="icon" className="h-14" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Posts posts={posts} setCurrentId={setCurrentId} />
        </div>
        <div>
          <Form currentId={currentId} setCurrentId={setCurrentId} refreshPosts={fetchPosts} />
        </div>
      </div>
    </div>
  );
};

export default App;