# Petpal Mood Tracker - Development Guidelines

## Project Overview
A Progressive Web App (PWA) mood tracker with cute theme called "Petpal"

## Technology Stack
- **Package Manager**: Use `bun` instead of `npm` for all package management
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Target Platforms**: Mobile and iPad only (no desktop site needed)

## Features Requirements
1. **Welcome Page**: Petpal branding with cute theme ✅
2. **Authentication**: Google OAuth login only (mock implemented) ✅
3. **Mood Tracker**: 5 emotion emojis + explanation text field ✅
4. **Calendar View**: Shows tracked moods by date ✅
5. **Good Mood Cards**: Fortune card style random selection of good moods for encouragement ✅
6. **PWA Configuration**: Offline support, installable ✅

## Development Rules
- Mobile-first responsive design ✅
- Cute and friendly UI theme throughout ✅
- Progressive Web App capabilities ✅
- TypeScript for type safety ✅

## Commands
- **Development**: `bun run dev`
- **Build**: `bun run build`
- **Preview**: `bun run preview`

## Notes
- Icon files (PNG) need to be properly generated from the SVG
- For production, implement real Google OAuth integration
- Data is currently stored in localStorage