import { useState, useMemo } from 'react';
import { MoodEntry, POSITIVE_MOODS } from '../types';

interface GoodMoodCardsProps {
  moodEntries: MoodEntry[];
}

export default function GoodMoodCards({ moodEntries }: GoodMoodCardsProps) {
  const [selectedCard, setSelectedCard] = useState<MoodEntry | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const goodMoodEntries = useMemo(() => {
    return moodEntries.filter(entry => POSITIVE_MOODS.includes(entry.emoji as any));
  }, [moodEntries]);

  const shuffleCard = () => {
    if (goodMoodEntries.length === 0) return;

    setIsShuffling(true);
    setSelectedCard(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * goodMoodEntries.length);
      setSelectedCard(goodMoodEntries[randomIndex]);
      setIsShuffling(false);
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="container">
      <div className="cards-container">
        <div className="cute-card">
          <div className="header">
            <h2>Good Mood Cards</h2>
            <div className="pet-fortune-teller">🐱🔮</div>
            <p className="subtitle">
              Draw a card to remember your happy moments! 💕
            </p>
          </div>

          <div className="card-deck">
            <div className="deck-stack">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`card-back ${isShuffling ? 'shuffling' : ''}`}
                  style={{
                    transform: `translateX(${i * 2}px) translateY(${i * 2}px)`,
                    zIndex: 3 - i
                  }}
                >
                  🌟
                </div>
              ))}
            </div>

            <button
              onClick={shuffleCard}
              disabled={goodMoodEntries.length === 0 || isShuffling}
              className={`shuffle-btn ${isShuffling ? 'shuffling' : ''}`}
            >
              {isShuffling ? (
                <>
                  <span className="spinner">🔄</span>
                  Shuffling...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Draw a Card
                </>
              )}
            </button>
          </div>

          {goodMoodEntries.length === 0 && (
            <div className="no-cards">
              <div className="sad-pet">🐱💭</div>
              <p>No good mood entries yet!</p>
              <p>Track some happy moments first to unlock this feature! 🌈</p>
            </div>
          )}

          {selectedCard && (
            <div className="selected-card-container">
              <div className="fortune-card">
                <div className="card-header">
                  <span className="card-emoji">{selectedCard.emoji}</span>
                  <span className="card-date">{formatDate(selectedCard.date)}</span>
                </div>
                
                <div className="card-content">
                  <h3>Your Happy Memory</h3>
                  <p className="card-message">
                    {selectedCard.explanation || "You felt happy on this day! 😊"}
                  </p>
                </div>
                
                <div className="card-footer">
                  <p className="encouragement">
                    Remember: You've had beautiful days before, 
                    and you'll have them again! 💖
                  </p>
                </div>
              </div>
            </div>
          )}

          {goodMoodEntries.length > 0 && (
            <div className="stats">
              <p className="stats-text">
                You have <strong>{goodMoodEntries.length}</strong> happy moment{goodMoodEntries.length !== 1 ? 's' : ''} to draw from! 🎉
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .cards-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 0;
        }

        .header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .header h2 {
          color: #333;
          margin-bottom: 0.5rem;
          font-size: 1.8rem;
        }

        .pet-fortune-teller {
          font-size: 2.5rem;
          margin: 1rem 0;
          animation: float 3s ease-in-out infinite;
        }

        .subtitle {
          color: #666;
          font-size: 1.1rem;
          margin: 0;
        }

        .card-deck {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          margin: 2rem 0;
        }

        .deck-stack {
          position: relative;
          width: 120px;
          height: 160px;
        }

        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          color: white;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
        }

        .card-back.shuffling {
          animation: cardShuffle 1.5s ease-in-out;
        }

        .shuffle-btn {
          background: linear-gradient(45deg, #ff6b9d, #ff8e8e);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .shuffle-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
        }

        .shuffle-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }

        .shuffle-btn.shuffling {
          animation: pulse 1.5s ease-in-out;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        .no-cards {
          text-align: center;
          color: #666;
          margin: 2rem 0;
        }

        .sad-pet {
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: float 3s ease-in-out infinite;
        }

        .selected-card-container {
          margin-top: 2rem;
          animation: slideUp 0.5s ease-out;
        }

        .fortune-card {
          background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
          border: 3px solid #ff6b9d;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 10px 30px rgba(255, 107, 157, 0.2);
          text-align: center;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .card-emoji {
          font-size: 2.5rem;
        }

        .card-date {
          font-size: 0.9rem;
          color: #666;
          font-weight: 500;
        }

        .card-content h3 {
          color: #333;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .card-message {
          font-size: 1.1rem;
          color: #555;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .card-footer {
          border-top: 2px solid #ff6b9d;
          padding-top: 1rem;
        }

        .encouragement {
          color: #ff6b9d;
          font-weight: 600;
          font-size: 1rem;
          margin: 0;
          line-height: 1.4;
        }

        .stats {
          text-align: center;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #e1e5e9;
        }

        .stats-text {
          color: #666;
          font-size: 1rem;
          margin: 0;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes cardShuffle {
          0%, 100% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          25% {
            transform: translateX(-10px) translateY(-5px) rotate(-5deg);
          }
          50% {
            transform: translateX(5px) translateY(-10px) rotate(3deg);
          }
          75% {
            transform: translateX(-5px) translateY(-3px) rotate(-2deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 480px) {
          .header h2 {
            font-size: 1.5rem;
          }

          .pet-fortune-teller {
            font-size: 2rem;
          }

          .deck-stack {
            width: 100px;
            height: 140px;
          }

          .card-back {
            font-size: 2.5rem;
          }

          .shuffle-btn {
            font-size: 1rem;
            padding: 0.8rem 1.5rem;
          }

          .fortune-card {
            padding: 1rem;
          }

          .card-emoji {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}