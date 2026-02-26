import { ReactNode } from 'react';
import { Sidebar, ToolId } from './Sidebar';

interface AppLayoutProps {
  activeTool: ToolId;
  onToolSelect: (tool: ToolId) => void;
  children: ReactNode;
}

export function AppLayout({ activeTool, onToolSelect, children }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar activeTool={activeTool} onToolSelect={onToolSelect} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Hero header */}
        <header
          className="relative h-20 flex-shrink-0 flex items-center px-8 overflow-hidden"
          style={{
            backgroundImage: 'url(/assets/generated/hero-bg.dim_1440x320.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        >
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
          <div className="relative z-10 flex items-center justify-between w-full">
            <div className="pl-10 lg:pl-0">
              <h1 className="font-display text-xl font-bold text-foreground">
                Professional Branding Studio
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                AI-powered tools for modern brands
              </p>
            </div>
            <div className="flex items-center gap-2 bg-card/60 border border-gold/20 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-medium text-gold">BizForge AI</span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin p-6 lg:p-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="flex-shrink-0 border-t border-border px-8 py-3 flex items-center justify-between bg-card/30">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BizForge AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with{' '}
            <span className="text-gold">♥</span>{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'bizforge-ai'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-bright transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
