import axios from 'axios';

// Mock function - in a real app, you would call LeetCode's API or your backend
export const fetchLeetCodeQuestions = async (difficulty) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data - replace with actual API calls
  const questionsByDifficulty = {
    easy: [
      {
        id: '1',
        title: 'Two Sum',
        description: 'Given an array of integers, return indices of the two numbers that add up to a target.',
        tags: ['Array', 'Hash Table'],
        difficulty: 'Easy'
      },
      {
        id: '2',
        title: 'Palindrome Number',
        description: 'Determine whether an integer is a palindrome.',
        tags: ['Math'],
        difficulty: 'Easy'
      },
      {
        id: '3',
        title: 'Roman to Integer',
        description: 'Convert a Roman numeral to an integer.',
        tags: ['Hash Table', 'Math'],
        difficulty: 'Easy'
      }
    ],
    medium: [
      {
        id: '4',
        title: 'Add Two Numbers',
        description: 'You are given two non-empty linked lists representing two non-negative integers...',
        tags: ['Linked List', 'Math'],
        difficulty: 'Medium'
      },
      {
        id: '5',
        title: 'Longest Substring Without Repeating Characters',
        description: 'Given a string, find the length of the longest substring without repeating characters.',
        tags: ['Hash Table', 'String'],
        difficulty: 'Medium'
      },
      {
        id: '6',
        title: 'Container With Most Water',
        description: 'Find two lines that together with the x-axis form a container that contains the most water.',
        tags: ['Array', 'Two Pointers'],
        difficulty: 'Medium'
      }
    ],
    hard: [
      {
        id: '7',
        title: 'Median of Two Sorted Arrays',
        description: 'Find the median of the two sorted arrays.',
        tags: ['Array', 'Binary Search'],
        difficulty: 'Hard'
      },
      {
        id: '8',
        title: 'Regular Expression Matching',
        description: 'Implement regular expression matching with support for "." and "*".',
        tags: ['String', 'Dynamic Programming'],
        difficulty: 'Hard'
      },
      {
        id: '9',
        title: 'Merge k Sorted Lists',
        description: 'Merge k sorted linked lists and return it as one sorted list.',
        tags: ['Linked List', 'Heap'],
        difficulty: 'Hard'
      }
    ]
  };
  
  return questionsByDifficulty[difficulty.toLowerCase()] || [];
};