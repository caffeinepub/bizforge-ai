import { useState } from 'react';
import { Sparkles, Loader2, Copy, Check, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGenerateBrandNames } from '@/hooks/useQueries';
import { BrandTone } from '@/backend';
import { cn } from '@/lib/utils';

const toneOptions = [
  { value: BrandTone.innovative, label: 'Innovative' },
  { value: BrandTone.modern, label: 'Modern' },
  { value: BrandTone.playful, label: 'Playful' },
  { value: BrandTone.trustworthy, label: 'Trustworthy' },
  { value: BrandTone.luxury, label: 'Luxury' },
];

export function BrandNameGenerator() {
  const [industry, setIndustry] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState<BrandTone>(BrandTone.modern);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const { mutate, data: brandNames, isPending, error } = useGenerateBrandNames();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry.trim() || !keywords.trim()) return;
    mutate({ industry: industry.trim(), mainKeywords: keywords.trim(), brandTone: tone });
  };

  const handleCopy = async (name: string, index: number) => {
    await navigator.clipboard.writeText(name);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
          <Type className="w-5 h-5 text-background" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Brand Name Generator</h2>
          <p className="text-sm text-muted-foreground">Generate 15 unique, memorable brand names tailored to your vision</p>
        </div>
      </div>

      {/* Form */}
      <Card className="bg-card border-border card-glow">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg text-foreground">Define Your Brand</CardTitle>
          <CardDescription>Fill in the details below to generate creative brand names</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-sm font-medium text-foreground">
                  Industry <span className="text-gold">*</span>
                </Label>
                <Input
                  id="industry"
                  placeholder="e.g. Fashion, FinTech, Health..."
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="bg-secondary/40 border-border focus:border-gold/50 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords" className="text-sm font-medium text-foreground">
                  Main Keywords <span className="text-gold">*</span>
                </Label>
                <Input
                  id="keywords"
                  placeholder="e.g. speed, trust, innovation..."
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="bg-secondary/40 border-border focus:border-gold/50 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Brand Tone <span className="text-gold">*</span>
              </Label>
              <Select value={tone} onValueChange={(v) => setTone(v as BrandTone)}>
                <SelectTrigger className="bg-secondary/40 border-border focus:border-gold/50 text-foreground w-full md:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {toneOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-foreground hover:bg-secondary">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              disabled={isPending || !industry.trim() || !keywords.trim()}
              className="gold-gradient text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Names...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate 15 Brand Names
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          {error.message}
        </div>
      )}

      {/* Results */}
      {brandNames && brandNames.length > 0 && (
        <Card className="bg-card border-border card-glow animate-fade-in">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-lg text-foreground">Generated Brand Names</CardTitle>
              <Badge className="bg-gold/10 text-gold border-gold/20 border">
                {brandNames.length} names
              </Badge>
            </div>
            <CardDescription>Click any name to copy it to your clipboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {brandNames.map((name, index) => (
                <button
                  key={index}
                  onClick={() => handleCopy(name, index)}
                  className={cn(
                    'group flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 text-left',
                    'bg-secondary/30 border-border hover:border-gold/40 hover:bg-gold/5 card-glow-hover'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gold/60 w-5">{String(index + 1).padStart(2, '0')}</span>
                    <span className="font-display font-semibold text-foreground group-hover:text-gold transition-colors">
                      {name}
                    </span>
                  </div>
                  {copiedIndex === index ? (
                    <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
