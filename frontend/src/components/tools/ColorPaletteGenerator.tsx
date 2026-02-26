import { useState } from 'react';
import { Palette, Loader2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGenerateColorPalette } from '@/hooks/useQueries';
import { BrandTone } from '@/backend';

const toneOptions = [
  { value: BrandTone.innovative, label: 'Innovative' },
  { value: BrandTone.modern, label: 'Modern' },
  { value: BrandTone.playful, label: 'Playful' },
  { value: BrandTone.trustworthy, label: 'Trustworthy' },
  { value: BrandTone.luxury, label: 'Luxury' },
];

interface ColorSwatchProps {
  color: string;
  label: string;
  meaning?: string;
  large?: boolean;
}

function ColorSwatch({ color, label, meaning, large }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleCopy}
        className="group relative rounded-xl overflow-hidden border border-border transition-all hover:scale-105 hover:shadow-lg"
        style={{ height: large ? '120px' : '80px' }}
        title={`Copy ${color}`}
      >
        <div className="w-full h-full" style={{ backgroundColor: color }} />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          {copied ? (
            <Check className="w-5 h-5 text-white" />
          ) : (
            <Copy className="w-5 h-5 text-white" />
          )}
        </div>
      </button>
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs border-border text-muted-foreground">
            {label}
          </Badge>
          <span className="text-xs font-mono text-foreground">{color}</span>
        </div>
        {meaning && (
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{meaning}</p>
        )}
      </div>
    </div>
  );
}

export function ColorPaletteGenerator() {
  const [industry, setIndustry] = useState('');
  const [tone, setTone] = useState<BrandTone>(BrandTone.modern);

  const { mutate, data: palette, isPending, error } = useGenerateColorPalette();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry.trim()) return;
    mutate({ industry: industry.trim(), brandTone: tone });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
          <Palette className="w-5 h-5 text-background" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Color Palette Generator</h2>
          <p className="text-sm text-muted-foreground">Generate professional brand color palettes with emotional meaning</p>
        </div>
      </div>

      {/* Form */}
      <Card className="bg-card border-border card-glow">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg text-foreground">Brand Parameters</CardTitle>
          <CardDescription>Define your industry and personality to get a tailored color palette</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="colorIndustry" className="text-sm font-medium text-foreground">
                  Industry <span className="text-gold">*</span>
                </Label>
                <Input
                  id="colorIndustry"
                  placeholder="e.g. Fashion, FinTech, Health..."
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="bg-secondary/40 border-border focus:border-gold/50 text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Brand Personality <span className="text-gold">*</span>
                </Label>
                <Select value={tone} onValueChange={(v) => setTone(v as BrandTone)}>
                  <SelectTrigger className="bg-secondary/40 border-border focus:border-gold/50 text-foreground">
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
            </div>
            <Button
              type="submit"
              disabled={isPending || !industry.trim()}
              className="gold-gradient text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Palette...
                </>
              ) : (
                <>
                  <Palette className="w-4 h-4 mr-2" />
                  Generate Color Palette
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
      {palette && (
        <Card className="bg-card border-border card-glow animate-fade-in">
          <CardHeader className="pb-4">
            <CardTitle className="font-display text-lg text-foreground">Your Brand Color Palette</CardTitle>
            <CardDescription>Click any swatch to copy the HEX code</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Full palette preview */}
            <div className="flex rounded-xl overflow-hidden mb-6 h-16 border border-border">
              <div className="flex-[2]" style={{ backgroundColor: palette.primaryColor }} />
              {palette.secondaryColors.map((color, i) => (
                <div key={i} className="flex-1" style={{ backgroundColor: color }} />
              ))}
              <div className="flex-1" style={{ backgroundColor: palette.accentColor }} />
            </div>

            {/* Individual swatches */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorSwatch
                color={palette.primaryColor}
                label="Primary"
                meaning={palette.colorMeanings[0]}
                large
              />
              {palette.secondaryColors.map((color, i) => (
                <ColorSwatch
                  key={i}
                  color={color}
                  label={`Secondary ${i + 1}`}
                  meaning={palette.colorMeanings[i + 1]}
                  large
                />
              ))}
              <ColorSwatch
                color={palette.accentColor}
                label="Accent"
                meaning={palette.colorMeanings[palette.colorMeanings.length - 1]}
                large
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
