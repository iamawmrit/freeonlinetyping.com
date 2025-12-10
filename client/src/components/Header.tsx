import { Crown, Settings, Bell, User } from 'lucide-react';
import { Link } from 'wouter';

export function Header() {
  return (
    <header className="w-full py-8 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
            <Crown className="w-6 h-6 text-primary" />
            <div className="absolute inset-0 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-display text-2xl font-bold tracking-wider text-foreground group-hover:text-primary transition-colors">
              RITH
            </h1>
            <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase">Typing Pro</span>
          </div>
        </Link>
      </div>

      <nav className="flex items-center gap-6">
        <button className="p-2 text-muted-foreground hover:text-primary transition-colors relative group">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <button className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-card border border-border rounded-full hover:border-primary/50 transition-colors group">
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
            <User className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
          </div>
          <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground">Guest</span>
        </button>
      </nav>
    </header>
  );
}
