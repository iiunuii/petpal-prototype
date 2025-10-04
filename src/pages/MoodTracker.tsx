import { useState } from 'react';
import { MOOD_EMOJIS, MoodEmoji, MoodEntry } from '../types';

interface MoodTrackerProps {
  onMoodSaved: (entry: MoodEntry) => void;
}

export default function MoodTracker({ onMoodSaved }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<MoodEmoji | null>(null);
  const [explanation, setExplanation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    setIsSubmitting(true);

    const entry: MoodEntry = {
      id: Date.now().toString(),
      userId: 'user1', // This would come from auth context
      emoji: selectedMood,
      explanation,
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
    };

    // Simulate API call
    setTimeout(() => {
      onMoodSaved(entry);
      setSelectedMood(null);
      setExplanation('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="mood-tracker">
        <div className="cute-card">
          <div className="header">
            <h2>How are you feeling today?</h2>
            <div className="pet-companion">🐱💭</div>
          </div>

          <form onSubmit={handleSubmit} className="mood-form">
            <div className="mood-selection">
              <p className="mood-prompt">Pick your mood:</p>
              <div className="emoji-grid">
                {MOOD_EMOJIS.map(({ emoji, label }) => (
                  <button
                    key={emoji}
                    type="button"
                    className={`emoji-btn ${selectedMood === emoji ? 'selected' : ''}`}
                    onClick={() => setSelectedMood(emoji)}
                    title={label}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              {selectedMood && (
                <p className="selected-mood">
                  You selected: {selectedMood} {MOOD_EMOJIS.find(m => m.emoji === selectedMood)?.label}
                </p>
              )}
            </div>

            <div className="explanation-section">
              <label htmlFor="explanation" className="explanation-label">
                What's happening today? 📝
              </label>
              <textarea
                id="explanation"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Tell me about your day... (optional)"
                className="explanation-input"
                rows={4}
              />
            </div>

            <button
              type="submit"
              disabled={!selectedMood || isSubmitting}
              className={`btn-primary submit-btn ${!selectedMood ? 'disabled' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner">⏳</span>
                  Saving...
                </>
              ) : (
                <>
                  <span>💾</span>
                  Save My Mood
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .mood-tracker {
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

        .pet-companion {
          font-size: 2rem;
          animation: float 3s ease-in-out infinite;
        }

        .mood-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .mood-selection {
          text-align: center;
        }

        .mood-prompt {
          font-size: 1.2rem;
          color: #555;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .emoji-grid {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .selected-mood {
          color: #ff6b9d;
          font-weight: 600;
          font-size: 1.1rem;
          animation: fadeIn 0.5s ease-in;
        }

        .explanation-section {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .explanation-label {
          font-size: 1.1rem;
          color: #555;
          font-weight: 500;
        }

        .explanation-input {
          padding: 1rem;
          border: 2px solid #e1e5e9;
          border-radius: 15px;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          transition: border-color 0.3s ease;
        }

        .explanation-input:focus {
          outline: none;
          border-color: #ff6b9d;
          box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
        }

        .explanation-input::placeholder {
          color: #999;
        }

        .submit-btn {
          align-self: center;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          padding: 1rem 2rem;
          margin-top: 1rem;
        }

        .submit-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: 0 4px 15px rgba(255, 107, 157, 0.2) !important;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
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

          .emoji-grid {
            gap: 0.3rem;
          }

          .submit-btn {
            font-size: 1rem;
            padding: 0.8rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}