import React, { useState } from 'react';
import { AudioInputPage } from './components/AudioInputPage';
import { ProgressPage } from './components/ProgressPage';
import { ComicStripPage } from './components/ComicStripPage';

type AppPage = 'audio' | 'progress' | 'comic';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('audio');
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const handleQuestionSubmit = (question: string) => {
    setSelectedTopic(question);
    setCurrentPage('progress');
  };

  const handleProgressComplete = () => {
    setCurrentPage('comic');
  };

  const handleBackToStart = () => {
    setCurrentPage('audio');
    setSelectedTopic('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {currentPage === 'audio' && (
        <AudioInputPage onQuestionSubmit={handleQuestionSubmit} />
      )}
      {currentPage === 'progress' && (
        <ProgressPage 
          topic={selectedTopic}
          onComplete={handleProgressComplete}
        />
      )}
      {currentPage === 'comic' && (
        <ComicStripPage 
          topic={selectedTopic}
          onBackToStart={handleBackToStart}
        />
      )}
    </div>
  );
}