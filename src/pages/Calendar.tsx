import { useState, useMemo } from 'react';
import { MoodEntry } from '../types';

interface CalendarProps {
  moodEntries: MoodEntry[];
}

export default function Calendar({ moodEntries }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { daysInMonth, startDay, monthYear } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const monthYear = currentDate.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });

    return { daysInMonth, startDay, monthYear };
  }, [currentDate]);

  const moodMap = useMemo(() => {
    const map = new Map<string, MoodEntry>();
    moodEntries.forEach(entry => {
      map.set(entry.date, entry);
    });
    return map;
  }, [moodEntries]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="calendar-day empty" />
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = new Date(year, month, day).toISOString().split('T')[0];
      const moodEntry = moodMap.get(dateString);
      const isToday = dateString === new Date().toISOString().split('T')[0];

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${moodEntry ? 'has-mood' : ''}`}
        >
          <span className="day-number">{day}</span>
          {moodEntry && (
            <div className="mood-indicator" title={moodEntry.explanation || 'No note'}>
              <span className="mood-emoji">{moodEntry.emoji}</span>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="container">
      <div className="calendar-container">
        <div className="cute-card">
          <div className="calendar-header">
            <button
              onClick={() => navigateMonth('prev')}
              className="nav-btn"
              aria-label="Previous month"
            >
              ⬅️
            </button>
            <h2 className="month-title">{monthYear}</h2>
            <button
              onClick={() => navigateMonth('next')}
              className="nav-btn"
              aria-label="Next month"
            >
              ➡️
            </button>
          </div>

          <div className="calendar-grid">
            <div className="weekdays">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="weekday">
                  {day}
                </div>
              ))}
            </div>
            <div className="calendar-days">
              {renderCalendarDays()}
            </div>
          </div>

          <div className="calendar-footer">
            <div className="mood-legend">
              <p className="legend-title">Your mood journey with Petpal 🐾</p>
              <div className="legend-items">
                <div className="legend-item">
                  <span className="legend-dot today-dot"></span>
                  <span>Today</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot mood-dot"></span>
                  <span>Mood tracked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .calendar-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 0;
        }

        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding: 0 0.5rem;
        }

        .nav-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background: rgba(255, 107, 157, 0.1);
          transform: scale(1.1);
        }

        .month-title {
          color: #333;
          font-size: 1.8rem;
          font-weight: 600;
          text-align: center;
          flex: 1;
        }

        .calendar-grid {
          width: 100%;
        }

        .weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          margin-bottom: 0.5rem;
        }

        .weekday {
          text-align: center;
          font-weight: 600;
          color: #666;
          padding: 0.8rem 0.5rem;
          font-size: 0.9rem;
        }

        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background: #e1e5e9;
          border-radius: 10px;
          overflow: hidden;
        }

        .calendar-day {
          background: white;
          min-height: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .calendar-day:hover {
          background: #f8f9fa;
        }

        .calendar-day.empty {
          background: #f8f9fa;
          cursor: default;
        }

        .calendar-day.today {
          background: rgba(255, 107, 157, 0.1);
          border: 2px solid #ff6b9d;
        }

        .calendar-day.has-mood {
          background: rgba(102, 126, 234, 0.05);
        }

        .calendar-day.today.has-mood {
          background: rgba(255, 107, 157, 0.15);
        }

        .day-number {
          font-size: 0.9rem;
          font-weight: 500;
          color: #333;
          margin-bottom: 0.2rem;
        }

        .mood-indicator {
          position: absolute;
          bottom: 4px;
          right: 4px;
        }

        .mood-emoji {
          font-size: 1.2rem;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
        }

        .calendar-footer {
          margin-top: 1.5rem;
          text-align: center;
        }

        .legend-title {
          color: #666;
          margin-bottom: 1rem;
          font-size: 1rem;
          font-weight: 500;
        }

        .legend-items {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #666;
        }

        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
        }

        .today-dot {
          background: #ff6b9d;
        }

        .mood-dot {
          background: linear-gradient(45deg, #667eea, #764ba2);
        }

        @media (max-width: 480px) {
          .month-title {
            font-size: 1.4rem;
          }

          .calendar-day {
            min-height: 50px;
          }

          .weekday {
            padding: 0.6rem 0.3rem;
            font-size: 0.8rem;
          }

          .mood-emoji {
            font-size: 1rem;
          }

          .legend-items {
            gap: 1rem;
          }
        }

        @media (min-width: 768px) {
          .calendar-day {
            min-height: 70px;
          }

          .day-number {
            font-size: 1rem;
          }

          .mood-emoji {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
}