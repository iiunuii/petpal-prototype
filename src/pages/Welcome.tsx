import { useState } from 'react';

interface WelcomeProps {
  onLogin: () => void;
}

export default function Welcome({ onLogin }: WelcomeProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // Add slight delay for better UX
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="welcome-container">
        <div className="cute-card text-center">
          <div className="petpal-logo">
            <span className="pet-emoji">🐾</span>
            <h1 className="app-title">Petpal</h1>
            <span className="pet-emoji">🐾</span>
          </div>
          
          <div className="welcome-pet">
            <div className="pet-character">🐱</div>
            <div className="speech-bubble">
              <p>Hi there! I'm your mood tracking companion!</p>
              <p>Let's track your feelings together! 💕</p>
            </div>
          </div>

          <div className="login-section">
            <p className="welcome-text">
              Join me on this journey to understand your emotions better
            </p>
            <button 
              className={`btn-primary login-btn ${isLoading ? 'loading' : ''}`}
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner">⏳</span>
                  Connecting...
                </>
              ) : (
                <>
                  <span className="google-icon">🔐</span>
                  Continue with Google
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .welcome-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .text-center {
          text-align: center;
        }

        .petpal-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .pet-emoji {
          font-size: 2rem;
          animation: bounce 2s infinite;
        }

        .app-title {
          font-size: 3rem;
          font-weight: bold;
          background: linear-gradient(45deg, #ff6b9d, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .welcome-pet {
          margin: 2rem 0;
        }

        .pet-character {
          font-size: 4rem;
          margin-bottom: 1rem;
          animation: float 3s ease-in-out infinite;
        }

        .speech-bubble {
          background: #f8f9fa;
          border-radius: 20px;
          padding: 1rem;
          position: relative;
          margin: 1rem 0;
          border: 2px solid #ff6b9d;
        }

        .speech-bubble::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid #ff6b9d;
        }

        .speech-bubble p {
          margin: 0.5rem 0;
          color: #333;
          font-weight: 500;
        }

        .login-section {
          margin-top: 2rem;
        }

        .welcome-text {
          color: #666;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }

        .login-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin: 0 auto;
          font-size: 1.1rem;
          padding: 1rem 2rem;
          min-width: 200px;
        }

        .login-btn.loading {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .google-icon,
        .spinner {
          font-size: 1.2rem;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
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
          .app-title {
            font-size: 2.5rem;
          }
          
          .pet-character {
            font-size: 3rem;
          }
          
          .login-btn {
            font-size: 1rem;
            padding: 0.8rem 1.5rem;
            min-width: 180px;
          }
        }
      `}</style>
    </div>
  );
}