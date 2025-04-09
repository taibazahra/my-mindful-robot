import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Grid,
} from '@mui/material';

const moods = [
  { icon: '😄', label: 'Very Happy', value: 5 },
  { icon: '🙂', label: 'Happy', value: 4 },
  { icon: '😐', label: 'Neutral', value: 3 },
  { icon: '🙁', label: 'Sad', value: 2 },
  { icon: '😢', label: 'Very Sad', value: 1 },
  { icon: '😴', label: 'Tired', value: 6 },
  { icon: '😬', label: 'Anxious', value: 7 },
  { icon: '😡', label: 'Angry', value: 8 },
  { icon: '🤩', label: 'Excited', value: 9 },
  { icon: '😌', label: 'Calm', value: 10 },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState(() => {
    const saved = localStorage.getItem('moodHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const handleMoodSelect = (moodValue) => {
    setSelectedMood(moodValue);
    const newEntry = {
      mood: moodValue,
      timestamp: new Date().toISOString(),
    };
    const updatedHistory = [...moodHistory, newEntry].slice(-7); // Keep last 7
    setMoodHistory(updatedHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        How are you feeling today?
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {moods.map((mood) => (
          <Grid item key={mood.value}>
            <Button
              variant={selectedMood === mood.value ? 'contained' : 'outlined'}
              onClick={() => handleMoodSelect(mood.value)}
              sx={{
                minWidth: 'auto',
                p: 2,
                borderRadius: '50%',
                backgroundColor:
                  selectedMood === mood.value ? 'primary.main' : 'transparent',
                '&:hover': {
                  backgroundColor:
                    selectedMood === mood.value ? 'primary.dark' : 'action.hover',
                },
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                  variant="h3"
                  component="span"
                  sx={{
                    color: selectedMood === mood.value ? 'white' : 'primary.main',
                  }}
                >
                  {mood.icon}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    color: selectedMood === mood.value ? 'white' : 'text.primary',
                  }}
                >
                  {mood.label}
                </Typography>
              </Box>
            </Button>
          </Grid>
        ))}
      </Grid>

      {moodHistory.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Your Mood History
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', py: 1 }}>
            {moodHistory.map((entry, index) => {
              const moodData = moods.find((m) => m.value === entry.mood);
              return (
                <Box
                  key={index}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    minWidth: 80,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="caption">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
                    <Typography variant="h5">{moodData?.icon}</Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default MoodTracker;
