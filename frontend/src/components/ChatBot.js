import React, { useState, useEffect } from 'react';

const ChatBot = () => {
  const [name, setName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [mood, setMood] = useState('');
  const [gratitude, setGratitude] = useState(['', '', '', '', '']);
  const [submittedGratitude, setSubmittedGratitude] = useState([]);
  const [dailyAffirmation, setDailyAffirmation] = useState('');
  const [dailyChallenge, setDailyChallenge] = useState('');
  const [mindfulnessTip, setMindfulnessTip] = useState('');

  const affirmations = [
    "You are resilient and can overcome challenges.",
    "You are grateful for your body and all it does for you.",
    "You are confident in your abilities and strengths.",
    "You are enough, just as you are.",
    "You love and accept yourself, flaws and all."
  ];

  const challenges = [
    "Take a 5-minute walk.",
    "Compliment someone today.",
    "Journal without distractions.",
    "Spend 10 minutes without screens.",
    "Drink a glass of water mindfully."
  ];

  const mindfulnessTips = [
    "Notice how your breath feels right now.",
    "Put your hand on your heart. Feel its rhythm.",
    "Pause and take a slow deep breath.",
    "Notice 3 things you can hear right now.",
    "Feel your feet grounded beneath you."
  ];

  // Load name from localStorage on first render
  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setName(savedName);
      setNameSubmitted(true);
    }

    setDailyAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
    setDailyChallenge(challenges[Math.floor(Math.random() * challenges.length)]);
    setMindfulnessTip(mindfulnessTips[Math.floor(Math.random() * mindfulnessTips.length)]);
  }, []);

  const handleGratitudeChange = (index, value) => {
    const updated = [...gratitude];
    updated[index] = value;
    setGratitude(updated);
  };

  const handleGratitudeSubmit = (e) => {
    e.preventDefault();
    setSubmittedGratitude(gratitude.filter(entry => entry.trim() !== ''));
    setGratitude(['', '', '', '', '']);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      setNameSubmitted(true);
      localStorage.setItem('userName', name); // Save name
    }
  };

  return (
    <div style={styles.container}>

      {/* Name Input Section */}
      {!nameSubmitted ? (
        <div style={styles.section}>
          <h2>👋 What's your name?</h2>
          <form onSubmit={handleNameSubmit}>
            <input
              type="text"
              value={name}
              placeholder="Enter your name..."
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Save Name</button>
          </form>
        </div>
      ) : (
        <div style={styles.section}>
          <h2>🌟 Hello {name}!,Hope you doing great today 😊 </h2>
          <button onClick={() => setNameSubmitted(false)} style={styles.smallButton}>
            Change Name
          </button>
        </div>
      )}

      {/* Daily Affirmation */}
      <div style={styles.section}>
        <h2>🌞 {name ? `${name}, here's your affirmation:` : 'Daily Affirmation'}</h2>
        <p style={styles.affirmation}>{dailyAffirmation}</p>
      </div>

      {/* Mood Check-in */}
      <div style={styles.section}>
        <h2>😊 How are you feeling today?</h2>
        <select value={mood} onChange={(e) => setMood(e.target.value)} style={styles.select}>
          <option value="">-- Select your mood --</option>
          <option value="Happy">😃 Happy</option>
          <option value="Calm">😌 Calm</option>
          <option value="Anxious">😰 Anxious</option>
          <option value="Grateful">🙏 Grateful</option>
          <option value="Stressed">😩 Stressed</option>
        </select>
        {mood && <p>Your current mood: <strong>{mood}</strong></p>}
      </div>

      {/* Gratitude Journal */}
      <div style={styles.section}>
        <h2>📝 Gratitude Journal</h2>
        <form onSubmit={handleGratitudeSubmit}>
          {gratitude.map((entry, index) => (
            <input
              key={index}
              type="text"
              value={entry}
              placeholder={`Grateful for #${index + 1}`}
              onChange={(e) => handleGratitudeChange(index, e.target.value)}
              style={styles.input}
            />
          ))}
          <button type="submit" style={styles.button}>Save Gratitude</button>
        </form>

        {submittedGratitude.length > 0 && (
          <div style={styles.section}>
            <h3>💖 Your Gratitude Entries:</h3>
            <ul>
              {submittedGratitude.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Daily Challenge */}
      <div style={styles.section}>
        <h2>🎯 Daily Challenge</h2>
        <p>{dailyChallenge}</p>
      </div>

      {/* Mindfulness Tip */}
      <div style={styles.section}>
        <h2>🧘 Mindfulness Tip</h2>
        <p>{mindfulnessTip}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  section: {
    marginTop: '30px',
    padding: '15px',
    backgroundColor: '#f1f9f4',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  affirmation: {
    fontSize: '1.2rem',
    fontStyle: 'italic',
    color: '#444',
  },
  select: {
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginTop: '10px',
  },
  input: {
    display: 'block',
    width: '100%',
    marginTop: '10px',
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    marginTop: '15px',
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#3d9970',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  smallButton: {
    marginTop: '10px',
    padding: '6px 12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#ff9800',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};

export default ChatBot;
