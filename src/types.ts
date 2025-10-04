export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface MoodEntry {
  id: string;
  userId: string;
  emoji: string;
  explanation: string;
  date: string;
  timestamp: number;
}

export interface MoodCard {
  id: string;
  emoji: string;
  message: string;
  date: string;
}

export type MoodEmoji = '😊' | '😢' | '😴' | '😡' | '😰';

export const MOOD_EMOJIS: { emoji: MoodEmoji; label: string }[] = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '😡', label: 'Angry' },
  { emoji: '😰', label: 'Anxious' },
];

export const POSITIVE_MOODS: MoodEmoji[] = ['😊'];