import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  Divider,
  Avatar,
  GlobalStyles
} from '@mui/material';
import Robot from '../components/Robot';
import MoodTracker from '../components/MoodTracker';
import BreathingExercise from '../components/BreathingExercise';
import GratitudeJournal from '../components/GratitudeJournal';
import DailyChallenge from '../components/DailyChallenge';
import ChatBot from '../components/ChatBot';
import CalendarAffirmation from '../components/CalendarAffirmation';
import JournalPrompts from '../components/JournalPrompts';
import JournalCalendar from '../components/JournalCalendar';
import SentimentAnalysis from '../components/SentimentAnalysis';
import TextSummarizer from '../components/TextSummarizer';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SummarizeIcon from '@mui/icons-material/Summarize';
import RecommendIcon from '@mui/icons-material/Recommend';

const Dashboard = () => {
  const theme = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Set initial scroll position to top
    window.scrollTo(0, 0);
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const textColor = '#000';

  const createPaperStyle = (gradientLight, gradientDark) => ({
    p: 3,
    height: '100%',
    background: theme.palette.mode === 'dark' ? gradientDark : gradientLight,
    borderRadius: 4,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    position: 'relative',
    overflow: 'hidden',
    color: textColor,
    '&:before': {
      content: '""',
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.1)',
    },
  });

  return (
    <>
      <GlobalStyles
        styles={{
          '*': {
            color: `${textColor} !important`,
          },
        }}
      />

      <Box
        sx={{
          minHeight: '100vh',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1e1e1e 0%, #2c2c2c 100%)'
            : 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={4} direction="column">

            {/* Welcome Section */}
            <Grid item>
              <Paper
                sx={{
                  ...createPaperStyle(
                    'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                    'linear-gradient(135deg, #3a0ca3 0%, #3f37c9 100%)'
                  ),
                  color: '#fff',
                  '&:before': {
                    top: 0,
                    right: 0,
                    width: '200px',
                    height: '200px',
                    transform: 'translate(50%, -50%)',
                  },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ maxWidth: '70%', position: 'relative', zIndex: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Welcome, {localStorage.getItem('userName') || 'User'}! 👋
                  </Typography>
                  <Typography variant="h6">
                    {currentTime.toLocaleTimeString()} ⏰
                  </Typography>
                </Box>
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Robot />
                </Box>
              </Paper>
            </Grid>

            {/* Components */}
            <Grid item><CalendarAffirmation /></Grid>

            <Grid item>
              <Paper sx={{
                ...createPaperStyle('linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)', 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)'),
                '&:before': {
                  top: 0, right: 0, width: '150px', height: '150px', transform: 'translate(50%, -50%)',
                },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, zIndex: 1, position: 'relative' }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}><FavoriteIcon /></Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Self-Love Practice 💖</Typography>
                </Box>
                <Typography variant="body1">Do something that makes you feel good today! ✨</Typography>
              </Paper>
            </Grid>

            <Grid item><MoodTracker /></Grid>

            <Grid item>
              <Paper sx={{
                ...createPaperStyle('linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)', 'linear-gradient(135deg, #88d8b0 0%, #c5e1a5 100%)'),
                '&:before': {
                  bottom: 0, right: 0, width: '120px', height: '120px', transform: 'translate(50%, 50%)',
                },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, zIndex: 1, position: 'relative' }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}><EmojiEventsIcon /></Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Daily Challenge 🎯</Typography>
                </Box>
                <DailyChallenge />
              </Paper>
            </Grid>

            <Grid item>
              <Paper sx={{
                ...createPaperStyle('linear-gradient(135deg, #00c6fb 0%, #005bea 100%)', 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)'),
                '&:before': {
                  top: 0, left: 0, width: '150px', height: '150px', transform: 'translate(-50%, -50%)',
                },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, zIndex: 1, position: 'relative' }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}><SelfImprovementIcon /></Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Breathing Exercise 🌬️</Typography>
                </Box>
                <BreathingExercise />
              </Paper>
            </Grid>

            <Grid item>
              <Paper sx={{
                ...createPaperStyle('linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)', 'linear-gradient(135deg, #4ecca3 0%, #a7e9af 100%)'),
                '&:before': {
                  bottom: 0, left: 0, width: '120px', height: '120px', transform: 'translate(-50%, 50%)',
                },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, zIndex: 1, position: 'relative' }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}><PsychologyIcon /></Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Gratitude Journal 📝</Typography>
                </Box>
                <GratitudeJournal />
              </Paper>
            </Grid>

            <Grid item>
              <Paper sx={{
                ...createPaperStyle('linear-gradient(135deg, #ffd3b6 0%, #ffaaa5 100%)', 'linear-gradient(135deg, #ffb6b9 0%, #fae3d9 100%)'),
                '&:before': {
                  top: 0, right: 0, width: '120px', height: '120px', transform: 'translate(50%, -50%)',
                },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, zIndex: 1, position: 'relative' }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}><SentimentSatisfiedAltIcon /></Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>AI Sentiment Analysis 🤖</Typography>
                </Box>
                <SentimentAnalysis />
              </Paper>
            </Grid>

            <Grid item>
              <Paper sx={{
                ...createPaperStyle('linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)', 'linear-gradient(135deg, #4ecca3 0%, #a7e9af 100%)'),
                '&:before': {
                  bottom: 0, left: 0, width: '120px', height: '120px', transform: 'translate(-50%, 50%)',
                },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, zIndex: 1, position: 'relative' }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}><SummarizeIcon /></Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>AI Text Summarizer 📝</Typography>
                </Box>
                <TextSummarizer />
              </Paper>
            </Grid>

            <Grid item>
              <Paper sx={{
                ...createPaperStyle('linear-gradient(135deg, #00c6fb 0%, #005bea 100%)', 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)'),
                '&:before': {
                  top: 0, left: 0, width: '150px', height: '150px', transform: 'translate(-50%, -50%)',
                },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, zIndex: 1, position: 'relative' }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}><RecommendIcon /></Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>AI Recommendations 🎯</Typography>
                </Box>
                <PersonalizedRecommendations />
              </Paper>
            </Grid>

            <Grid item>
              <Paper sx={{
                ...createPaperStyle('linear-gradient(135deg, #ffd3b6 0%, #ffaaa5 100%)', 'linear-gradient(135deg, #ffb6b9 0%, #fae3d9 100%)'),
                '&:before': {
                  top: 0, right: 0, width: '120px', height: '120px', transform: 'translate(50%, -50%)',
                },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, zIndex: 1, position: 'relative' }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}><PsychologyIcon /></Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Daily Journal Prompt ✍️</Typography>
                </Box>
                <JournalPrompts />
              </Paper>
            </Grid>

            <Grid item><JournalCalendar /></Grid>
            <Grid item><Divider sx={{ my: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }} /></Grid>
            <Grid item><ChatBot /></Grid>

          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
