import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import Lesson from './components/Lesson.tsx';
import Dashboard from './components/Dashboard.tsx';
import HeroPage from './components/HeroPage.tsx';

const App: React.FC = () => {
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [nftRewards, setNftRewards] = useState<string[]>([]);

  const handleCompleteLesson = () => {
    setProgress(progress + 50); 
    if (progress + 50 >= 100) {
      setLevel(level + 1);
      setProgress(0);
      setNftRewards([...nftRewards, 'https://via.placeholder.com/150']); 
    }
  };

  return (
    <Router>
      <Header  />
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/lesson/:lessonId" element={<Lesson onComplete={handleCompleteLesson} />} />
        <Route path="/dashboard" element={<Dashboard nftRewards={nftRewards} />} />
        
      </Routes>
    </Router>
  );
};

export default App;
