import { Heart } from 'lucide-react';

export function Footer() {
  return (
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
  );
}
