import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Robot from './Robot';

const challenges = [
  "Take a 10-minute walk in nature",
  "Practice gratitude by writing down 3 things you're thankful for",
  "Try a new healthy recipe",
  "Spend 15 minutes meditating",
  "Do something kind for someone else",
  "Learn something new today",
  "Practice deep breathing for 5 minutes",
  "Write a positive affirmation and repeat it throughout the day",
  "Spend quality time with a loved one",
  "Take a digital detox for an hour",
];

const DailyChallenge = () => {
  const [currentChallenge, setCurrentChallenge] = useState('');
  const [favoriteQuotes, setFavoriteQuotes] = useState(() => {
    const saved = localStorage.getItem('favoriteQuotes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Get today's date as a string (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    const lastChallengeDate = localStorage.getItem('lastChallengeDate');
    
    // Only update challenge if it's a new day
    if (lastChallengeDate !== today) {
      const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
      setCurrentChallenge(randomChallenge);
      localStorage.setItem('lastChallengeDate', today);
      localStorage.setItem('currentChallenge', randomChallenge);
    } else {
      setCurrentChallenge(localStorage.getItem('currentChallenge') || '');
    }
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '120px',
          height: '120px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          transform: 'translate(50%, -50%)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, position: 'relative', zIndex: 1 }}>
        <Box sx={{ mr: 2 }}>
          <Robot />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Daily Challenge
        </Typography>
      </Box>

      <Card 
        sx={{ 
          mb: 3,
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Today's Challenge
          </Typography>
          <Typography variant="body1">
            {currentChallenge}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default DailyChallenge; 