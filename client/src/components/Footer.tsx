import { Github, Twitter, MessageSquare, Shield, FileText, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full py-8 px-4 mt-auto border-t border-border/10 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground font-mono">
        
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="w-3 h-3" /> Contact
          </a>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <FileText className="w-3 h-3" /> Terms
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <Shield className="w-3 h-3" /> Privacy
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
            Security
          </a>
        </div>

        <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Cyber-Zenith v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
