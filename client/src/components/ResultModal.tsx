import { useTestStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Share2, Twitter, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export function ResultModal() {
  const { status, wpm, accuracy, resetTest, correctChars, incorrectChars } = useTestStore();

  useEffect(() => {
    if (status === 'finished') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#FFD700', '#FFFFFF']
      });
    }
  }, [status]);

  if (status !== 'finished') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="w-full max-w-4xl bg-card border border-border rounded-2xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column: Primary Stats */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-2">
                <h3 className="text-muted-foreground font-mono text-sm uppercase tracking-widest">wpm</h3>
                <div className="text-8xl font-display font-bold text-primary drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  {wpm}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-muted-foreground font-mono text-sm uppercase tracking-widest">acc</h3>
                <div className="text-6xl font-display font-bold text-secondary drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                  {accuracy}%
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Stats & Chart Placeholder */}
            <div className="flex flex-col space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                  <div className="text-xs text-muted-foreground font-mono uppercase mb-1">test type</div>
                  <div className="text-xl font-bold text-foreground">time 30</div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                  <div className="text-xs text-muted-foreground font-mono uppercase mb-1">characters</div>
                  <div className="text-xl font-bold text-foreground">
                    <span className="text-primary">{correctChars}</span>
                    <span className="text-muted-foreground mx-1">/</span>
                    <span className="text-destructive">{incorrectChars}</span>
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                  <div className="text-xs text-muted-foreground font-mono uppercase mb-1">consistency</div>
                  <div className="text-xl font-bold text-foreground">94%</div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                  <div className="text-xs text-muted-foreground font-mono uppercase mb-1">time</div>
                  <div className="text-xl font-bold text-foreground">30s</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-auto pt-4">
                <button 
                  onClick={resetTest}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-lg font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <RefreshCw className="w-5 h-5" /> Restart Test
                </button>
                
                <div className="flex gap-2">
                  <button className="w-12 h-12 flex items-center justify-center rounded-lg border border-border hover:border-primary/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" title="Screenshot">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
