import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';

const Home = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('userName', name);
      navigate('/dashboard');
    }
  };

  // ✅ Defer focus to avoid scroll jump
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            textAlign: 'center',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Mindful Bot
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Your personal mindfulness companion
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              inputRef={inputRef}
              fullWidth
              label="What's your name?"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={!name.trim()}
            >
              Begin Journey
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
