import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface LessonProps {
  onComplete: () => void;
}

const Lesson: React.FC<LessonProps> = ({ onComplete }) => {
  const { lessonId } = useParams(); 
  const [completedQuestions, setCompletedQuestions] = useState(0);


  const questions = getQuestionsForLesson(lessonId);

  const handleCompleteQuestion = () => {
    if (completedQuestions < questions.length) {
      setCompletedQuestions(completedQuestions + 1);
    }
  };

  useEffect(() => {
    if (completedQuestions === questions.length) {
      onComplete(); 
    }
  }, [completedQuestions, questions.length, onComplete]);

  return (
    <div className="bg-gray-800 text-white p-6 min-h-screen">
      <h2 className="text-4xl font-semibold mb-6">{`Lesson ${lessonId}: ${questions[0]?.text}`}</h2>
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
            <p>{question.text}</p>
            <input
              type="text"
              className="border p-2 w-full mt-2"
              placeholder="Your answer"
            />
            <button
              onClick={handleCompleteQuestion}
              className="bg-green-600 px-4 py-2 mt-2 rounded-full text-white hover:bg-green-500 transition duration-300"
            >
              Complete Question
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const getQuestionsForLesson = (lessonId: string | undefined) => {
  const lessonsData = {
    '1': [
      { id: 1, text: 'What is TON?' },
      { id: 2, text: 'Explain how TON blockchain works.' },
      { id: 3, text: 'What is the role of validators in TON?' },
    ],
    '2': [
      { id: 1, text: 'What is Solidity?' },
      { id: 2, text: 'What is the Ethereum Virtual Machine (EVM)?' },
      { id: 3, text: 'Explain gas fees in Ethereum.' },
    ],
    '3': [
      { id: 1, text: 'What is an ERC-721 token?' },
      { id: 2, text: 'Explain the concept of non-fungible tokens.' },
      { id: 3, text: 'How do NFTs differ from cryptocurrencies?' },
    ],
    
  };

  return lessonsData[lessonId || '1']; 
};

export default Lesson;
