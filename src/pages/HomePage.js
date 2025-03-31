import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DifficultySelector from '../components/DifficultySelector';
import { fetchLeetCodeQuestions } from '../services/leetcodeService';

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSelectDifficulty = async (difficulty) => {
    setLoading(true);
    try {
      const questions = await fetchLeetCodeQuestions(difficulty);
      navigate('/quiz', { state: { questions } });
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Failed to fetch questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Interview Preparation Guide</h1>
      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />
      )}
    </div>
  );
};

export default HomePage;