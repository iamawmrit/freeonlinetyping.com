import { create } from 'zustand';
import { generateWords } from './words';

export type TestMode = 'time' | 'words' | 'quote' | 'zen' | 'custom';
export type TestStatus = 'idle' | 'running' | 'finished';

interface TestConfig {
  mode: TestMode;
  duration: number; // for time mode
  wordCount: number; // for words mode
  punctuation: boolean;
  numbers: boolean;
}

interface TestState {
  status: TestStatus;
  words: string[];
  currentWordIndex: number;
  currentCharIndex: number;
  correctChars: number;
  incorrectChars: number;
  startTime: number | null;
  endTime: number | null;
  wpm: number;
  accuracy: number;
  config: TestConfig;
  
  // Actions
  setMode: (mode: TestMode) => void;
  setConfig: (config: Partial<TestConfig>) => void;
  startTest: () => void;
  endTest: () => void;
  resetTest: () => void;
  handleInput: (char: string) => void;
  handleBackspace: () => void;
  updateStats: () => void;
}

export const useTestStore = create<TestState>((set, get) => ({
  status: 'idle',
  words: [],
  currentWordIndex: 0,
  currentCharIndex: 0,
  correctChars: 0,
  incorrectChars: 0,
  startTime: null,
  endTime: null,
  wpm: 0,
  accuracy: 100,
  config: {
    mode: 'time',
    duration: 30,
    wordCount: 50,
    punctuation: false,
    numbers: false,
  },

  setMode: (mode) => set((state) => ({ 
    config: { ...state.config, mode },
    status: 'idle' 
  })),

  setConfig: (newConfig) => set((state) => ({
    config: { ...state.config, ...newConfig },
    status: 'idle'
  })),

  startTest: () => {
    const { config, status } = get();
    if (status === 'running') return;

    const count = config.mode === 'words' ? config.wordCount : 100;
    set({
      status: 'running',
      // Only regenerate words if we are starting fresh from idle, 
      // but actually startTest is usually called on first keystroke of an idle test.
      // If we want "Tab" to reset, it calls resetTest, which sets status to idle and generates words.
      // So here we just set start time.
      startTime: Date.now(),
      endTime: null,
      // Do NOT reset chars/indices here if we want to keep what was just typed (the first char)
      // But usually startTest is called *before* processing the first char.
    });
  },

  endTest: () => {
    const { startTime, correctChars, incorrectChars } = get();
    const endTime = Date.now();
    const durationInMinutes = (endTime - (startTime || endTime)) / 60000;
    
    // Standard WPM calculation: (all typed characters / 5) / time in minutes
    // Net WPM usually subtracts errors, but we'll stick to standard gross/net logic later if needed
    // Here we use correct chars for "useful" speed
    const wpm = Math.round((correctChars / 5) / durationInMinutes) || 0;
    const totalChars = correctChars + incorrectChars;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

    set({
      status: 'finished',
      endTime,
      wpm,
      accuracy,
    });
  },

  resetTest: () => {
    const { config } = get();
    const count = config.mode === 'words' ? config.wordCount : 100;
    set({
      status: 'idle',
      words: generateWords(count, config.punctuation, config.numbers),
      currentWordIndex: 0,
      currentCharIndex: 0,
      correctChars: 0,
      incorrectChars: 0,
      startTime: null,
      endTime: null,
      wpm: 0,
      accuracy: 100,
    });
  },

  updateStats: () => {
    const { startTime, correctChars, incorrectChars, status } = get();
    if (status !== 'running' || !startTime) return;

    const now = Date.now();
    const durationInMinutes = (now - startTime) / 60000;
    
    if (durationInMinutes <= 0) return;

    const wpm = Math.round((correctChars / 5) / durationInMinutes);
    const totalChars = correctChars + incorrectChars;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

    set({ wpm, accuracy });
  },

  handleInput: (char: string) => {
    const state = get();
    if (state.status === 'finished') return;
    
    if (state.status === 'idle') {
      state.startTest();
    }

    const currentWord = state.words[state.currentWordIndex];
    const isCorrect = char === currentWord[state.currentCharIndex];
    
    // Logic for advancing cursor and tracking stats
    // This is a simplified version; complex handling (extra chars, etc.) can be added
    
    if (isCorrect) {
      set((s) => ({ correctChars: s.correctChars + 1 }));
    } else {
      set((s) => ({ incorrectChars: s.incorrectChars + 1 }));
    }

    // Move to next char
    if (state.currentCharIndex < currentWord.length - 1) {
      set((s) => ({ currentCharIndex: s.currentCharIndex + 1 }));
    } else {
      // End of word, check if space was typed (handled by component usually, but here we assume direct char mapping)
      // Actually, usually space triggers next word. 
      // We'll let the component call a specific "nextWord" action or handle space separately.
      // For now, let's assume this handles character-by-character matching.
      set((s) => ({ currentCharIndex: s.currentCharIndex + 1 }));
    }
  },

  handleBackspace: () => {
    const state = get();
    if (state.status === 'finished' || state.currentCharIndex === 0) return;
    
    set((s) => ({ currentCharIndex: s.currentCharIndex - 1 }));
  },
}));
