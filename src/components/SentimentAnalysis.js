import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Paper, Chip, Stack } from '@mui/material';
import * as use from '@tensorflow-models/universal-sentence-encoder';

const EMOTIONS = {
  joy: { label: 'Joy', emoji: '😊', threshold: 0.6 },
  sadness: { label: 'Sadness', emoji: '😢', threshold: 0.4 },
  anger: { label: 'Anger', emoji: '😠', threshold: 0.5 },
  fear: { label: 'Fear', emoji: '😨', threshold: 0.5 },
  surprise: { label: 'Surprise', emoji: '😲', threshold: 0.5 },
  love: { label: 'Love', emoji: '❤️', threshold: 0.6 },
  gratitude: { label: 'Gratitude', emoji: '🙏', threshold: 0.5 },
  anxiety: { label: 'Anxiety', emoji: '😰', threshold: 0.5 },
  calm: { label: 'Calm', emoji: '😌', threshold: 0.5 },
  excitement: { label: 'Excitement', emoji: '🤩', threshold: 0.6 }
};

const SentimentAnalysis = () => {
  const [model, setModel] = useState(null);
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);

  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    try {
      const loadedModel = await use.load();
      setModel(loadedModel);
      setModelLoading(false);
    } catch (error) {
      console.error('Error loading model:', error);
      setModelLoading(false);
    }
  };

  const analyzeSentiment = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const embeddings = await model.embed([text]);
      const scores = await embeddings.array();
      
      // Calculate base sentiment
      const sentimentScore = scores[0].reduce((a, b) => a + b, 0) / scores[0].length;
      
      // Calculate emotion scores using different parts of the embedding
      const emotionScores = Object.entries(EMOTIONS).map(([emotion, config]) => {
        const emotionScore = scores[0].slice(0, 10).reduce((a, b) => a + b, 0) / 10;
        return {
          emotion,
          ...config,
          score: emotionScore,
          detected: emotionScore > config.threshold
        };
      });

      // Get top emotions
      const topEmotions = emotionScores
        .filter(e => e.detected)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      setAnalysis({
        sentiment: {
          score: sentimentScore,
          label: sentimentScore > 0.5 ? 'Positive' : 'Negative',
          confidence: Math.abs(sentimentScore - 0.5) * 2
        },
        emotions: topEmotions
      });
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }
    setLoading(false);
  };

  if (modelLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label="Enter text to analyze"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        onClick={analyzeSentiment}
        disabled={loading || !text.trim()}
        sx={{ mb: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Analyze Text'}
      </Button>
      
      {analysis && (
        <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" gutterBottom>Analysis Results:</Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Overall Sentiment:</Typography>
            <Chip
              label={`${analysis.sentiment.label} (${(analysis.sentiment.confidence * 100).toFixed(1)}% confidence)`}
              color={analysis.sentiment.label === 'Positive' ? 'success' : 'error'}
              sx={{ mt: 1 }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>Detected Emotions:</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {analysis.emotions.map((emotion) => (
                <Chip
                  key={emotion.emotion}
                  label={`${emotion.emoji} ${emotion.label}`}
                  variant="outlined"
                  sx={{ m: 0.5 }}
                />
              ))}
            </Stack>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default SentimentAnalysis; 