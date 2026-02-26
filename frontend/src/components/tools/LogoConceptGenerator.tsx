import { useState } from 'react';
import { Wand2, Loader2, Image, Palette, Type, Layers, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGenerateLogoConcept } from '@/hooks/useQueries';
import { BrandTone } from '@/backend';

const toneOptions = [
  { value: BrandTone.innovative, label: 'Innovative' },
  { value: BrandTone.modern, label: 'Modern' },
  { value: BrandTone.playful, label: 'Playful' },
  { value: BrandTone.trustworthy, label: 'Trustworthy' },
  { value: BrandTone.luxury, label: 'Luxury' },
];

interface ConceptSectionProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  accent?: boolean;
}

function ConceptSection({ icon: Icon, title, content, accent }: ConceptSectionProps) {
  return (
    <div className="flex gap-4 p-4 rounded-xl bg-secondary/30 border border-border">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${accent ? 'gold-gradient' : 'bg-secondary'}`}>
        <Icon className={`w-4 h-4 ${accent ? 'text-background' : 'text-muted-foreground'}`} />
      </div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{title}</p>
        <p className="text-sm text-foreground leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

export function LogoConceptGenerator() {
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [tone, setTone] = useState<BrandTone>(BrandTone.modern);

  const { mutate, data: concept, isPending, error } = useGenerateLogoConcept();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !industry.trim()) return;
    mutate({ brandName: brandName.trim(), industry: industry.trim(), brandTone: tone });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
          <Image className="w-5 h-5 text-background" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Logo Concept Generator</h2>
          <p className="text-sm text-muted-foreground">Get a detailed logo concept brief ready for your designer</p>
        </div>
      </div>

      {/* Form */}
      <Card className="bg-card border-border card-glow">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg text-foreground">Brand Details</CardTitle>
          <CardDescription>Provide your brand information to generate a comprehensive logo concept</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="brandName" className="text-sm font-medium text-foreground">
                  Brand Name <span className="text-gold">*</span>
                </Label>
                <Input
                  id="brandName"
                  placeholder="e.g. Lumina, Vero, Nexify..."
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="bg-secondary/40 border-border focus:border-gold/50 text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logoIndustry" className="text-sm font-medium text-foreground">
                  Industry <span className="text-gold">*</span>
                </Label>
                <Input
                  id="logoIndustry"
                  placeholder="e.g. Fashion, FinTech, Health..."
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="bg-secondary/40 border-border focus:border-gold/50 text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Brand Personality <span className="text-gold">*</span>
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
              disabled={isPending || !brandName.trim() || !industry.trim()}
              className="gold-gradient text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Concept...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Logo Concept
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
      {concept && (
        <Card className="bg-card border-border card-glow animate-fade-in">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-lg text-foreground">Logo Concept Brief</CardTitle>
              <Badge className="bg-gold/10 text-gold border-gold/20 border">
                {brandName}
              </Badge>
            </div>
            <CardDescription>Share this brief with your graphic designer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ConceptSection icon={Layers} title="Logo Style" content={concept.logoStyle} accent />
            <ConceptSection icon={Type} title="Font Style" content={concept.fontStyle} />
            <ConceptSection icon={Wand2} title="Icon / Symbol Concept" content={concept.iconConcept} />
            <ConceptSection icon={Monitor} title="Background Style" content={concept.backgroundStyle} />

            {/* Colors */}
            <div className="p-4 rounded-xl bg-secondary/30 border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Color Palette</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg border border-border shadow-sm flex-shrink-0"
                    style={{ backgroundColor: concept.primaryColor }}
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">Primary</p>
                    <p className="text-xs font-mono text-foreground">{concept.primaryColor}</p>
                  </div>
                </div>
                {concept.secondaryColors.map((color, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg border border-border shadow-sm flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">Secondary {i + 1}</p>
                      <p className="text-xs font-mono text-foreground">{color}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
