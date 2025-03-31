// Mock AI service functions
export const getAIHint = async (questionId, hintLevel) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const hints = {
      1: "Try using a hash table to store the numbers you've seen so far.",
      2: "Consider converting the number to a string to check for palindrome properties.",
      3: "Create a mapping of Roman numerals to their integer values and process from left to right."
    };
    
    return hints[questionId] || "Think about the problem constraints and possible data structures.";
  };
  
  export const evaluateAnswers = async (questions, answers) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock evaluation - in a real app, this would call an AI service
    return questions.map((_, index) => {
      const answer = answers[index];
      
      // If answer is empty or undefined, count as incorrect
      if (!answer || answer.trim() === '') {
        return {
          correct: false,
          feedback: "No answer provided. Please attempt the question."
        };
      }
      
      // Otherwise, use random evaluation for demo purposes
      return {
        correct: Math.random() > 0.3, // 70% chance of being correct for demo
        feedback: answer.length > 10 ? 
          "Good attempt! Here's how you can improve..." : 
          "Your answer was too brief. Try to explain your approach more thoroughly."
      };
    });
  };