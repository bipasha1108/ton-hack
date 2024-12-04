import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface LessonProps {
  onComplete: () => void;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

const Lesson: React.FC<LessonProps> = ({ onComplete }) => {
  const { lessonId } = useParams();
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isCorrect, setIsCorrect] = useState<{ [key: number]: boolean }>({});

  const questions = getQuestionsForLesson(lessonId);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    if (answer === questions.find((q) => q.id === questionId)?.correctAnswer) {
      setIsCorrect((prev) => ({ ...prev, [questionId]: true }));
    } else {
      setIsCorrect((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  const handleCompleteQuestion = (questionId: number) => {
    if (answers[questionId]) {
      setCompletedQuestions((prev) => prev + 1);
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
        {questions.map((question) => (
          <div key={question.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
            <p>{question.text}</p>
            <div className="space-y-2 mt-4">
              {question.options.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="radio"
                    id={`${question.id}-${option}`}
                    name={`question-${question.id}`}
                    value={option}
                    onChange={() => handleAnswer(question.id, option)}
                    className="mr-2"
                  />
                  <label htmlFor={`${question.id}-${option}`} className="cursor-pointer">
                    {option}
                  </label>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleCompleteQuestion(question.id)}
              className="bg-green-600 px-4 py-2 mt-2 rounded-full text-white hover:bg-green-500 transition duration-300"
            >
              Complete Question
            </button>
            {isCorrect[question.id] !== undefined && (
              <p className={`mt-2 ${isCorrect[question.id] ? 'text-green-500' : 'text-red-500'}`}>
                {isCorrect[question.id] ? 'Correct!' : 'Incorrect. Try again.'}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const getQuestionsForLesson = (lessonId: string | undefined) => {
  const lessonsData = {
    '1': [
      {
        id: 1,
        text: 'What is TON?',
        options: ['The Open Network', 'Telegram Online Network', 'Total Open Node', 'Transparent Operations Network'],
        correctAnswer: 'The Open Network',
      },
      {
        id: 2,
        text: 'Which cryptocurrency powers the TON Blockchain?',
        options: [
          'TonCoin',
          'TelegramCoin',
          'TetherUSD',
          'Ether'
        ],
        correctAnswer: 'TonCoin',
      },
      {
        id: 3,
        text: 'What is a unique characteristic of the TON Blockchain?',
        options: [
          'Uses Proof-of-Stake for consensus',
          'Only supports non-custodial wallets',
          'Requires a centralized validator system',
          'Has fixed transaction fees'
        ],
        correctAnswer: 'Uses Proof-of-Stake for consensus',
      },
      {
        id: 4,
        text: 'What is the primary difference between TON mainnet and testnet?',
        options: [
          'Testnet supports only NFTs while mainnet supports tokens',
          'Testnet is slower and less secure than mainnet',
          'Mainnet uses real funds while testnet uses free tokens',
          'Mainnet is free while testnet requires a fee'
        ],
        correctAnswer: 'Mainnet uses real funds while testnet uses free tokens',
      },
      {
        id: 5,
        text: 'Which of the following is a feature of TON wallets?',
        options: [
          'Wallets must be custodial',
          'They store cryptocurrencies other than TON',
          'They enable smart contract interactions',
          'They require no private keys'
        ],
        correctAnswer: 'They enable smart contract interactions',
      },
      {
        id: 6,
        text: 'What is the primary purpose of the TVM (TON Virtual Machine)?',
        options: [
          'To execute smart contracts on the TON Blockchain',
          'To enable cross-chain communication with Ethereum',
          'To validate Bitcoin transactions',
          'To mine new TON coins'
        ],
        correctAnswer: 'To execute smart contracts on the TON Blockchain',
      },
      {
        id: 7,
        text: 'Which flag does a TON user-friendly address NOT include?',
        options: [
          'Bounceable',
          'Testnet-only',
          'Non-bounceable',
          'Gas-exempt'
        ],
        correctAnswer: 'Gas-exempt',
      },
      {
        id: 8,
        text: 'What is the significance of Jettons in TON?',
        options: [
          'They are TON equivalent of ERC-20 tokens on Ethereum',
          'They are used for staking validation',
          'They are specific to custodial wallets',
          'They are restricted to testnet usage'
        ],
        correctAnswer: 'They are TON equivalent of ERC-20 tokens on Ethereum',
      },
      {
        id: 9,
        text: 'Which tool can be used to integrate TON wallets with dApps?',
        options: [
          'TON SDK',
          'TON Connect',
          'Jetton Manager',
          'TON Wallet CLI'
        ],
        correctAnswer: 'TON Connect',
      },
      {
        id: 10,
        text: 'What is an SBT in the TON ecosystem?',
        options: [
          'A unique smart contract type for consensus',
          'A Semi-Bonded Token for staking rewards',
          'A Soulbound Token for non-transferable achievements',
          'A Secure Blockchain Transaction type'
        ],
        correctAnswer: 'A Soulbound Token for non-transferable achievements',
      },
    ],
  };

  return lessonsData[lessonId || '1'];
};

export default Lesson;
