import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import ResourceList from '../components/ResourceList';

const LearningPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { status, questions, results, resources } = location.state || {};

  const handleContinue = () => {
    if (status === 'passed_all') {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {status === 'passed_all' ? 'Congratulations!' : 
         status === 'failed_some' ? 'Good Effort!' : 'Let\'s Improve!'}
      </Typography>
      
      {status === 'passed_all' && (
        <Typography paragraph>
          You passed all questions! You're ready to take on more challenges.
        </Typography>
      )}
      
      {status === 'failed_some' && (
        <>
          <Typography paragraph>
            You passed some questions but there's room for improvement. Here are resources to help:
          </Typography>
          <ResourceList resources={resources} />
          
          <Typography variant="h6" sx={{ mt: 3 }}>
            Questions to Review:
          </Typography>
          <List>
            {questions.map((q, index) => (
              !results[index].correct && (
                <ListItem key={index}>
                  <ListItemText 
                    primary={q.title} 
                    secondary={`Suggested study: ${q.tags.join(', ')}`} 
                  />
                </ListItem>
              )
            ))}
          </List>
        </>
      )}
      
      {status === 'failed_all' && (
        <>
          <Typography paragraph>
            These resources will help you build the fundamentals:
          </Typography>
          <ResourceList resources={resources} />
          
          <Typography variant="h6" sx={{ mt: 3 }}>
            All Questions:
          </Typography>
          <List>
            {questions.map((q, index) => (
              <ListItem key={index}>
                <ListItemText 
                  primary={q.title} 
                  secondary={`Topic: ${q.tags.join(', ')}`} 
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
      
      <Divider sx={{ my: 3 }} />
      
      <Button 
        variant="contained" 
        size="large"
        onClick={handleContinue}
      >
        {status === 'passed_all' ? 'Go to Dashboard' : 'Try Again'}
      </Button>
    </Box>
  );
};

export default LearningPage;