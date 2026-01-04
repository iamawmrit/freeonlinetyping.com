import { Keyboard, Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full py-2 px-4 md:px-8 border-b border-border/10 relative z-40">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" aria-label="freeonlinetyping.com - Home">
          <div className="relative w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
            <Keyboard className="w-5 h-5 text-primary" />
            <div className="absolute inset-0 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-wider text-foreground group-hover:text-primary transition-colors">
              Free Typing
            </span>
            <span className="text-[10px] font-mono tracking-[0.15em] text-muted-foreground">freeonlinetyping.com</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            href="/typing-modes"
            className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Typing Modes
          </Link>
          <Link
            href="/blog"
            className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/blog?category=typing-speed"
            className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Guides
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors z-50"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="fixed top-[60px] left-0 right-0 bottom-0 bg-background/98 backdrop-blur-sm border-b border-border/10 flex flex-col gap-1 md:hidden z-40 overflow-y-auto"
        >
          <Link
            href="/"
            className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/typing-modes"
            className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Typing Modes
          </Link>
          <Link
            href="/blog"
            className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/blog?category=typing-speed"
            className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Guides
          </Link>
        </nav>
      )}
    </header>
  );
}
