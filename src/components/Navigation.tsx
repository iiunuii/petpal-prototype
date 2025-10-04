interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'mood', label: 'Track', icon: '😊' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'cards', label: 'Cards', icon: '🎴' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}

      <style jsx>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 107, 157, 0.2);
          display: flex;
          justify-content: space-around;
          padding: 0.5rem;
          z-index: 1000;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.75rem 1rem;
          border-radius: 15px;
          transition: all 0.3s ease;
          flex: 1;
          max-width: 80px;
        }

        .nav-item:hover {
          background: rgba(255, 107, 157, 0.1);
          transform: translateY(-2px);
        }

        .nav-item.active {
          background: rgba(255, 107, 157, 0.15);
          color: #ff6b9d;
        }

        .nav-item.active .nav-icon {
          transform: scale(1.2);
        }

        .nav-icon {
          font-size: 1.5rem;
          transition: transform 0.3s ease;
        }

        .nav-label {
          font-size: 0.8rem;
          font-weight: 500;
          color: inherit;
        }

        .nav-item.active .nav-label {
          font-weight: 600;
        }

        @media (min-width: 768px) {
          .bottom-nav {
            padding: 1rem;
          }

          .nav-item {
            padding: 1rem 1.5rem;
            max-width: 100px;
          }

          .nav-icon {
            font-size: 1.8rem;
          }

          .nav-label {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </nav>
  );
}