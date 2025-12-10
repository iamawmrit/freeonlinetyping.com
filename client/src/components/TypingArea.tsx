import { useEffect, useRef, useState } from 'react';
import { useTestStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function TypingArea() {
  const {
    words,
    status,
    currentWordIndex,
    startTest,
    endTest,
    resetTest,
    config,
    correctChars,
    incorrectChars,
  } = useTestStore();

  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize test on component mount and when config changes
  useEffect(() => {
    resetTest();
    setInput('');
  }, [config.mode, config.duration, config.wordCount, config.punctuation, config.numbers]);

  // Handle Tab key for restart
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        resetTest();
        setInput('');
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        resetTest();
        setInput('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Timer logic for time mode
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === 'running' && config.mode === 'time') {
      const storeState = useTestStore.getState();
      const startTime = storeState.startTime;

      if (!startTime) return;

      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = (now - startTime) / 1000;

        // Update stats in real-time
        useTestStore.getState().updateStats();

        // End test when time is up
        if (elapsed >= config.duration) {
          endTest();
          clearInterval(interval);
        }
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, config.mode, config.duration]);

  // Focus management
  useEffect(() => {
    if (status !== 'finished' && isFocused) {
      inputRef.current?.focus();
    }
  }, [status, isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Don't allow input if test is finished
    if (status === 'finished') {
      setInput('');
      return;
    }

    // Start test on first keystroke if idle
    if (status === 'idle' && val.length > 0) {
      startTest();
    }

    const currentWord = words[currentWordIndex];
    if (!currentWord) {
      setInput(val);
      return;
    }

    // Handle space to move to next word
    if (val.endsWith(' ')) {
      const typedWord = val.trim();

      if (typedWord === '') {
        setInput('');
        return;
      }

      // Check if word is correct
      const isCorrect = typedWord === currentWord;

      // Update stats: add space character
      useTestStore.setState(s => ({
        currentWordIndex: s.currentWordIndex + 1,
        correctChars: s.correctChars + (isCorrect ? 1 : 0),
        incorrectChars: s.incorrectChars + (isCorrect ? 0 : 1),
      }));

      setInput('');
      return;
    }

    // Character-by-character tracking
    const prevLength = input.length;
    const newLength = val.length;

    if (newLength > prevLength) {
      // Character was added
      const newChar = val[newLength - 1];
      const expectedChar = currentWord[newLength - 1];

      if (newChar === expectedChar) {
        useTestStore.setState(s => ({ correctChars: s.correctChars + 1 }));
      } else {
        useTestStore.setState(s => ({ incorrectChars: s.incorrectChars + 1 }));
      }
    }

    setInput(val);
  };

  // Auto-scroll to current word
  useEffect(() => {
    const activeWord = document.getElementById(`word-${currentWordIndex}`);
    if (activeWord && containerRef.current) {
      const container = containerRef.current;
      const wordTop = activeWord.offsetTop;
      const containerTop = container.offsetTop;
      const relativeTop = wordTop - containerTop;

      if (relativeTop > 100) {
        container.scrollTop = relativeTop - 50;
      }
    }
  }, [currentWordIndex]);

  const currentWord = words[currentWordIndex] || '';

  return (
    <div
      className="relative w-full max-w-5xl mx-auto font-mono text-2xl md:text-3xl leading-relaxed outline-none"
      onClick={() => {
        setIsFocused(true);
        inputRef.current?.focus();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0 w-full h-full cursor-default z-0"
        value={input}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      <div
        ref={containerRef}
        className="relative z-10 h-48 overflow-hidden select-none"
        style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}
      >
        <div className="flex flex-wrap gap-x-4 gap-y-2 transition-all duration-200 ease-out">
          {words.map((word, wIndex) => {
            const isCurrent = wIndex === currentWordIndex;
            const isPast = wIndex < currentWordIndex;

            return (
              <div
                key={wIndex}
                id={`word-${wIndex}`}
                className={cn(
                  'relative transition-opacity duration-200',
                  isPast ? 'opacity-50' : 'opacity-100',
                  isCurrent && 'text-primary'
                )}
              >
                {word.split('').map((char, cIndex) => {
                  let statusClass = 'text-muted-foreground';
                  let showCursor = false;

                  if (isCurrent) {
                    if (cIndex < input.length) {
                      statusClass =
                        input[cIndex] === char
                          ? 'text-foreground'
                          : 'text-destructive';
                    } else if (cIndex === input.length) {
                      statusClass = 'text-muted-foreground bg-primary/20 animate-pulse';
                      showCursor = true;
                    }
                  } else if (isPast) {
                    statusClass = 'text-foreground/60';
                  }

                  return (
                    <span key={cIndex} className={cn(statusClass, 'relative')}>
                      {char}
                      {showCursor && (
                        <motion.span
                          layoutId="cursor"
                          className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-primary"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </span>
                  );
                })}
                {/* Show cursor at the end if user typed past the word length */}
                {isCurrent && input.length >= word.length && (
                  <span className="relative">
                    <motion.span
                      layoutId="cursor"
                      className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-primary h-8"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Focus overlay - only show if not focused and not running */}
      {!isFocused && status !== 'finished' && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20 rounded-lg">
          <div className="text-primary font-display text-xl animate-pulse">
            Click to start typing
          </div>
        </div>
      )}
    </div>
  );
}
