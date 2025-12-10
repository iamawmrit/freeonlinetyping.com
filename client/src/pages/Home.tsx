import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TypingArea } from '@/components/TypingArea';
import { KeyboardDisplay } from '@/components/KeyboardDisplay';
import { ModeSelector } from '@/components/ModeSelector';
import { StatsDisplay } from '@/components/StatsDisplay';
import { ResultModal } from '@/components/ResultModal';
import { useTestStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function Home() {
  const { status } = useTestStore();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Overlay for Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10 scanlines" />
      
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className={cn(
          "flex flex-col items-center w-full transition-all duration-500 ease-out",
          status === 'running' ? "scale-105" : "scale-100"
        )}>
          {/* Top Controls - Fade out when running */}
          <div className={cn(
            "transition-opacity duration-300",
            status === 'running' ? "opacity-0 pointer-events-none" : "opacity-100"
          )}>
            <ModeSelector />
          </div>

          {/* Stats - Always visible but changes mode */}
          <StatsDisplay />

          {/* Main Typing Area */}
          <TypingArea />

          {/* Keyboard - Fade out when running to reduce distraction */}
          <div className={cn(
            "transition-opacity duration-500 mt-8",
            status === 'running' ? "opacity-20" : "opacity-100"
          )}>
            <KeyboardDisplay />
          </div>
        </div>

        {/* Footer Instructions */}
        <div className={cn(
          "mt-16 text-center text-sm text-muted-foreground font-mono transition-opacity duration-300",
          status === 'running' ? "opacity-0" : "opacity-100"
        )}>
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-muted rounded text-xs border border-border">tab</kbd>
              <span>restart test</span>
            </span>
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-muted rounded text-xs border border-border">esc</kbd>
              <span>stop</span>
            </span>
          </div>
        </div>
      </main>

      <Footer />
      <ResultModal />
    </div>
  );
}
