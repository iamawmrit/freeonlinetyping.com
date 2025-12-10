import { useTestStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function StatsDisplay() {
  const { status, config, startTime, wpm, accuracy, currentWordIndex } = useTestStore();
  const [timeLeft, setTimeLeft] = useState(config.duration);

  useEffect(() => {
    if (status === 'idle') {
      setTimeLeft(config.duration);
    } else if (status === 'running' && config.mode === 'time' && startTime) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = Math.max(0, config.duration - elapsed);
        setTimeLeft(remaining);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [status, config.mode, config.duration, startTime]);

  if (status === 'finished') return null;

  return (
    <div
      className={cn(
        'flex items-center gap-8 text-2xl font-display font-bold text-primary mb-8 transition-all duration-300',
        status === 'running' ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
      )}
    >
      {config.mode === 'time' && (
        <div className="flex flex-col items-center">
          <span className="text-5xl font-bold">{timeLeft}</span>
          <span className="text-xs font-mono text-muted-foreground font-normal uppercase tracking-wider">
            time
          </span>
        </div>
      )}

      {config.mode === 'words' && (
        <div className="flex flex-col items-center">
          <span className="text-5xl font-bold">
            {currentWordIndex}/{config.wordCount}
          </span>
          <span className="text-xs font-mono text-muted-foreground font-normal uppercase tracking-wider">
            words
          </span>
        </div>
      )}

      {status === 'running' && (
        <>
          <div className="w-px h-10 bg-border/50" />
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold text-primary">{wpm}</span>
            <span className="text-xs font-mono text-muted-foreground font-normal uppercase tracking-wider">
              wpm
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold text-secondary">{accuracy}%</span>
            <span className="text-xs font-mono text-muted-foreground font-normal uppercase tracking-wider">
              acc
            </span>
          </div>
        </>
      )}
    </div>
  );
}
