import React, { useState, useEffect } from 'react';

const steps = ['Inhale', 'Hold', 'Exhale', 'Hold'];

const BreathingExercise = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setStepIndex((prev) => (prev + 1) % steps.length);
      }, 4000); // each step lasts 4s
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      <h2>Breathing Timer</h2>
      <div style={styles.box}>{steps[stepIndex]}</div>
      <button onClick={() => setRunning(!running)}>
        {running ? 'Pause' : 'Start'}
      </button>
    </div>
  );
};

const styles = {
  box: {
    fontSize: '2rem',
    padding: '20px',
    margin: '10px',
    border: '2px solid #ccc',
    borderRadius: '10px',
    width: '200px',
    textAlign: 'center',
  },
};

export default BreathingExercise;
