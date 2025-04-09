import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const GratitudeJournal = () => {
  const theme = useTheme();
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem('gratitudeEntries');
    return savedEntries ? JSON.parse(savedEntries) : Array(5).fill('');
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    localStorage.setItem('gratitudeEntries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = () => {
    if (newEntry.trim() && editingIndex !== null) {
      const updated = [...entries];
      updated[editingIndex] = newEntry.trim();
      setEntries(updated);
      setNewEntry('');
      setEditingIndex(null);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewEntry(entries[index]);
  };

  const handleDelete = (index) => {
    const updated = [...entries];
    updated[index] = '';
    setEntries(updated);
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
        Gratitude Journal
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Write down 5 things you're grateful for today.
      </Typography>

      {editingIndex !== null && (
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="What are you grateful for?"
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" onClick={handleAddEntry} disabled={!newEntry.trim()}>
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setEditingIndex(null);
                setNewEntry('');
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}

      <List>
        {entries.map((entry, index) => (
          <ListItem
            key={index}
            sx={{
              mb: 1,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              bgcolor: theme.palette.background.default,
            }}
          >
            <ListItemText
              primary={`Entry ${index + 1}`}
              secondary={entry || 'Click edit to add an entry'}
              primaryTypographyProps={{ fontWeight: entry ? 'bold' : 'normal' }}
            />
            <Box>
              <span>
                <IconButton
                  size="small"
                  onClick={() => handleEdit(index)}
                  disabled={editingIndex !== null}
                >
                  <EditIcon />
                </IconButton>
              </span>
              <span>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(index)}
                  disabled={editingIndex !== null || !entry}
                >
                  <DeleteIcon />
                </IconButton>
              </span>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default GratitudeJournal;
