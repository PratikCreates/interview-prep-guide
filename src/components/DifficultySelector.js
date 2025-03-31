import { Button, Box, Typography } from '@mui/material';

const DifficultySelector = ({ onSelectDifficulty }) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Select Difficulty Level
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
        <Button 
          variant="contained" 
          color="success" 
          size="large"
          onClick={() => onSelectDifficulty('easy')}
        >
          Easy
        </Button>
        <Button 
          variant="contained" 
          color="warning" 
          size="large"
          onClick={() => onSelectDifficulty('medium')}
        >
          Medium
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          size="large"
          onClick={() => onSelectDifficulty('hard')}
        >
          Hard
        </Button>
      </Box>
    </Box>
  );
};

export default DifficultySelector;