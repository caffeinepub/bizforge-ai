import { Flame, Type, Image, FileText, BarChart2, Palette, MessageSquare, ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export type ToolId =
  | 'brand-names'
  | 'logo-concept'
  | 'marketing-content'
  | 'sentiment-analysis'
  | 'color-palette'
  | 'chatbot';

interface NavItem {
  id: ToolId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const navItems: NavItem[] = [
  {
    id: 'brand-names',
    label: 'Brand Name Generator',
    icon: Type,
    description: '15 unique brand names',
  },
  {
    id: 'logo-concept',
    label: 'Logo Concept Generator',
    icon: Image,
    description: 'Detailed logo concepts',
  },
  {
    id: 'marketing-content',
    label: 'Marketing Content',
    icon: FileText,
    description: 'Copy & captions',
  },
  {
    id: 'sentiment-analysis',
    label: 'Sentiment Analysis',
    icon: BarChart2,
    description: 'Review classification',
  },
  {
    id: 'color-palette',
    label: 'Color Palette Generator',
    icon: Palette,
    description: 'Brand color palettes',
  },
  {
    id: 'chatbot',
    label: 'BizForge AI Chatbot',
    icon: MessageSquare,
    description: 'Branding consultant',
  },
];

interface SidebarProps {
  activeTool: ToolId;
  onToolSelect: (tool: ToolId) => void;
}

export function Sidebar({ activeTool, onToolSelect }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">
            <Flame className="w-4 h-4 text-background" />
          </div>
          <div>
            <span className="font-display font-bold text-lg text-foreground tracking-tight">BizForge</span>
            <span className="font-display font-bold text-lg gold-text tracking-tight"> AI</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 font-body">Professional Branding Studio</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-2 mb-3">
          AI Tools
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTool === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onToolSelect(item.id);
                setMobileOpen(false);
              }}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group',
                isActive
                  ? 'bg-gold/10 text-gold border border-gold/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
              )}
            >
              <Icon
                className={cn(
                  'w-4 h-4 flex-shrink-0 transition-colors',
                  isActive ? 'text-gold' : 'text-muted-foreground group-hover:text-foreground'
                )}
              />
              <div className="flex-1 min-w-0">
                <p className={cn('text-sm font-medium truncate', isActive ? 'text-gold' : '')}>
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground truncate">{item.description}</p>
              </div>
              {isActive && <ChevronRight className="w-3 h-3 text-gold flex-shrink-0" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-xs text-muted-foreground">AI Engine Active</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-card border border-border rounded-lg p-2 text-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-72 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-sidebar border-r border-sidebar-border h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
}
