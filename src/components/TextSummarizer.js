import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Paper, Slider } from '@mui/material';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

const TextSummarizer = () => {
  const [model, setModel] = useState(null);
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const [summaryLength, setSummaryLength] = useState(50); // percentage of original text

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

  const generateSummary = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      // Split text into sentences
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      
      // Get embeddings for each sentence
      const embeddings = await model.embed(sentences);
      const scores = await embeddings.array();
      
      // Calculate sentence importance scores
      const importanceScores = scores.map(sentenceEmbedding => {
        // Calculate cosine similarity with the first sentence (assuming it's the most important)
        const dotProduct = tf.dot(sentenceEmbedding, scores[0]);
        const magnitude1 = tf.norm(sentenceEmbedding);
        const magnitude2 = tf.norm(scores[0]);
        return dotProduct.div(magnitude1.mul(magnitude2)).arraySync();
      });

      // Sort sentences by importance
      const sentenceScores = sentences.map((sentence, index) => ({
        sentence,
        score: importanceScores[index]
      })).sort((a, b) => b.score - a.score);

      // Select top sentences based on summary length
      const numSentences = Math.max(1, Math.ceil(sentences.length * (summaryLength / 100)));
      const selectedSentences = sentenceScores.slice(0, numSentences)
        .sort((a, b) => sentences.indexOf(a.sentence) - sentences.indexOf(b.sentence));

      setSummary(selectedSentences.map(s => s.sentence.trim()).join('. ') + '.');
    } catch (error) {
      console.error('Error generating summary:', error);
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
        rows={6}
        variant="outlined"
        label="Enter text to summarize"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mb: 2 }}
      />
      
      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>Summary Length: {summaryLength}%</Typography>
        <Slider
          value={summaryLength}
          onChange={(_, value) => setSummaryLength(value)}
          min={10}
          max={100}
          valueLabelDisplay="auto"
        />
      </Box>

      <Button
        variant="contained"
        onClick={generateSummary}
        disabled={loading || !text.trim()}
        sx={{ mb: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Generate Summary'}
      </Button>
      
      {summary && (
        <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" gutterBottom>Summary:</Typography>
          <Typography>{summary}</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default TextSummarizer; 