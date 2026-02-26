import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { Sidebar, ToolId } from './components/layout/Sidebar';
import { BrandNameGenerator } from './components/tools/BrandNameGenerator';
import LogoConceptGenerator from './components/tools/LogoConceptGenerator';
import { MarketingContentGenerator } from './components/tools/MarketingContentGenerator';
import { SentimentAnalyzer } from './components/tools/SentimentAnalyzer';
import { ColorPaletteGenerator } from './components/tools/ColorPaletteGenerator';
import { BrandingChatbot } from './components/tools/BrandingChatbot';

function ToolView({ activeTool }: { activeTool: ToolId }) {
  switch (activeTool) {
    case 'brand-names':
      return <BrandNameGenerator />;
    case 'logo-concept':
      return <LogoConceptGenerator />;
    case 'marketing-content':
      return <MarketingContentGenerator />;
    case 'sentiment-analysis':
      return <SentimentAnalyzer />;
    case 'color-palette':
      return <ColorPaletteGenerator />;
    case 'chatbot':
      return <BrandingChatbot />;
    default:
      return <BrandNameGenerator />;
  }
}

export default function App() {
  const [activeTool, setActiveTool] = useState<ToolId>('brand-names');

  return (
    <div className="dark">
      <AppLayout activeTool={activeTool} onToolSelect={setActiveTool}>
        <ToolView activeTool={activeTool} />
      </AppLayout>
    </div>
  );
}
