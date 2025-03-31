import { Typography, Box, Paper, Grid, Button } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
  // Mock data - in a real app, this would come from backend
  const progressData = [
    { name: 'Easy', Correct: 12, Incorrect: 3 },
    { name: 'Medium', Correct: 8, Incorrect: 7 },
    { name: 'Hard', Correct: 3, Incorrect: 9 },
  ];

  const recentAttempts = [
    { date: '2023-05-01', difficulty: 'Medium', correct: 2, total: 3 },
    { date: '2023-04-28', difficulty: 'Easy', correct: 3, total: 3 },
    { date: '2023-04-25', difficulty: 'Hard', correct: 1, total: 3 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Progress Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Performance by Difficulty
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Correct" fill="#4CAF50" />
                <Bar dataKey="Incorrect" fill="#F44336" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Attempts
            </Typography>
            <Box>
              {recentAttempts.map((attempt, index) => (
                <Box key={index} sx={{ mb: 2, p: 1, borderBottom: '1px solid #eee' }}>
                  <Typography>
                    <strong>{attempt.date}</strong> - {attempt.difficulty}: 
                    {attempt.correct}/{attempt.total} correct
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {attempt.correct === attempt.total ? 'Excellent!' : 
                     attempt.correct > 0 ? 'Good effort!' : 'Keep practicing!'}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button 
          variant="contained" 
          size="large"
          href="/"
        >
          Start New Quiz
        </Button>
      </Box>
    </Box>
  );
};

export default DashboardPage;