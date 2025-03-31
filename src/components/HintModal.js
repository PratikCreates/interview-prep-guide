import { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Stepper, Step, StepLabel } from '@mui/material';
import { getAIHint } from '../services/aiService';

const HintModal = ({ open, onClose, hintLevel, setHintLevel, questionId }) => {
  const [hint, setHint] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      const fetchHint = async () => {
        setLoading(true);
        try {
          const hintData = await getAIHint(questionId, hintLevel);
          setHint(hintData);
        } catch (error) {
          console.error('Error fetching hint:', error);
          setHint('Failed to load hint. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      
      fetchHint();
    }
  }, [open, hintLevel, questionId]); // Added questionId to dependencies

  const fetchHint = async () => {
    setLoading(true);
    try {
      const hintData = await getAIHint(questionId, hintLevel);
      setHint(hintData);
    } catch (error) {
      console.error('Error fetching hint:', error);
      setHint('Failed to load hint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '600px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2
      }}>
        <Typography variant="h6" gutterBottom>
          Hint (Level {hintLevel})
        </Typography>
        
        <Stepper activeStep={hintLevel - 1} sx={{ mb: 3 }}>
          <Step><StepLabel>Approach</StepLabel></Step>
          <Step><StepLabel>Solution</StepLabel></Step>
          <Step><StepLabel>Code</StepLabel></Step>
        </Stepper>
        
        {loading ? (
          <Typography>Loading hint...</Typography>
        ) : (
          <Typography paragraph>{hint}</Typography>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button 
            disabled={hintLevel <= 1}
            onClick={() => setHintLevel(hintLevel - 1)}
          >
            Previous Level
          </Button>
          
          <Button 
            disabled={hintLevel >= 3}
            onClick={() => setHintLevel(hintLevel + 1)}
          >
            Next Level
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default HintModal;