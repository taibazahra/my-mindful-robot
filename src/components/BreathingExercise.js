import React, { useState, useEffect, useRef } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Slider,
  IconButton,
  CircularProgress,
  useTheme,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useSpring, animated } from 'react-spring';
import calmMusic from '../assets/calm.mp3'; // your audio path

const BreathingExercise = () => {
  const theme = useTheme();
  const [duration, setDuration] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const audioRef = useRef(new Audio(calmMusic));

  const breathingAnimation = useSpring({
    transform: isPlaying ? 'scale(1.2)' : 'scale(1)',
    config: { duration: 4000 },
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (isMusicPlaying) {
      audio.loop = true;
      audio.volume = 0.4;
      audio.play().catch((e) => console.warn('Audio blocked:', e));
    } else {
      audio.pause();
    }
    return () => audio.pause();
  }, [isMusicPlaying]);

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setIsMusicPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleStart = () => {
    setIsPlaying(true);
    setTimeLeft(duration * 60);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        transition: 'background-color 0.3s ease',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Breathing Exercise
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Duration (minutes)</Typography>
        <Slider
          value={duration}
          onChange={(e, val) => {
            setDuration(val);
            setTimeLeft(val * 60);
          }}
          min={1}
          max={15}
          step={1}
          marks
          valueLabelDisplay="auto"
          disabled={isPlaying}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <animated.div
          style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            backgroundColor: theme.palette.mode === 'dark' ? '#263238' : '#e3f2fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...breathingAnimation,
          }}
        >
          <Typography variant="h4">{formatTime(timeLeft)}</Typography>
        </animated.div>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color={isPlaying ? 'secondary' : 'primary'}
            startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            onClick={isPlaying ? handlePause : handleStart}
            sx={{
              px: 3,
              fontWeight: 'bold',
              borderRadius: 3,
              textTransform: 'none',
            }}
          >
            {isPlaying ? 'Pause' : 'Start'}
          </Button>

          <IconButton
            color={isMusicPlaying ? 'primary' : 'default'}
            onClick={() => setIsMusicPlaying((prev) => !prev)}
            disabled={!isPlaying}
          >
            <MusicNoteIcon />
          </IconButton>
        </Box>

        {isPlaying && (
          <Box sx={{ mt: 2 }}>
            <CircularProgress
              variant="determinate"
              value={(timeLeft / (duration * 60)) * 100}
              size={48}
              color="secondary"
            />
          </Box>
        )}
      </Box>

      <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
        Breathe in and out slowly with the expanding circle
      </Typography>
    </Paper>
  );
};

export default BreathingExercise;
