import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  useTheme,
  Avatar,
  Badge,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { motion } from 'framer-motion';

const ChatBot = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState([
    {
      text: "👋 Hey there! I'm your mindful buddy. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = {
        text: input,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsBotTyping(true);

      // Simulate bot thinking delay
      setTimeout(() => {
        const lowerInput = input.toLowerCase();
        let botText;

        if (lowerInput.includes('tired') || lowerInput.includes('fatigue')) {
          botText = `😌 Sounds like you're feeling drained.\n\n🧘 Try a short breathing exercise.\n💧 Hydrate yourself.\n💤 A quick nap might help!`;
        } else if (lowerInput.includes('tip') || lowerInput.includes('help')) {
          const tips = [
            '🌿 Practice gratitude today.',
            '🎧 Listen to soothing music.',
            '📿 Try a 2-min meditation.',
            '📝 Journal your thoughts.',
            '🚶‍♀️ Take a walk mindfully.',
          ];
          botText = `💡 Here are 3 tips:\n\n${tips.sort(() => 0.5 - Math.random()).slice(0, 3).join('\n')}`;
        } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
          botText = `😊 Hello! I'm here with you.\n\nHow’s your day going so far?`;
        } else {
          botText = `🧘 I’m here to support you.\nFeel free to share what’s on your mind.`;
        }

        setMessages((prev) => [
          ...prev,
          {
            text: botText,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
        setIsBotTyping(false);
      }, 1200);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(145deg, #f5f7fa 0%, #e2ebf0 100%)',
        borderRadius: 3,
        boxShadow: 6,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color="success"
        >
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            <SmartToyIcon />
          </Avatar>
        </Badge>
        <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
          Mindful Chat
        </Typography>
      </Box>

      {/* Chat Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 2,
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(8px)',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: '10px',
          },
        }}
      >
        <List>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ListItem
                sx={{
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: msg.sender === 'user' ? theme.palette.secondary.main : theme.palette.primary.main,
                      mr: 1,
                    }}
                  >
                    {msg.sender === 'user' ? <PersonIcon /> : <SmartToyIcon />}
                  </Avatar>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    {msg.timestamp}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    maxWidth: '80%',
                    p: 2,
                    borderRadius: 3,
                    background:
                      msg.sender === 'user'
                        ? 'linear-gradient(to right, #6a11cb, #2575fc)'
                        : 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
                    color: msg.sender === 'user' ? 'white' : 'black',
                    whiteSpace: 'pre-line',
                    boxShadow: 2,
                    position: 'relative',
                  }}
                >
                  <Typography variant="body1">{msg.text}</Typography>
                </Box>
              </ListItem>
            </motion.div>
          ))}
          {isBotTyping && (
            <ListItem sx={{ justifyContent: 'flex-start', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="primary" />
                <Typography variant="body2">Typing...</Typography>
              </Box>
            </ListItem>
          )}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      {/* Input Field */}
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={4}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
              borderRadius: 3,
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            },
          }}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={!input.trim()}
          sx={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
              transform: 'scale(1.05)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatBot;
