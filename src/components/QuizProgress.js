import { Box, LinearProgress, Typography } from '@mui/material';

const QuizProgress = ({ current, total }) => {
  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Typography variant="body1" gutterBottom>
        Question {current} of {total}
      </Typography>
      <LinearProgress 
        variant="determinate" 
        value={(current / total) * 100} 
        sx={{ height: 8, borderRadius: 4 }}
      />
    </Box>
  );
};

export default QuizProgress;