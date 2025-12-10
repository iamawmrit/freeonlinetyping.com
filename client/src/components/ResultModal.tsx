import { useTestStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Camera, Download, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect, useRef, useState } from 'react';
import domtoimage from 'dom-to-image-more';

export function ResultModal() {
  const { status, wpm, accuracy, resetTest, correctChars, incorrectChars } = useTestStore();
  const resultRef = useRef<HTMLDivElement>(null);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

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

  const handleScreenshot = async () => {
    if (!resultRef.current) return;

    try {
      // Add a temporary class to hide borders
      resultRef.current.classList.add('screenshot-mode');

      // Add temporary style to hide all borders
      const styleEl = document.createElement('style');
      styleEl.id = 'screenshot-styles';
      styleEl.textContent = `
        .screenshot-mode,
        .screenshot-mode * {
          border: none !important;
          outline: none !important;
        }
      `;
      document.head.appendChild(styleEl);

      // Wait a bit for styles to apply
      await new Promise(resolve => setTimeout(resolve, 50));

      // Use dom-to-image-more which supports modern CSS
      const blob = await domtoimage.toBlob(resultRef.current, {
        bgcolor: '#0a0e1a',
        quality: 1,
        scale: 2,
        // Filter to handle CORS
        filter: (node: HTMLElement) => {
          // Skip external stylesheets (fixes CORS errors)
          if (node.tagName === 'LINK' && node.getAttribute('rel') === 'stylesheet') {
            const href = node.getAttribute('href');
            if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
              return false;
            }
          }
          return true;
        },
      });

      // Clean up temporary styles
      resultRef.current.classList.remove('screenshot-mode');
      document.getElementById('screenshot-styles')?.remove();

      // Save screenshot URL to state for display
      if (blob) {
        const url = URL.createObjectURL(blob);
        setScreenshotUrl(url);
      }
    } catch (error) {
      // Make sure to clean up even if there's an error
      resultRef.current?.classList.remove('screenshot-mode');
      document.getElementById('screenshot-styles')?.remove();
    }
  };

  const handleDownload = () => {
    if (!screenshotUrl) return;

    const link = document.createElement('a');
    link.download = `typing.awmrit.com-${wpm}wpm-${accuracy}acc.png`;
    link.href = screenshotUrl;
    link.click();
  };

  const closeScreenshot = () => {
    if (screenshotUrl) {
      URL.revokeObjectURL(screenshotUrl);
      setScreenshotUrl(null);
    }
  };

  if (status !== 'finished') return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
        >
          <motion.div
            ref={resultRef}
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
                    <button onClick={handleScreenshot} className="w-12 h-12 flex items-center justify-center rounded-lg border border-border hover:border-primary/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" title="Screenshot">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Screenshot Display Modal */}
      <AnimatePresence>
        {screenshotUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-lg p-4"
            onClick={closeScreenshot}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeScreenshot}
                className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Screenshot image */}
              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={screenshotUrl}
                  alt="Screenshot"
                  className="w-full h-auto"
                />
              </div>

              {/* Download button */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleDownload}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-5 h-5" /> Download Image
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
