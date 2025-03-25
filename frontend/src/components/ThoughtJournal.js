import React, { useState } from 'react';
import './ThoughtJournal.css';

const ThoughtJournal = () => {
  const [thoughts, setThoughts] = useState('');
  const [entries, setEntries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (thoughts.trim() !== '') {
      setEntries([...entries, thoughts]);
      setThoughts('');
    }
  };

  return (
    <div className="thought-journal">
      <h2>📝 Thought Journal</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your thoughts here..."
          value={thoughts}
          onChange={(e) => setThoughts(e.target.value)}
          rows={5}
        />
        <button type="submit">Add Entry</button>
      </form>
      <div className="journal-entries">
        {entries.map((entry, index) => (
          <div key={index} className="entry">
            <p>{entry}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThoughtJournal;
