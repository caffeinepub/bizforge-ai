import { useState } from 'react';
import { BarChart2, Loader2, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAnalyzeSentiment } from '@/hooks/useQueries';
import { Variant_negative_positive_neutral } from '@/backend';
import { cn } from '@/lib/utils';

const sentimentConfig = {
  [Variant_negative_positive_neutral.positive]: {
    label: 'Positive',
    icon: ThumbsUp,
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    bgClass: 'bg-emerald-500/5 border-emerald-500/20',
    iconClass: 'text-emerald-400',
    barColor: '#10b981',
  },
  [Variant_negative_positive_neutral.negative]: {
    label: 'Negative',
    icon: ThumbsDown,
    badgeClass: 'bg-red-500/10 text-red-400 border-red-500/20',
    bgClass: 'bg-red-500/5 border-red-500/20',
    iconClass: 'text-red-400',
    barColor: '#ef4444',
  },
  [Variant_negative_positive_neutral.neutral]: {
    label: 'Neutral',
    icon: Minus,
    badgeClass: 'bg-secondary text-muted-foreground border-border',
    bgClass: 'bg-secondary/30 border-border',
    iconClass: 'text-muted-foreground',
    barColor: '#6b7280',
  },
};

const exampleReviews = [
  "This product completely transformed my workflow. Absolutely love it!",
  "Terrible experience. The product broke after two days and support was unhelpful.",
  "It's okay. Does what it says, nothing more, nothing less.",
];

export function SentimentAnalyzer() {
  const [reviewText, setReviewText] = useState('');

  const { mutate, data: sentiment, isPending, error } = useAnalyzeSentiment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    mutate({ reviewText: reviewText.trim() });
  };

  const config = sentiment ? sentimentConfig[sentiment.sentimentType] : null;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
          <BarChart2 className="w-5 h-5 text-background" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Sentiment Analysis</h2>
          <p className="text-sm text-muted-foreground">Classify customer reviews as Positive, Negative, or Neutral</p>
        </div>
      </div>

      {/* Form */}
      <Card className="bg-card border-border card-glow">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg text-foreground">Customer Review</CardTitle>
          <CardDescription>Paste a customer review to analyze its sentiment</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="reviewText" className="text-sm font-medium text-foreground">
                Review Text <span className="text-gold">*</span>
              </Label>
              <Textarea
                id="reviewText"
                placeholder="Paste your customer review here..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="bg-secondary/40 border-border focus:border-gold/50 text-foreground placeholder:text-muted-foreground min-h-[120px] resize-none"
                required
              />
            </div>

            {/* Example reviews */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Try an example:</p>
              <div className="flex flex-wrap gap-2">
                {exampleReviews.map((review, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setReviewText(review)}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary/50 border border-border text-muted-foreground hover:text-foreground hover:border-gold/30 transition-all"
                  >
                    Example {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending || !reviewText.trim()}
              className="gold-gradient text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BarChart2 className="w-4 h-4 mr-2" />
                  Analyze Sentiment
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
      {sentiment && config && (
        <Card className={cn('border animate-fade-in', config.bgClass)}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0', config.bgClass, 'border')}>
                <config.icon className={cn('w-6 h-6', config.iconClass)} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display text-xl font-bold text-foreground">Sentiment Result</h3>
                  <Badge className={cn('border text-sm font-semibold', config.badgeClass)}>
                    {config.label}
                  </Badge>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{sentiment.explanation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
