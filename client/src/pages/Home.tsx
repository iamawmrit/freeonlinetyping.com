import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TypingArea } from '@/components/TypingArea';
import { KeyboardDisplay } from '@/components/KeyboardDisplay';
import { ModeSelector } from '@/components/ModeSelector';
import { StatsDisplay } from '@/components/StatsDisplay';
import { ResultModal } from '@/components/ResultModal';
import { useTestStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Zap, Target, Clock, Trophy, CheckCircle } from 'lucide-react';

export default function Home() {
  const { status } = useTestStore();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Overlay for Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10 scanlines" aria-hidden="true" />

      <Header />

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 py-4 relative z-10" role="main">
        {/* H1 always present for SEO but visually hidden when not needed */}
        <h1 className="sr-only">Free Online Typing Speed Test - Check Your WPM</h1>

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

          {/* Keyboard - Slightly fade when running but stay visible */}
          <div className={cn(
            "transition-opacity duration-500 mt-8",
            status === 'running' ? "opacity-60" : "opacity-100"
          )} aria-hidden={status === 'running'}>
            <KeyboardDisplay />
          </div>
        </div>

        {/* Footer Instructions */}
        <div className={cn(
          "mt-6 text-center text-sm text-muted-foreground font-mono transition-opacity duration-300",
          status === 'running' ? "opacity-0" : "opacity-100"
        )} aria-label="Keyboard shortcuts">
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
      )} aria-label="About typing test">

        {/* Visible H1 for SEO */}
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4 text-primary">
          Test Your Typing Speed Online
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
          Measure your typing speed in WPM (words per minute) and accuracy with our free typing test. No registration required - start typing now!
        </p>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm">
          <span className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-full border border-border">
            <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
            <span>100% Free</span>
          </span>
          <span className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-full border border-border">
            <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
            <span>No Sign-up</span>
          </span>
          <span className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-full border border-border">
            <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
            <span>Instant Results</span>
          </span>
          <span className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-full border border-border">
            <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
            <span>Mobile Friendly</span>
          </span>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" role="list" aria-label="Features">
          <article className="bg-card/50 border border-border rounded-xl p-6 text-center" role="listitem">
            <Zap className="w-10 h-10 text-primary mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-bold text-lg mb-2">Real-time WPM</h3>
            <p className="text-sm text-muted-foreground">Track your words per minute as you type with instant feedback</p>
          </article>
          <article className="bg-card/50 border border-border rounded-xl p-6 text-center" role="listitem">
            <Target className="w-10 h-10 text-secondary mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-bold text-lg mb-2">Accuracy Tracking</h3>
            <p className="text-sm text-muted-foreground">Monitor your typing accuracy and reduce errors over time</p>
          </article>
          <article className="bg-card/50 border border-border rounded-xl p-6 text-center" role="listitem">
            <Clock className="w-10 h-10 text-primary mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-bold text-lg mb-2">Multiple Modes</h3>
            <p className="text-sm text-muted-foreground">Choose from time-based, word count, or quote typing tests</p>
          </article>
          <article className="bg-card/50 border border-border rounded-xl p-6 text-center" role="listitem">
            <Trophy className="w-10 h-10 text-secondary mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-bold text-lg mb-2">Share Results</h3>
            <p className="text-sm text-muted-foreground">Screenshot and share your typing speed achievements</p>
          </article>
        </div>

        {/* Tips Section for SEO */}
        <section className="bg-card/30 border border-border rounded-xl p-8 mb-12" aria-labelledby="tips-heading">
          <h2 id="tips-heading" className="text-2xl font-display font-bold mb-6 text-center">How to Improve Your Typing Speed</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <h3 className="font-bold text-foreground mb-2">1. Proper Finger Placement</h3>
              <p>Keep your fingers on the home row (ASDF JKL;) and return to this position after each keystroke. This is the foundation of touch typing.</p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">2. Don't Look at the Keyboard</h3>
              <p>Train yourself to type without looking at the keys. This builds muscle memory and significantly increases your typing speed over time.</p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">3. Focus on Accuracy First</h3>
              <p>Speed comes naturally with accuracy. Slow down to reduce errors, then gradually increase your pace as you become more comfortable.</p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">4. Practice Regularly</h3>
              <p>Consistent daily practice of 15-30 minutes is more effective than occasional long sessions. Use this typing test daily to track progress.</p>
            </div>
          </div>
        </section>

        {/* WPM Chart Section */}
        <section className="bg-card/30 border border-border rounded-xl p-8 mb-12" aria-labelledby="wpm-chart-heading">
          <h2 id="wpm-chart-heading" className="text-2xl font-display font-bold mb-6 text-center">Typing Speed Chart - What's a Good WPM?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" role="table">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-bold">WPM Range</th>
                  <th className="text-left py-3 px-4 font-bold">Skill Level</th>
                  <th className="text-left py-3 px-4 font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">0-30 WPM</td>
                  <td className="py-3 px-4 text-red-400">Beginner</td>
                  <td className="py-3 px-4">Still learning keyboard layout</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">31-40 WPM</td>
                  <td className="py-3 px-4 text-orange-400">Average</td>
                  <td className="py-3 px-4">Typical casual computer user</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">41-60 WPM</td>
                  <td className="py-3 px-4 text-yellow-400">Above Average</td>
                  <td className="py-3 px-4">Good for most office jobs</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">61-80 WPM</td>
                  <td className="py-3 px-4 text-green-400">Fast</td>
                  <td className="py-3 px-4">Professional typist level</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">80+ WPM</td>
                  <td className="py-3 px-4 text-primary">Expert</td>
                  <td className="py-3 px-4">Top 5% of typists</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className="mb-12" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-display font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <details className="bg-card/30 border border-border rounded-lg p-4 group">
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                What is a good typing speed?
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">The average typing speed is around 40 WPM (words per minute). A speed of 60-80 WPM is considered good and suitable for most professional jobs. Speeds above 80 WPM are excellent, and professional typists often exceed 100 WPM.</p>
            </details>
            <details className="bg-card/30 border border-border rounded-lg p-4 group">
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                How is WPM calculated?
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">WPM (Words Per Minute) is calculated by dividing the total number of characters typed by 5 (the standard word length), then dividing by the time elapsed in minutes. For example, typing 200 characters in 1 minute equals 40 WPM.</p>
            </details>
            <details className="bg-card/30 border border-border rounded-lg p-4 group">
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                Is this typing test free?
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">Yes! This typing test at freeonlinetyping.com is completely free with no sign-up or registration required. You can practice as much as you want and track your improvement over time.</p>
            </details>
            <details className="bg-card/30 border border-border rounded-lg p-4 group">
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                How can I improve my typing speed?
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">Practice regularly using proper touch typing technique. Keep your fingers on the home row, don't look at the keyboard, focus on accuracy before speed, and practice for 15-30 minutes daily. Consistent practice is key to improvement.</p>
            </details>
            <details className="bg-card/30 border border-border rounded-lg p-4 group">
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                What is touch typing?
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">Touch typing is a method of typing without looking at the keyboard. Your fingers rest on the home row (ASDF for left hand, JKL; for right hand) and each finger is responsible for specific keys. This technique allows for faster and more accurate typing.</p>
            </details>
          </div>
        </section>

        {/* Additional SEO Content */}
        <section className="text-center text-sm text-muted-foreground max-w-3xl mx-auto">
          <p className="mb-4">
            <strong className="text-foreground">freeonlinetyping.com</strong> is a free online typing speed test that helps you measure and improve your typing skills. Whether you're a student, professional, or just want to type faster, our typing test provides accurate WPM measurements and detailed statistics.
          </p>
          <p>
            Practice with different test modes including timed tests (15s, 30s, 60s), word count tests (10, 25, 50, 100 words), and quote typing. Track your progress and become a faster, more accurate typist today!
          </p>
        </section>
      </section>

      <Footer />
      <ResultModal />
    </div>
  );
}
