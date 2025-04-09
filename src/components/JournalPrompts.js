import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import { Refresh as RefreshIcon, Save as SaveIcon } from '@mui/icons-material';

const prompts = [
  "What are three things you're grateful for today?",
  "Describe a moment today when you felt truly present.",
  "What emotions did you experience today? How did you handle them?",
  "What's one thing you learned about yourself today?",
  "How did you practice self-care today?",
  "What challenges did you face today? How did you overcome them?",
  "What made you smile today?",
  "How did you show kindness to yourself or others today?",
  "What are you looking forward to tomorrow?",
  "What's one thing you'd like to improve about your daily routine?",
];

const JournalPrompts = () => {
  const theme = useTheme();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [savedResponses, setSavedResponses] = useState([]);

  useEffect(() => {
    getRandomPrompt();
    // Load saved responses from localStorage
    const saved = JSON.parse(localStorage.getItem('journalResponses') || '[]');
    setSavedResponses(saved);
  }, []);

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setCurrentPrompt(prompts[randomIndex]);
  };

  const handleSave = () => {
    if (!response.trim()) return;

    const newResponse = {
      prompt: currentPrompt,
      response: response,
      date: new Date().toISOString(),
    };

    const updatedResponses = [...savedResponses, newResponse];
    setSavedResponses(updatedResponses);
    localStorage.setItem('journalResponses', JSON.stringify(updatedResponses));
    setResponse('');
    getRandomPrompt();
  };

  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
        borderRadius: 2,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
          Daily Journal Prompt
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <Typography variant="body1" sx={{ flex: 1 }}>
            {currentPrompt}
          </Typography>
          <IconButton
            onClick={getRandomPrompt}
            sx={{
              color: theme.palette.primary.main,
              '&:hover': {
                transform: 'rotate(180deg)',
                transition: 'transform 0.5s ease',
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      <TextField
        fullWidth
        multiline
        rows={6}
        variant="outlined"
        placeholder="Write your response here..."
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            borderRadius: 1,
          },
        }}
      />

      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        onClick={handleSave}
        disabled={!response.trim()}
        sx={{
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
          },
        }}
      >
        Save Response
      </Button>

      {savedResponses.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Your Previous Responses
          </Typography>
          {savedResponses.slice().reverse().map((item, index) => (
            <Paper
              key={index}
              sx={{
                p: 2,
                mb: 2,
                background: 'white',
                borderRadius: 1,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                {new Date(item.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontStyle: 'italic' }}>
                {item.prompt}
              </Typography>
              <Typography variant="body1">
                {item.response}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default JournalPrompts; 