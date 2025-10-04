interface InstructionsProps {
  onContinue: () => void;
}

export default function Instructions({ onContinue }: InstructionsProps) {
  return (
    <div className="container">
      <div className="instructions-container">
        <div className="cute-card">
          <div className="header">
            <div className="petpal-logo">
              <span className="pet-emoji">🐾</span>
              <h1 className="app-title">Petpal</h1>
              <span className="pet-emoji">🐾</span>
            </div>
            <div className="pet-character">🐱</div>
            <h2>Install Petpal on Your Device</h2>
            <p className="subtitle">Add to home screen for the best experience!</p>
          </div>

          <div className="instructions-content">
            <div className="platform-section">
              <h3>📱 iOS (iPhone/iPad)</h3>
              <ol>
                <li>Tap the <strong>Share</strong> button <span className="icon">⎙</span> at the bottom</li>
                <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
                <li>Tap <strong>"Add"</strong> in the top right corner</li>
                <li>Find Petpal on your home screen! 🎉</li>
              </ol>
            </div>

            <div className="platform-section">
              <h3>🤖 Android</h3>
              <ol>
                <li>Tap the <strong>Menu</strong> button <span className="icon">⋮</span> in your browser</li>
                <li>Select <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong></li>
                <li>Tap <strong>"Add"</strong> or <strong>"Install"</strong></li>
                <li>Petpal is now on your home screen! 🎉</li>
              </ol>
            </div>

            <div className="benefits-section">
              <h4>✨ Why Install?</h4>
              <ul>
                <li>🚀 Faster loading</li>
                <li>📴 Works offline</li>
                <li>🎨 Full screen experience</li>
                <li>🔔 Better notifications (coming soon!)</li>
              </ul>
            </div>
          </div>

          <div className="button-container">
            <button onClick={onContinue} className="btn-primary continue-btn">
              Continue to App
              <span>→</span>
            </button>
            <p className="skip-text">You can install later anytime!</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .instructions-container {
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

        .petpal-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .pet-emoji {
          font-size: 1.5rem;
          animation: bounce 2s infinite;
        }

        .app-title {
          font-size: 2rem;
          font-weight: bold;
          background: linear-gradient(45deg, #ff6b9d, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .pet-character {
          font-size: 3rem;
          margin: 1rem 0;
          animation: float 3s ease-in-out infinite;
        }

        .header h2 {
          color: #333;
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }

        .subtitle {
          color: #666;
          font-size: 1rem;
        }

        .instructions-content {
          text-align: left;
          margin: 2rem 0;
        }

        .platform-section {
          margin-bottom: 2rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 15px;
          border: 2px solid #e1e5e9;
        }

        .platform-section h3 {
          color: #333;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .platform-section ol {
          margin-left: 1.2rem;
          color: #555;
        }

        .platform-section li {
          margin: 0.8rem 0;
          line-height: 1.6;
        }

        .icon {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 0.2rem 0.5rem;
          border-radius: 5px;
          font-weight: bold;
          margin: 0 0.2rem;
        }

        .benefits-section {
          background: linear-gradient(135deg, rgba(255, 107, 157, 0.1), rgba(118, 75, 162, 0.1));
          padding: 1rem;
          border-radius: 15px;
          border: 2px solid rgba(255, 107, 157, 0.3);
        }

        .benefits-section h4 {
          color: #ff6b9d;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .benefits-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .benefits-section li {
          color: #555;
          margin: 0.6rem 0;
          padding-left: 0.5rem;
        }

        .button-container {
          text-align: center;
          margin-top: 2rem;
        }

        .continue-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin: 0 auto;
          font-size: 1.1rem;
          padding: 1rem 2rem;
          min-width: 200px;
        }

        .skip-text {
          color: #999;
          font-size: 0.9rem;
          margin-top: 1rem;
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

        @media (max-width: 480px) {
          .app-title {
            font-size: 1.8rem;
          }

          .header h2 {
            font-size: 1.3rem;
          }

          .pet-character {
            font-size: 2.5rem;
          }

          .platform-section h3 {
            font-size: 1.1rem;
          }

          .platform-section li {
            font-size: 0.95rem;
          }

          .continue-btn {
            font-size: 1rem;
            padding: 0.8rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}