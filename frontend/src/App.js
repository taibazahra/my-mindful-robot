import React from 'react';
import './App.css';
import ChatBot from './components/ChatBot';
import BreathingExercise from './components/BreathingExercise';
import ThoughtJournal from './components/ThoughtJournal';
import robotImage from './robot.webp'; // <-- Add your robot image in src folder

function App() {
  return (
    <div className="App">
      <h1>Hello, I'm your Daily Mindfulness ChatBot 🌿</h1>
      <h2>"Your calm mind is the ultimate weapon against your challenges 🌸</h2>
      <img src={robotImage} alt="Mindfulness Robot" className="robot-img" />
      <ChatBot />
      <BreathingExercise />
      <ThoughtJournal />
    </div>
  );
}

export default App;
