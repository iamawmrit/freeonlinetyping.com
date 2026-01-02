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
import { useEffect } from 'react';

interface HomeProps {
  preset?: {
    mode?: 'time' | 'words' | 'quote';
    duration?: number;
    wordCount?: number;
  };
  heading?: string;
  subheading?: string;
}

export default function Home({ preset, heading, subheading }: HomeProps) {
  const { status, setConfig, setMode } = useTestStore();

  // Apply preset configuration when component mounts
  useEffect(() => {
    if (preset) {
      if (preset.mode) {
        setMode(preset.mode);
      }
      const configUpdate: any = {};
      if (preset.duration !== undefined) {
        configUpdate.duration = preset.duration;
      }
      if (preset.wordCount !== undefined) {
        configUpdate.wordCount = preset.wordCount;
      }
      if (Object.keys(configUpdate).length > 0) {
        setConfig(configUpdate);
      }
    }
  }, [preset, setMode, setConfig]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Overlay for Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10 scanlines" aria-hidden="true" />

      <Header />

      {/* Custom heading for typing mode pages */}
      {heading && (
        <div className="text-center mb-8 mt-8 px-4 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {heading}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            {subheading}
          </p>
        </div>
      )}

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 py-8 md:py-12 relative z-10" role="main">
        {/* H1 always present for SEO but visually hidden when not needed */}
        <h1 className="sr-only">Free Online Typing Speed Test - Check Your WPM</h1>

        <div className={cn(
          "flex flex-col items-center w-full transition-all duration-500 ease-out max-w-5xl",
          status === 'running' ? "scale-[1.02]" : "scale-100"
        )}>
          {/* Stats Display with improved spacing */}
          <div className="mb-8 w-full">
            <StatsDisplay />
          </div>

          {/* Main Typing Area with card design */}
          <div className="w-full mb-12">
            <TypingArea />
          </div>

          {/* Keyboard - Slightly fade when running but stay visible */}
          <div className={cn(
            "transition-opacity duration-500 w-full flex justify-center",
            status === 'running' ? "opacity-50" : "opacity-100"
          )} aria-hidden={status === 'running'}>
            <KeyboardDisplay />
          </div>
        </div>

        {/* Footer Instructions with improved design */}
        <div className={cn(
          "mt-8 text-center text-sm transition-opacity duration-300",
          status === 'running' ? "opacity-0" : "opacity-100"
        )} aria-label="Keyboard shortcuts">
          <div className="flex items-center justify-center gap-6 md:gap-8 flex-wrap">
            <span className="flex items-center gap-2.5 text-muted-foreground">
              <kbd className="px-3 py-1.5 bg-muted rounded-md text-xs font-mono border border-border shadow-sm">tab</kbd>
              <span className="font-medium">restart test</span>
            </span>
            <span className="flex items-center gap-2.5 text-muted-foreground">
              <kbd className="px-3 py-1.5 bg-muted rounded-md text-xs font-mono border border-border shadow-sm">esc</kbd>
              <span className="font-medium">stop</span>
            </span>
          </div>
        </div>
      </main>

      {/* SEO Content Section - Hidden when typing */}
      <section className={cn(
        "w-full max-w-6xl mx-auto px-4 py-16 transition-opacity duration-300",
        status === 'running' ? "opacity-0 pointer-events-none h-0 overflow-hidden py-0" : "opacity-100"
      )} aria-label="About typing test">

        {/* Visible H2 for SEO with gradient */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-center mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Test Your Typing Speed Online
        </h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12 text-base md:text-lg leading-relaxed">
          Measure your typing speed in WPM (words per minute) and accuracy with our free typing test. No registration required - start typing now!
        </p>

        {/* Enhanced Structured Data for better SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Test Your Typing Speed',
            description: 'Learn how to use our free online typing test to measure your WPM and accuracy',
            totalTime: 'PT1M',
            tool: [{
              '@type': 'HowToTool',
              name: 'Computer or Mobile Device'
            }, {
              '@type': 'HowToTool',
              name: 'Keyboard'
            }],
            step: [{
              '@type': 'HowToStep',
              position: 1,
              name: 'Start the Test',
              text: 'Simply start typing the words displayed on screen. The timer starts automatically with your first keystroke.',
              url: 'https://freeonlinetyping.com/#step1'
            }, {
              '@type': 'HowToStep',
              position: 2,
              name: 'Type the Words',
              text: 'Type each word accurately. Correct mistakes with backspace. The test tracks your speed and accuracy in real-time.',
              url: 'https://freeonlinetyping.com/#step2'
            }, {
              '@type': 'HowToStep',
              position: 3,
              name: 'View Your Results',
              text: 'When time runs out or you complete all words, your WPM speed and accuracy percentage are displayed instantly.',
              url: 'https://freeonlinetyping.com/#step3'
            }]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'freeonlinetyping.com',
            url: 'https://freeonlinetyping.com',
            logo: 'https://freeonlinetyping.com/favicon.svg',
            sameAs: [
              'https://twitter.com/freeonlinetyping'
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              availableLanguage: 'English'
            }
          })}
        </script>

        {/* Quick Stats with improved design */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 text-sm">
          <span className="flex items-center gap-2.5 bg-gradient-to-br from-green-500/10 to-green-500/5 px-5 py-2.5 rounded-full border border-green-500/20 hover:border-green-500/40 transition-colors shadow-sm">
            <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
            <span className="font-medium">100% Free</span>
          </span>
          <span className="flex items-center gap-2.5 bg-gradient-to-br from-blue-500/10 to-blue-500/5 px-5 py-2.5 rounded-full border border-blue-500/20 hover:border-blue-500/40 transition-colors shadow-sm">
            <CheckCircle className="w-4 h-4 text-blue-500" aria-hidden="true" />
            <span className="font-medium">No Sign-up</span>
          </span>
          <span className="flex items-center gap-2.5 bg-gradient-to-br from-purple-500/10 to-purple-500/5 px-5 py-2.5 rounded-full border border-purple-500/20 hover:border-purple-500/40 transition-colors shadow-sm">
            <CheckCircle className="w-4 h-4 text-purple-500" aria-hidden="true" />
            <span className="font-medium">Instant Results</span>
          </span>
          <span className="flex items-center gap-2.5 bg-gradient-to-br from-orange-500/10 to-orange-500/5 px-5 py-2.5 rounded-full border border-orange-500/20 hover:border-orange-500/40 transition-colors shadow-sm">
            <CheckCircle className="w-4 h-4 text-orange-500" aria-hidden="true" />
            <span className="font-medium">Mobile Friendly</span>
          </span>
        </div>

        {/* Features Grid with enhanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" role="list" aria-label="Features">
          <article className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300 group" role="listitem">
            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <Zap className="w-8 h-8 text-primary" aria-hidden="true" aria-label="Real-time tracking icon" />
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">Real-time WPM</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Track your words per minute as you type with instant feedback</p>
          </article>
          <article className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:border-accent/30 transition-all duration-300 group" role="listitem">
            <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
              <Target className="w-8 h-8 text-accent" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-accent transition-colors">Accuracy Tracking</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Monitor your typing accuracy and reduce errors over time</p>
          </article>
          <article className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300 group" role="listitem">
            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <Clock className="w-8 h-8 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">Multiple Modes</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Choose from time-based, word count, or quote typing tests</p>
          </article>
          <article className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:border-accent/30 transition-all duration-300 group" role="listitem">
            <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
              <Trophy className="w-8 h-8 text-accent" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-accent transition-colors">Share Results</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Screenshot and share your typing speed achievements</p>
          </article>
        </div>

        {/* Tips Section with enhanced design */}
        <section className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-10 mb-16 shadow-lg" aria-labelledby="tips-heading">
          <h2 id="tips-heading" className="text-2xl md:text-3xl font-display font-bold mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">How to Improve Your Typing Speed</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <h3 className="font-bold text-foreground text-base flex items-start gap-2">
                <span className="text-primary text-xl">1.</span>
                <span>Proper Finger Placement</span>
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed pl-7">Keep your fingers on the home row (ASDF JKL;) and return to this position after each keystroke. This is the foundation of touch typing.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-foreground text-base flex items-start gap-2">
                <span className="text-primary text-xl">2.</span>
                <span>Don't Look at the Keyboard</span>
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed pl-7">Train yourself to type without looking at the keys. This builds muscle memory and significantly increases your typing speed over time.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-foreground text-base flex items-start gap-2">
                <span className="text-primary text-xl">3.</span>
                <span>Focus on Accuracy First</span>
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed pl-7">Speed comes naturally with accuracy. Slow down to reduce errors, then gradually increase your pace as you become more comfortable.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-foreground text-base flex items-start gap-2">
                <span className="text-primary text-xl">4.</span>
                <span>Practice Regularly</span>
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed pl-7">Consistent daily practice of 15-30 minutes is more effective than occasional long sessions. Use this typing test daily to track progress.</p>
            </div>
          </div>
        </section>

        {/* WPM Chart with enhanced design */}
        <section className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-10 mb-16 shadow-lg" aria-labelledby="wpm-chart-heading">
          <h2 id="wpm-chart-heading" className="text-2xl md:text-3xl font-display font-bold mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Typing Speed Chart - What's a Good WPM?</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full" role="table">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left py-4 px-6 font-bold text-foreground">WPM Range</th>
                  <th className="text-left py-4 px-6 font-bold text-foreground">Skill Level</th>
                  <th className="text-left py-4 px-6 font-bold text-foreground">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium">0-30 WPM</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 font-medium text-sm border border-red-500/20">
                      Beginner
                    </span>
                  </td>
                  <td className="py-4 px-6">Still learning keyboard layout</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium">31-40 WPM</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 font-medium text-sm border border-orange-500/20">
                      Average
                    </span>
                  </td>
                  <td className="py-4 px-6">Typical casual computer user</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium">41-60 WPM</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 font-medium text-sm border border-yellow-500/20">
                      Above Average
                    </span>
                  </td>
                  <td className="py-4 px-6">Good for most office jobs</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium">61-80 WPM</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 font-medium text-sm border border-green-500/20">
                      Fast
                    </span>
                  </td>
                  <td className="py-4 px-6">Professional typist level</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium">80+ WPM</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20">
                      Expert
                    </span>
                  </td>
                  <td className="py-4 px-6">Top 5% of typists</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section with enhanced design */}
        <section className="mb-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-display font-bold mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <details className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border rounded-xl p-5 group hover:border-primary/30 transition-all">
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center text-base">
                <span>What is a good typing speed?</span>
                <span className="text-primary group-open:rotate-180 transition-transform text-xl">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">The average typing speed is around 40 WPM (words per minute). A speed of 60-80 WPM is considered good and suitable for most professional jobs. Speeds above 80 WPM are excellent, and professional typists often exceed 100 WPM.</p>
            </details>
            <details className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border rounded-xl p-5 group hover:border-primary/30 transition-all">
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center text-base">
                <span>How is WPM calculated?</span>
                <span className="text-primary group-open:rotate-180 transition-transform text-xl">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">WPM (Words Per Minute) is calculated by dividing the total number of characters typed by 5 (the standard word length), then dividing by the time elapsed in minutes. For example, typing 200 characters in 1 minute equals 40 WPM.</p>
            </details>
            <details className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border rounded-xl p-5 group hover:border-primary/30 transition-all">
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center text-base">
                <span>Is this typing test free?</span>
                <span className="text-primary group-open:rotate-180 transition-transform text-xl">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">Yes! This typing test at freeonlinetyping.com is completely free with no sign-up or registration required. You can practice as much as you want and track your improvement over time.</p>
            </details>
            <details className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border rounded-xl p-5 group hover:border-primary/30 transition-all">
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center text-base">
                <span>How can I improve my typing speed?</span>
                <span className="text-primary group-open:rotate-180 transition-transform text-xl">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">Practice regularly using proper touch typing technique. Keep your fingers on the home row, don't look at the keyboard, focus on accuracy before speed, and practice for 15-30 minutes daily. Consistent practice is key to improvement.</p>
            </details>
            <details className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border rounded-xl p-5 group hover:border-primary/30 transition-all">
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center text-base">
                <span>What is touch typing?</span>
                <span className="text-primary group-open:rotate-180 transition-transform text-xl">▼</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">Touch typing is a method of typing without looking at the keyboard. Your fingers rest on the home row (ASDF for left hand, JKL; for right hand) and each finger is responsible for specific keys. This technique allows for faster and more accurate typing.</p>
            </details>
          </div>
        </section>

        {/* Additional SEO Content with better styling and internal links */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            <strong className="text-foreground font-semibold">freeonlinetyping.com</strong> is a free online typing speed test that helps you measure and improve your typing skills. Whether you're a student, professional, or just want to type faster, our typing test provides accurate WPM measurements and detailed statistics.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Practice with different <a href="/typing-modes" className="text-primary hover:underline font-medium">test modes</a> including timed tests (<a href="/15-second-typing-test" className="text-primary hover:underline">15s</a>, <a href="/1-minute-typing-test" className="text-primary hover:underline">1min</a>, <a href="/5-minute-typing-test" className="text-primary hover:underline">5min</a>, <a href="/10-minute-typing-test" className="text-primary hover:underline">10min</a>), word count tests, and quote typing. Check out our <a href="/blog" className="text-primary hover:underline font-medium">typing blog</a> for tips and <a href="/blog?category=typing-speed" className="text-primary hover:underline font-medium">guides</a> to improve faster. Track your progress and become a faster, more accurate typist today!
          </p>
        </section>
      </section>

      <Footer />
      <ResultModal />
    </div>
  );
}
