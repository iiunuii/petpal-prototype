import { useState, useEffect } from 'react';
import Welcome from './pages/Welcome';
import MoodTracker from './pages/MoodTracker';
import Calendar from './pages/Calendar';
import GoodMoodCards from './pages/GoodMoodCards';
import Navigation from './components/Navigation';
import { MoodEntry } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('mood');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  // Load saved mood entries on app start
  useEffect(() => {
    const savedEntries = localStorage.getItem('petpal-mood-entries');
    if (savedEntries) {
      try {
        setMoodEntries(JSON.parse(savedEntries));
      } catch (error) {
        console.error('Error loading saved mood entries:', error);
      }
    }
  }, []);

  // Save mood entries whenever they change
  useEffect(() => {
    localStorage.setItem('petpal-mood-entries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleMoodSaved = (entry: MoodEntry) => {
    setMoodEntries(prev => {
      // Remove any existing entry for the same date and add the new one
      const filtered = prev.filter(e => e.date !== entry.date);
      return [...filtered, entry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  if (!isLoggedIn) {
    return <Welcome onLogin={handleLogin} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'mood':
        return <MoodTracker onMoodSaved={handleMoodSaved} />;
      case 'calendar':
        return <Calendar moodEntries={moodEntries} />;
      case 'cards':
        return <GoodMoodCards moodEntries={moodEntries} />;
      default:
        return <MoodTracker onMoodSaved={handleMoodSaved} />;
    }
  };

  return (
    <div className="app">
      <main className="main-content">
        {renderCurrentPage()}
      </main>
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      <style jsx>{`
        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
          padding-bottom: 80px; /* Space for bottom navigation */
        }

        @media (min-width: 768px) {
          .main-content {
            padding-bottom: 100px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;