import { useState } from 'react';
import { FileText, Loader2, Copy, Check, Instagram, Megaphone, AlignLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useGenerateMarketingContent } from '@/hooks/useQueries';
import { BrandTone } from '@/backend';

const toneOptions = [
  { value: BrandTone.innovative, label: 'Innovative' },
  { value: BrandTone.modern, label: 'Modern' },
  { value: BrandTone.playful, label: 'Playful' },
  { value: BrandTone.trustworthy, label: 'Trustworthy' },
  { value: BrandTone.luxury, label: 'Luxury' },
];

interface ContentBlockProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  isNumbered?: boolean;
  items?: string[];
}

function ContentBlock({ icon: Icon, title, content, isNumbered, items }: ContentBlockProps) {
  const [copied, setCopied] = useState(false);

  const textToCopy = items ? items.join('\n\n') : content;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-5 rounded-xl bg-secondary/30 border border-border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gold-gradient flex items-center justify-center">
            <Icon className="w-3.5 h-3.5 text-background" />
          </div>
          <h3 className="font-display font-semibold text-foreground text-sm">{title}</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="w-7 h-7 text-muted-foreground hover:text-gold"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-gold" /> : <Copy className="w-3.5 h-3.5" />}
        </Button>
      </div>
      {items ? (
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-gold font-bold text-sm flex-shrink-0">{i + 1}.</span>
              <p className="text-sm text-foreground/90 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-foreground/90 leading-relaxed">{content}</p>
      )}
    </div>
  );
}

export function MarketingContentGenerator() {
  const [brandName, setBrandName] = useState('');
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState<BrandTone>(BrandTone.modern);

  const { mutate, data: content, isPending, error } = useGenerateMarketingContent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !description.trim() || !audience.trim()) return;
    mutate({
      brandName: brandName.trim(),
      productDescription: description.trim(),
      targetAudience: audience.trim(),
      tone,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
          <FileText className="w-5 h-5 text-background" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Marketing Content Generator</h2>
          <p className="text-sm text-muted-foreground">Create compelling copy, ads, and social media captions</p>
        </div>
      </div>

      {/* Form */}
      <Card className="bg-card border-border card-glow">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg text-foreground">Campaign Details</CardTitle>
          <CardDescription>Tell us about your brand and we'll craft the perfect marketing content</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="mktBrandName" className="text-sm font-medium text-foreground">
                  Brand Name <span className="text-gold">*</span>
                </Label>
                <Input
                  id="mktBrandName"
                  placeholder="e.g. Lumina, Vero..."
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="bg-secondary/40 border-border focus:border-gold/50 text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience" className="text-sm font-medium text-foreground">
                  Target Audience <span className="text-gold">*</span>
                </Label>
                <Input
                  id="audience"
                  placeholder="e.g. Young professionals, 25-35..."
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="bg-secondary/40 border-border focus:border-gold/50 text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-foreground">
                Product / Service Description <span className="text-gold">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your product or service in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-secondary/40 border-border focus:border-gold/50 text-foreground placeholder:text-muted-foreground min-h-[100px] resize-none"
                required
              />
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
              disabled={isPending || !brandName.trim() || !description.trim() || !audience.trim()}
              className="gold-gradient text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Content...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Marketing Content
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
      {content && (
        <Card className="bg-card border-border card-glow animate-fade-in">
          <CardHeader className="pb-4">
            <CardTitle className="font-display text-lg text-foreground">Marketing Content Package</CardTitle>
            <CardDescription>Ready-to-use content for {brandName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ContentBlock
              icon={AlignLeft}
              title="Product Description"
              content={content.productDescription}
            />
            <ContentBlock
              icon={Megaphone}
              title="Advertisement Copy"
              content={content.advertisementCopy}
            />
            <ContentBlock
              icon={Instagram}
              title="Instagram Captions"
              content=""
              items={content.instagramCaptions}
              isNumbered
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
