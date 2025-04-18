import React, { useState, useEffect } from 'react';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import axios from 'axios';
import { FiCamera } from 'react-icons/fi';

// Configure axios defaults
axios.defaults.baseURL = 'https://vibely-93ba.onrender.com';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.withCredentials = true; // Add credentials support

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Remove the custom CORS header, it won't work from client-side
      const { data } = await axios.get('/posts');
      setPosts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Remove currentId dependency, we'll handle refreshes manually

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex items-center justify-between bg-gray-800 rounded-xl shadow-lg p-6 mb-10 border border-gray-700">
          <div className="flex items-center space-x-4">
            <FiCamera className="text-indigo-400 text-4xl" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Vibely
            </h1>
          </div>
          <p className="text-gray-400">Capture your moments</p>
        </header>

        {loading && (
          <div className="text-center py-8">
            <p className="text-indigo-400">Loading posts...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 mb-6 text-center">
            <p className="text-red-300">{error}</p>
            <button
              onClick={fetchPosts}
              className="mt-2 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Posts posts={posts} setCurrentId={setCurrentId} refreshPosts={fetchPosts} />
          </div>
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Form currentId={currentId} setCurrentId={setCurrentId} refreshPosts={fetchPosts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;