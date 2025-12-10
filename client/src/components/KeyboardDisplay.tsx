import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const KEYBOARD_LAYOUT = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
];

export function KeyboardDisplay() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setActiveKey(e.key.toLowerCase());
    };

    const handleKeyUp = () => {
      setActiveKey(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="hidden lg:flex flex-col gap-2 items-center mt-12 opacity-50 hover:opacity-100 transition-opacity duration-300">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((key) => {
            const isActive = activeKey === key;
            return (
              <div
                key={key}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-md border border-border text-sm font-mono uppercase transition-all duration-75",
                  isActive 
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_10px_rgba(0,240,255,0.5)] scale-95" 
                    : "bg-card text-muted-foreground"
                )}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}
      {/* Space bar */}
      <div className="flex gap-2 mt-0">
        <div
          className={cn(
            "w-64 h-10 rounded-md border border-border transition-all duration-75",
            activeKey === ' ' 
              ? "bg-primary border-primary shadow-[0_0_10px_rgba(0,240,255,0.5)] scale-95" 
              : "bg-card"
          )}
        />
      </div>
    </div>
  );
}
