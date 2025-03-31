import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import QuizProgress from '../components/QuizProgress';
import { evaluateAnswers } from '../services/aiService';

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions } = location.state || {};
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [skipped, setSkipped] = useState([]);

  useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate('/');
    }
  }, [questions, navigate]);

  const handleSubmitAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const handleSkip = () => {
    const newSkipped = [...skipped, currentQuestionIndex];
    setSkipped(newSkipped);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const finishQuiz = async (userAnswers) => {
    try {
      // Calculate how many questions were actually answered (not skipped)
      const answeredQuestions = questions.filter((_, index) => 
        !skipped.includes(index) && userAnswers[index] !== undefined
      );
      
      // If all questions were skipped, redirect to learning with failed_all status
      if (answeredQuestions.length === 0) {
        navigate('/learning', { 
          state: { 
            status: 'failed_all',
            questions,
            results: questions.map(() => ({ correct: false, feedback: "Question was skipped" })),
            resources: getResourcesForFailure(questions)
          }
        });
        return;
      }
  
      // Evaluate only the answered questions
      const evaluationResults = await evaluateAnswers(
        questions.filter((_, index) => !skipped.includes(index)),
        userAnswers.filter((_, index) => !skipped.includes(index))
      );
  
      // Combine results with skipped questions marked as incorrect
      const combinedResults = questions.map((_, index) => {
        if (skipped.includes(index)) {
          return { correct: false, feedback: "Question was skipped" };
        }
        return evaluationResults.shift();
      });
  
      const passedCount = combinedResults.filter(r => r.correct).length;
      
      if (passedCount === 0) {
        navigate('/learning', { state: { 
          status: 'failed_all',
          questions,
          results: combinedResults,
          resources: getResourcesForFailure(questions)
        }});
      } else if (passedCount < questions.length) {
        navigate('/learning', { state: { 
          status: 'failed_some',
          questions,
          results: combinedResults,
          resources: getResourcesForPartial(questions, combinedResults)
        }});
      } else {
        navigate('/learning', { state: { 
          status: 'passed_all',
          questions,
          results: combinedResults
        }});
      }
    } catch (error) {
      console.error('Error evaluating answers:', error);
      navigate('/learning', { state: { 
        status: 'error',
        message: 'Could not evaluate your answers'
      }});
    }
  };

  const getResourcesForFailure = (questions) => {
    // Return fundamental resources based on question topics
    return [
      { title: 'Data Structures Fundamentals', url: 'https://example.com/ds-fundamentals' },
      { title: 'Algorithms 101', url: 'https://example.com/algo-101' }
    ];
  };

  const getResourcesForPartial = (questions, results) => {
    // Return resources for failed questions
    const failedTopics = questions
      .filter((_, index) => !results[index].correct)
      .map(q => q.tags[0]); // Assuming each question has tags
    
    return [
      { title: `${failedTopics[0]} Deep Dive`, url: `https://example.com/${failedTopics[0]}` },
      { title: 'Practice Problems', url: 'https://example.com/practice' }
    ];
  };

  if (!questions) return null;

  return (
    <div>
      <QuizProgress 
        current={currentQuestionIndex + 1} 
        total={questions.length} 
      />
      
      <QuestionCard
        question={questions[currentQuestionIndex]}
        index={currentQuestionIndex}
        onSkip={handleSkip}
        onSubmit={handleSubmitAnswer}
        isLast={currentQuestionIndex === questions.length - 1}
      />
    </div>
  );
};

export default QuizPage;