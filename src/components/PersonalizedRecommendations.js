import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, Card, CardContent, CardActions, Button, Chip, Stack } from '@mui/material';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

const RECOMMENDATION_TYPES = {
  journalPrompts: {
    title: 'Journal Prompts',
    icon: '📝',
    items: [
      "What made you smile today?",
      "Describe a moment of joy you experienced recently.",
      "What are you grateful for right now?",
      "Write about a challenge you overcame.",
      "What are your dreams for the future?",
      "Describe a person who inspires you.",
      "What does self-care mean to you?",
      "Write about a lesson you learned recently.",
      "What are your strengths?",
      "Describe a peaceful moment you experienced."
    ]
  },
  exercises: {
    title: 'Mindfulness Exercises',
    icon: '🧘',
    items: [
      "5-minute breathing meditation",
      "Body scan relaxation",
      "Mindful walking practice",
      "Gratitude meditation",
      "Loving-kindness meditation",
      "Mindful eating exercise",
      "Progressive muscle relaxation",
      "Mindful listening practice",
      "Nature observation meditation",
      "Mindful stretching routine"
    ]
  },
  activities: {
    title: 'Wellness Activities',
    icon: '✨',
    items: [
      "Take a nature walk",
      "Practice yoga",
      "Listen to calming music",
      "Create art or craft",
      "Read a book",
      "Write poetry",
      "Cook a healthy meal",
      "Do some gardening",
      "Take photos of beautiful things",
      "Practice deep breathing"
    ]
  }
};

const PersonalizedRecommendations = () => {
  const [model, setModel] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);

  useEffect(() => {
    loadModel();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadModel = async () => {
    try {
      const loadedModel = await use.load();
      setModel(loadedModel);
      setModelLoading(false);
      generateRecommendations(loadedModel);
    } catch (error) {
      console.error('Error loading model:', error);
      setModelLoading(false);
    }
  };

  const generateRecommendations = async (loadedModel) => {
    setLoading(true);
    try {
      // Get user's recent journal entries from localStorage
      const recentEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
      const lastEntry = recentEntries[recentEntries.length - 1] || '';

      // Get embeddings for the last entry and all recommendations
      const allItems = Object.values(RECOMMENDATION_TYPES).flatMap(type => type.items);
      const embeddings = await loadedModel.embed([lastEntry, ...allItems]);
      const scores = await embeddings.array();

      // Calculate similarity scores
      const userEmbedding = scores[0];
      const itemScores = scores.slice(1).map((itemEmbedding, index) => ({
        item: allItems[index],
        score: tf.dot(userEmbedding, itemEmbedding).arraySync()
      }));

      // Sort and get top recommendations for each category
      const sortedScores = itemScores.sort((a, b) => b.score - a.score);
      
      const recommendations = Object.entries(RECOMMENDATION_TYPES).map(([key, type]) => {
        const categoryItems = type.items;
        const topItems = sortedScores
          .filter(score => categoryItems.includes(score.item))
          .slice(0, 3)
          .map(score => score.item);
        
        return {
          type: key,
          title: type.title,
          icon: type.icon,
          items: topItems
        };
      });

      setRecommendations(recommendations);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    }
    setLoading(false);
  };

  if (modelLoading || loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Personalized Recommendations
      </Typography>
      
      <Stack spacing={2}>
        {recommendations?.map((category) => (
          <Card key={category.type} elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ mr: 1 }}>
                  {category.icon} {category.title}
                </Typography>
              </Box>
              
              <Stack spacing={1}>
                {category.items.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    variant="outlined"
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Stack>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => generateRecommendations(model)}>
                Refresh Recommendations
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default PersonalizedRecommendations; 