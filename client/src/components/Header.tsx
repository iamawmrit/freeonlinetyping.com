import { Keyboard } from 'lucide-react';
import { Link } from 'wouter';

export function Header() {
  return (
    <header className="w-full py-2 px-4 md:px-8 flex items-center justify-between">
      <nav aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2 group" aria-label="typing.awmrit.com - Home">
          <div className="relative w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
            <Keyboard className="w-5 h-5 text-primary" />
            <div className="absolute inset-0 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-wider text-foreground group-hover:text-primary transition-colors">
              typing
            </span>
            <span className="text-[10px] font-mono tracking-[0.15em] text-muted-foreground">.awmrit.com</span>
          </div>
        </Link>
      </nav>
    </header>
  );
}
