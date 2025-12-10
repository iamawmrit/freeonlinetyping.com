import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TypingArea } from '@/components/TypingArea';
import { KeyboardDisplay } from '@/components/KeyboardDisplay';
import { ModeSelector } from '@/components/ModeSelector';
import { StatsDisplay } from '@/components/StatsDisplay';
import { ResultModal } from '@/components/ResultModal';
import { useTestStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Zap, Target, Clock, Trophy } from 'lucide-react';

export default function Home() {
  const { status } = useTestStore();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Overlay for Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10 scanlines" />

      <Header />

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 py-4 relative z-10">
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
          "mt-6 text-center text-sm text-muted-foreground font-mono transition-opacity duration-300",
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

      {/* SEO Content Section - Hidden when typing */}
      <section className={cn(
        "w-full max-w-6xl mx-auto px-4 py-12 transition-opacity duration-300",
        status === 'running' ? "opacity-0 pointer-events-none h-0 overflow-hidden py-0" : "opacity-100"
      )}>
        {/* H1 for SEO */}
        <h1 className="text-3xl md:text-4xl font-display font-bold text-center mb-4 text-primary">
          Free Online Typing Speed Test
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Test your typing speed and accuracy with Rith Typing Pro. Track your WPM, improve your skills, and compete with yourself.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <article className="bg-card/50 border border-border rounded-xl p-6 text-center">
            <Zap className="w-10 h-10 text-primary mx-auto mb-3" />
            <h2 className="font-bold text-lg mb-2">Real-time WPM</h2>
            <p className="text-sm text-muted-foreground">Track your words per minute as you type with instant feedback</p>
          </article>
          <article className="bg-card/50 border border-border rounded-xl p-6 text-center">
            <Target className="w-10 h-10 text-secondary mx-auto mb-3" />
            <h2 className="font-bold text-lg mb-2">Accuracy Tracking</h2>
            <p className="text-sm text-muted-foreground">Monitor your typing accuracy and reduce errors over time</p>
          </article>
          <article className="bg-card/50 border border-border rounded-xl p-6 text-center">
            <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
            <h2 className="font-bold text-lg mb-2">Multiple Modes</h2>
            <p className="text-sm text-muted-foreground">Choose from time, word count, or famous quotes tests</p>
          </article>
          <article className="bg-card/50 border border-border rounded-xl p-6 text-center">
            <Trophy className="w-10 h-10 text-secondary mx-auto mb-3" />
            <h2 className="font-bold text-lg mb-2">Share Results</h2>
            <p className="text-sm text-muted-foreground">Screenshot and share your typing achievements</p>
          </article>
        </div>

        {/* Tips Section for SEO */}
        <div className="bg-card/30 border border-border rounded-xl p-8">
          <h2 className="text-2xl font-display font-bold mb-6 text-center">How to Improve Your Typing Speed</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <h3 className="font-bold text-foreground mb-2">1. Proper Finger Placement</h3>
              <p>Keep your fingers on the home row (ASDF JKL;) and return to this position after each keystroke.</p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">2. Don't Look at the Keyboard</h3>
              <p>Train yourself to type without looking. This builds muscle memory and increases speed.</p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">3. Focus on Accuracy First</h3>
              <p>Speed comes naturally with accuracy. Slow down to reduce errors, then gradually increase pace.</p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">4. Practice Regularly</h3>
              <p>Consistent daily practice of 15-30 minutes is more effective than occasional long sessions.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section for SEO */}
        <div className="mt-12">
          <h2 className="text-2xl font-display font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <details className="bg-card/30 border border-border rounded-lg p-4">
              <summary className="font-bold cursor-pointer">What is a good typing speed?</summary>
              <p className="mt-2 text-sm text-muted-foreground">Average typing speed is 40 WPM. 60-80 WPM is considered good, while 80+ WPM is excellent. Professional typists often exceed 100 WPM.</p>
            </details>
            <details className="bg-card/30 border border-border rounded-lg p-4">
              <summary className="font-bold cursor-pointer">How is WPM calculated?</summary>
              <p className="mt-2 text-sm text-muted-foreground">WPM (Words Per Minute) is calculated by dividing the total characters typed by 5 (standard word length), then dividing by the time in minutes.</p>
            </details>
            <details className="bg-card/30 border border-border rounded-lg p-4">
              <summary className="font-bold cursor-pointer">Is this typing test free?</summary>
              <p className="mt-2 text-sm text-muted-foreground">Yes! Rith Typing Pro is completely free with no sign-up required. Practice as much as you want.</p>
            </details>
          </div>
        </div>
      </section>

      <Footer />
      <ResultModal />
    </div>
  );
}
