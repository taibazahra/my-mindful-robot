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
  Tooltip,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const GratitudeJournal = () => {
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
      const updatedEntries = [...entries];
      updatedEntries[editingIndex] = newEntry.trim();
      setEntries(updatedEntries);
      setNewEntry('');
      setEditingIndex(null);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewEntry(entries[index]);
  };

  const handleDelete = (index) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = '';
    setEntries(updatedEntries);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🌞 Gratitude Journal
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Reflect and write down 5 things you're grateful for today 💛
      </Typography>

      {editingIndex !== null && (
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="What are you grateful for?"
            variant="outlined"
            sx={{
              mb: 2,
              backgroundColor: 'white',
              borderRadius: 2,
            }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddEntry}
              disabled={!newEntry.trim()}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
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
          <Box key={index}>
            <ListItem
              sx={{
                mb: 1.5,
                borderRadius: 2,
                backgroundColor: entry ? '#FFF8E1' : '#FFF',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                px: 2,
                py: 1.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color={entry ? 'text.primary' : 'text.disabled'}
                  >
                    {`Entry ${index + 1}`}
                  </Typography>
                }
                secondary={
                  entry ? (
                    <Typography variant="body2" color="text.secondary">
                      {entry}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.disabled"
                      fontStyle="italic"
                    >
                      Click edit to add an entry
                    </Typography>
                  )
                }
              />

              <Box>
                <Tooltip title="Edit Entry">
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(index)}
                    disabled={editingIndex !== null}
                    sx={{
                      color: 'primary.main',
                      '&:hover': { backgroundColor: '#e3f2fd' },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Clear Entry">
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(index)}
                    disabled={editingIndex !== null || !entry}
                    sx={{
                      color: 'error.main',
                      '&:hover': { backgroundColor: '#ffebee' },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItem>
            {index < entries.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Paper>
  );
};

export default GratitudeJournal;
