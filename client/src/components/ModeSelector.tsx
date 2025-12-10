import { useTestStore, TestMode } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Clock, Type, Quote, Hash, AlignLeft } from 'lucide-react';

export function ModeSelector() {
  const { config, setMode, setConfig } = useTestStore();

  const modes: { id: TestMode; label: string; icon: any }[] = [
    { id: 'time', label: 'Time', icon: Clock },
    { id: 'words', label: 'Words', icon: Type },
    { id: 'quote', label: 'Quote', icon: Quote },
    { id: 'zen', label: 'Zen', icon: AlignLeft },
    { id: 'custom', label: 'Custom', icon: Hash },
  ];

  return (
    <div className="flex flex-col items-center gap-4 mb-12 bg-card/50 p-4 rounded-xl border border-border/50 backdrop-blur-sm">
      {/* Mode Tabs */}
      <div className="flex gap-2 bg-muted/50 p-1 rounded-lg">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = config.mode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setMode(mode.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-background text-primary shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              )}
            >
              <Icon className="w-4 h-4" />
              {mode.label}
            </button>
          );
        })}
      </div>

      {/* Sub-options based on mode */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {config.mode === 'time' && (
          <div className="flex gap-2">
            {[15, 30, 60, 120].map((time) => (
              <button
                key={time}
                onClick={() => setConfig({ duration: time })}
                className={cn(
                  "px-2 py-1 rounded hover:text-primary transition-colors",
                  config.duration === time && "text-primary font-bold"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        )}
        
        {config.mode === 'words' && (
          <div className="flex gap-2">
            {[10, 25, 50, 100].map((count) => (
              <button
                key={count}
                onClick={() => setConfig({ wordCount: count })}
                className={cn(
                  "px-2 py-1 rounded hover:text-primary transition-colors",
                  config.wordCount === count && "text-primary font-bold"
                )}
              >
                {count}
              </button>
            ))}
          </div>
        )}

        <div className="w-px h-4 bg-border mx-2" />

        <div className="flex gap-4">
          <button
            onClick={() => setConfig({ punctuation: !config.punctuation })}
            className={cn(
              "transition-colors hover:text-foreground",
              config.punctuation && "text-primary font-bold"
            )}
          >
            @ punctuation
          </button>
          <button
            onClick={() => setConfig({ numbers: !config.numbers })}
            className={cn(
              "transition-colors hover:text-foreground",
              config.numbers && "text-primary font-bold"
            )}
          >
            # numbers
          </button>
        </div>
      </div>
    </div>
  );
}
