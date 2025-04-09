import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  useTheme,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const JournalCalendar = () => {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [journalDates, setJournalDates] = useState([]);

  useEffect(() => {
    // Load journal dates from localStorage
    const savedResponses = JSON.parse(localStorage.getItem('journalResponses') || '[]');
    const dates = savedResponses.map(response => {
      const date = new Date(response.date);
      return date.toISOString().split('T')[0];
    });
    setJournalDates(dates);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthName = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
        borderRadius: 2,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <IconButton onClick={handlePrevMonth} size="small">
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {monthName}
        </Typography>
        <IconButton onClick={handleNextMonth} size="small">
          <ChevronRight />
        </IconButton>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Typography
            key={day}
            variant="caption"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: theme.palette.text.secondary,
            }}
          >
            {day}
          </Typography>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <Box key={`empty-${index}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const dateString = date.toISOString().split('T')[0];
          const hasJournalEntry = journalDates.includes(dateString);
          
          return (
            <Box
              key={dateString}
              sx={{
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: hasJournalEntry ? theme.palette.primary.main : 'transparent',
                color: hasJournalEntry ? 'white' : theme.palette.text.primary,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: hasJournalEntry ? theme.palette.primary.dark : theme.palette.action.hover,
                },
              }}
            >
              <Typography variant="caption">
                {day}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default JournalCalendar; 