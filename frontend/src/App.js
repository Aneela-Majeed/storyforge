import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [stories, setStories] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Load stories from backend
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/stories/')
      .then(res => res.json())
      .then(data => setStories(data));
  }, []);

  // Create new story
  const createStory = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/stories/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
    const newStory = await response.json();
    setStories([...stories, newStory]);
    setTitle('');
    setDescription('');
  };

  // Delete story
  const deleteStory = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/stories/${id}/`, {
      method: 'DELETE'
    });
    setStories(stories.filter(story => story.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📖 StoryForge</h1>
        <p>Create your branching narratives</p>
      </header>

      <div className="container">
        <div className="create-form">
          <h2>Create New Story</h2>
          <form onSubmit={createStory}>
            <input
              type="text"
              placeholder="Story Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Story Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
            <button type="submit">Create Story</button>
          </form>
        </div>

        <div className="stories-list">
          <h2>Your Stories</h2>
          {stories.length === 0 ? (
            <p>No stories yet. Create your first story above!</p>
          ) : (
            <div className="story-grid">
              {stories.map((story) => (
                <div key={story.id} className="story-card">
                  <h3>{story.title}</h3>
                  <p>{story.description || 'No description'}</p>
                  <small>By: {story.author}</small>
                  <button onClick={() => deleteStory(story.id)} className="delete">
                    🗑️ Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;