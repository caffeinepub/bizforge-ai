import React, { useRef, useState } from 'react';
import { Loader2, Download, Sparkles, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGenerateLogoConcept } from '@/hooks/useQueries';
import { BrandTone, LogoConcept } from '../../backend';
import { buildLogoVariants, exportToPNG, LogoVariant } from '@/hooks/useLogoRenderer';

const logoVariants: LogoVariant[] = buildLogoVariants();

interface LogoCardProps {
  variant: LogoVariant;
  concept: LogoConcept;
  brandName: string;
}

function LogoCard({ variant, concept, brandName }: LogoCardProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleDownload = () => {
    if (svgRef.current) {
      exportToPNG(svgRef.current, brandName + '-' + variant.id);
    }
  };

  let svgContent: React.ReactElement | null = null;
  try {
    svgContent = variant.renderSVG(concept, brandName);
  } catch (e) {
    svgContent = null;
  }

  // Clone the SVG element to attach the ref
  const svgWithRef = svgContent
    ? React.cloneElement(svgContent, { ref: svgRef } as React.SVGProps<SVGSVGElement>)
    : null;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
      <div className="bg-muted/30 p-4 flex items-center justify-between border-b border-border">
        <span className="text-sm font-semibold text-foreground">{variant.name}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-gold-400"
          onClick={handleDownload}
          title="Download PNG"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 flex items-center justify-center bg-black/20 min-h-[140px]">
        {svgWithRef ? (
          <div className="w-full max-w-[280px]">{svgWithRef}</div>
        ) : (
          <div className="text-muted-foreground text-sm">Unable to render</div>
        )}
      </div>
    </div>
  );
}

export default function LogoConceptGenerator() {
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [tone, setTone] = useState<BrandTone>(BrandTone.modern);

  const { mutate, data: concept, isPending, isError } = useGenerateLogoConcept();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !industry.trim()) return;
    mutate({ brandName: brandName.trim(), industry: industry.trim(), brandTone: tone });
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gold-500/10">
            <Palette className="h-5 w-5 text-gold-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Logo Concept Generator</h2>
            <p className="text-sm text-muted-foreground">Generate 10 unique logo style variants for your brand</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logo-brand-name">Brand Name</Label>
              <Input
                id="logo-brand-name"
                placeholder="e.g. NovaTech"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo-industry">Industry</Label>
              <Input
                id="logo-industry"
                placeholder="e.g. Technology, Fashion"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo-tone">Brand Tone</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as BrandTone)}>
              <SelectTrigger id="logo-tone" className="bg-background border-border">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={BrandTone.modern}>Modern</SelectItem>
                <SelectItem value={BrandTone.luxury}>Luxury</SelectItem>
                <SelectItem value={BrandTone.playful}>Playful</SelectItem>
                <SelectItem value={BrandTone.trustworthy}>Trustworthy</SelectItem>
                <SelectItem value={BrandTone.innovative}>Innovative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={isPending || !brandName.trim() || !industry.trim()}
            className="w-full bg-gold-500 hover:bg-gold-600 text-black font-semibold"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Concepts...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Logo Concepts
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Error */}
      {isError && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-destructive text-sm">
          Failed to generate logo concepts. Please try again.
        </div>
      )}

      {/* Results */}
      {concept && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-gold-400" />
            <h3 className="text-lg font-bold text-foreground">
              10 Logo Variants for <span className="text-gold-400">{brandName}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {logoVariants.map((variant) => (
              <LogoCard
                key={variant.id}
                variant={variant}
                concept={concept}
                brandName={brandName}
              />
            ))}
          </div>

          {/* Concept Brief */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h4 className="font-bold text-foreground flex items-center gap-2">
              <Palette className="h-4 w-4 text-gold-400" />
              Brand Concept Brief
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Logo Style:</span>
                <span className="ml-2 text-foreground font-medium">{concept.logoStyle}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Font Style:</span>
                <span className="ml-2 text-foreground font-medium">{concept.fontStyle}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Icon Concept:</span>
                <span className="ml-2 text-foreground font-medium">{concept.iconConcept}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Background:</span>
                <span className="ml-2 text-foreground font-medium">{concept.backgroundStyle}</span>
              </div>
            </div>

            {/* Color Swatches */}
            <div>
              <p className="text-muted-foreground text-sm mb-2">Color Palette:</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full border border-border shadow"
                    style={{ backgroundColor: concept.primaryColor }}
                  />
                  <span className="text-xs text-muted-foreground">{concept.primaryColor}</span>
                </div>
                {concept.secondaryColors.map((color, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full border border-border shadow"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs text-muted-foreground">{color}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
