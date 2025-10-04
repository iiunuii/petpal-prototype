import { MoodEntry, MoodEmoji } from '../types';

const MOOD_EMOJIS_ARRAY: MoodEmoji[] = ['😊', '😢', '😴', '😡', '😰'];

const EXPLANATIONS: Record<MoodEmoji, string[]> = {
  '😊': [
    'Had a great day at work! My project got approved.',
    'Spent quality time with family today.',
    'Finally finished that book I was reading!',
    'Had an amazing lunch with friends.',
    'Worked out and feeling energized!',
    'Got praised by my boss today.',
    'Beautiful weather, went for a nice walk.',
    'Accomplished all my tasks for today!',
  ],
  '😢': [
    'Feeling a bit down today, not sure why.',
    'Had a disagreement with a friend.',
    'Work was stressful and overwhelming.',
    'Missing someone special today.',
    'Feeling lonely and isolated.',
    'Bad news from home.',
  ],
  '😴': [
    'Didn\'t sleep well last night.',
    'Long day at work, exhausted.',
    'Been working non-stop, need a break.',
    'Feeling drained and tired.',
    'Need more sleep, so exhausted.',
  ],
  '😡': [
    'Frustrated with work situation.',
    'Got stuck in traffic for hours.',
    'Someone was really rude to me today.',
    'Things didn\'t go as planned.',
    'Dealing with annoying bureaucracy.',
  ],
  '😰': [
    'Worried about upcoming deadline.',
    'Anxious about presentation tomorrow.',
    'Health concerns on my mind.',
    'Financial stress today.',
    'Feeling overwhelmed with responsibilities.',
  ],
};

export function generateMockData(): MoodEntry[] {
  const entries: MoodEntry[] = [];
  const now = new Date();

  // Generate data for the last 60 days
  for (let i = 0; i < 60; i++) {
    // Randomly skip some days (30% chance to skip)
    if (Math.random() > 0.7) continue;

    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Random mood
    const randomMood = MOOD_EMOJIS_ARRAY[Math.floor(Math.random() * MOOD_EMOJIS_ARRAY.length)];

    // Random explanation for that mood
    const explanationsForMood = EXPLANATIONS[randomMood];
    const randomExplanation = explanationsForMood[Math.floor(Math.random() * explanationsForMood.length)];

    entries.push({
      id: `mock-${i}`,
      userId: 'user1',
      emoji: randomMood,
      explanation: randomExplanation,
      date: date.toISOString().split('T')[0],
      timestamp: date.getTime(),
    });
  }

  return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
