import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <>
      {/* Sponsor Banner */}
      <div className="w-full py-4 px-4 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-b border-primary/20">
        <div className="container mx-auto">
          <p className="text-center text-sm font-semibold text-foreground">
            Interested in sponsoring? Contact us at{' '}
            <a
              href="mailto:sponsor@freeonlinetyping.com"
              className="text-primary hover:underline font-bold"
            >
              sponsor@freeonlinetyping.com
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 px-4 mt-auto border-t border-border/10 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">

          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()}</span>
            <span>Powered by</span>
            <a href="https://awmrit.com" target="_blank" rel="noopener" className="text-primary hover:underline">
              awmrit.com
            </a>
          </div>

          <div className="flex items-center">
            <span>freeonlinetyping.com</span>
          </div>
        </div>
      </footer>
    </>
  );
}
