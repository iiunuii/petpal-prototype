import { useState, useEffect } from 'react';
import Instructions from './pages/Instructions';
import Welcome from './pages/Welcome';
import MoodTracker from './pages/MoodTracker';
import Calendar from './pages/Calendar';
import GoodMoodCards from './pages/GoodMoodCards';
import Navigation from './components/Navigation';
import { MoodEntry } from './types';
import { generateMockData } from './utils/mockData';

function App() {
  const [showInstructions, setShowInstructions] = useState(() => {
    // Check if user has seen instructions before
    return !localStorage.getItem('petpal-instructions-seen');
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('mood');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(() => {
    // Initialize state with data from localStorage only
    const savedEntries = localStorage.getItem('petpal-mood-entries');
    if (savedEntries) {
      try {
        const parsed = JSON.parse(savedEntries);
        console.log('Loaded entries from localStorage:', parsed.length);
        return parsed;
      } catch (error) {
        console.error('Error loading saved mood entries:', error);
      }
    }
    // Start with empty array, mock data will be added on login
    return [];
  });

  // Save mood entries whenever they change
  useEffect(() => {
    if (moodEntries.length > 0) {
      localStorage.setItem('petpal-mood-entries', JSON.stringify(moodEntries));
    }
  }, [moodEntries]);

  const handleLogin = () => {
    // Generate mock data on first login if no entries exist
    if (moodEntries.length === 0) {
      const mockData = generateMockData();
      setMoodEntries(mockData);
      console.log('Generated mock data on login:', mockData.length, 'entries');
    }
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

  const handleContinueFromInstructions = () => {
    localStorage.setItem('petpal-instructions-seen', 'true');
    setShowInstructions(false);
  };

  if (showInstructions) {
    return <Instructions onContinue={handleContinueFromInstructions} />;
  }

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