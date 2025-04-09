import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RefreshIcon from '@mui/icons-material/Refresh';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { motion } from 'framer-motion';

const affirmations = [
  "I am worthy of love and happiness.",
  "I choose to focus on what I can control.",
  "I am capable of achieving my goals.",
  "I am grateful for all the good in my life.",
  "I trust in my ability to handle any situation.",
  "I am becoming better every day.",
  "I am surrounded by love and positivity.",
  "I am strong, confident, and capable.",
];

const selfLovePractices = [
  "Write down 3 things you love about yourself",
  "Take a relaxing bath with your favorite scents",
  "Practice positive self-talk in the mirror",
  "Do something that makes you feel good",
  "Set healthy boundaries for yourself",
  "Forgive yourself for past mistakes",
  "Celebrate your achievements, big or small",
  "Spend time doing what you truly enjoy",
];

const getToday = () => new Date().toISOString().split('T')[0];

const CalendarAffirmation = () => {
  const today = getToday();

  const [currentAffirmation, setCurrentAffirmation] = useState(() => {
    const saved = localStorage.getItem('currentAffirmation');
    return saved || affirmations[Math.floor(Math.random() * affirmations.length)];
  });

  const [currentPractice, setCurrentPractice] = useState(() => {
    const saved = localStorage.getItem('currentPractice');
    return saved || selfLovePractices[Math.floor(Math.random() * selfLovePractices.length)];
  });

  const [favoriteAffirmations, setFavoriteAffirmations] = useState(() => {
    const saved = localStorage.getItem('favoriteAffirmations');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedDates, setCompletedDates] = useState(() => {
    const saved = localStorage.getItem('completedDates');
    return saved ? JSON.parse(saved) : [];
  });

  // Add today's date to completed list
  useEffect(() => {
    if (!completedDates.includes(today)) {
      const updated = [...completedDates, today];
      setCompletedDates(updated);
      localStorage.setItem('completedDates', JSON.stringify(updated));
    }
  }, [today]);

  const handleNewAffirmation = () => {
    const newAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    setCurrentAffirmation(newAffirmation);
    localStorage.setItem('currentAffirmation', newAffirmation);
  };

  const handleNewPractice = () => {
    const newPractice = selfLovePractices[Math.floor(Math.random() * selfLovePractices.length)];
    setCurrentPractice(newPractice);
    localStorage.setItem('currentPractice', newPractice);
  };

  const handleFavoriteAffirmation = () => {
    if (!favoriteAffirmations.includes(currentAffirmation)) {
      const updated = [...favoriteAffirmations, currentAffirmation];
      setFavoriteAffirmations(updated);
      localStorage.setItem('favoriteAffirmations', JSON.stringify(updated));
    }
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(to right, #FFDEE9, #B5FFFC)',
                boxShadow: 4,
                borderRadius: 4,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarTodayIcon sx={{ mr: 1 }} />
                    Daily Affirmation
                  </Typography>
                  <Box>
                    <Tooltip title="New Affirmation">
                      <IconButton onClick={handleNewAffirmation}>
                        <RefreshIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Add to Favorites">
                      <IconButton onClick={handleFavoriteAffirmation}>
                        <FavoriteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ fontStyle: 'italic', fontWeight: 500 }}>
                  “{currentAffirmation}”
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(to right, #c2ffd8, #465efb)',
                boxShadow: 4,
                borderRadius: 4,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Self-Love Practice
                  </Typography>
                  <Tooltip title="New Practice">
                    <IconButton onClick={handleNewPractice}>
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography variant="h6">
                  {currentPractice}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Completed Calendar */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          🎉 Completed Days
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mt: 1,
            p: 2,
            backgroundColor: '#f9fbe7',
            borderRadius: 2,
            border: '1px dashed #c5e1a5',
          }}
        >
          {completedDates.map((date, i) => (
            <Box
              key={i}
              sx={{
                px: 2,
                py: 1,
                backgroundColor: '#aed581',
                color: '#fff',
                borderRadius: 2,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <EmojiEventsIcon fontSize="small" />
              {date}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CalendarAffirmation;
