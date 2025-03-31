import { useState } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import HintModal from './HintModal';

const QuestionCard = ({ question, index, onSkip, onSubmit, isLast }) => {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hintLevel, setHintLevel] = useState(1);

  const handleSubmit = () => {
    onSubmit(answer);
    setAnswer('');
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Question {index + 1}: {question.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {question.description}
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Your Answer:</Typography>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            style={{ width: '100%', minHeight: '100px', padding: '8px' }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button 
            variant="outlined" 
            color="info"
            onClick={() => setShowHint(true)}
          >
            Get Hint
          </Button>
          
          <Box>
            {!isLast && (
              <Button 
                variant="outlined" 
                color="secondary"
                onClick={onSkip}
                sx={{ mr: 2 }}
              >
                Skip
              </Button>
            )}
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleSubmit}
            >
              {isLast ? 'Submit All' : 'Submit'}
            </Button>
          </Box>
        </Box>
      </CardContent>
      
      <HintModal
        open={showHint}
        onClose={() => setShowHint(false)}
        hintLevel={hintLevel}
        setHintLevel={setHintLevel}
        questionId={question.id}
      />
    </Card>
  );
};

export default QuestionCard;