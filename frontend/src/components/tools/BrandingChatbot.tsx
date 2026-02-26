import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Loader2, Mic, MicOff, Bot, User, Lightbulb, ListChecks, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useAskChatbot } from '@/hooks/useQueries';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { ChatbotResponse } from '@/backend';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  response?: ChatbotResponse;
  timestamp: Date;
}

const suggestedQuestions = [
  "How do I build a strong brand identity?",
  "What makes a logo memorable?",
  "How to write a compelling brand story?",
  "Best social media strategy for a new brand?",
];

export function BrandingChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = useAskChatbot();
  const {
    isRecording,
    transcript,
    error: speechError,
    isSupported: speechSupported,
    startRecording,
    stopRecording,
    resetTranscript,
  } = useSpeechRecognition();

  // Auto-fill input when transcript is ready
  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
      resetTranscript();
    }
  }, [transcript, resetTranscript]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollEl = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollEl) {
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
    }
  }, [messages, isPending]);

  const handleSend = (question?: string) => {
    const text = (question || inputValue).trim();
    if (!text || isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    mutate(
      { question: text },
      {
        onSuccess: (response) => {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response.explanation,
            response,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
        },
        onError: (err) => {
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `Sorry, I encountered an error: ${err.message}`,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorMessage]);
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMicToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-background" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">BizForge AI Chatbot</h2>
          <p className="text-sm text-muted-foreground">Your professional branding and marketing consultant</p>
        </div>
      </div>

      {/* Chat area */}
      <Card className="bg-card border-border card-glow flex flex-col" style={{ height: '520px' }}>
        <CardHeader className="pb-3 flex-shrink-0 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <CardTitle className="font-display text-base text-foreground">BizForge AI</CardTitle>
            </div>
            <Badge className="bg-gold/10 text-gold border-gold/20 border text-xs">
              Branding Expert
            </Badge>
          </div>
        </CardHeader>

        {/* Messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 py-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-background" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Ask BizForge AI anything
              </h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Get expert branding advice, marketing strategies, and business insights tailored to your needs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-xs text-left px-3 py-2.5 rounded-lg bg-secondary/50 border border-border text-muted-foreground hover:text-foreground hover:border-gold/30 hover:bg-gold/5 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-3',
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
                  {/* Avatar */}
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                      message.role === 'user'
                        ? 'bg-secondary border border-border'
                        : 'gold-gradient'
                    )}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Bot className="w-4 h-4 text-background" />
                    )}
                  </div>

                  {/* Message bubble */}
                  <div
                    className={cn(
                      'max-w-[75%] rounded-2xl px-4 py-3',
                      message.role === 'user'
                        ? 'bg-gold/10 border border-gold/20 rounded-tr-sm'
                        : 'bg-secondary/50 border border-border rounded-tl-sm'
                    )}
                  >
                    {message.role === 'assistant' && message.response ? (
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground/90 leading-relaxed">
                            {message.response.explanation}
                          </p>
                        </div>
                        {message.response.practicalSteps && (
                          <div className="pt-2 border-t border-border/50">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <ListChecks className="w-3 h-3 text-gold" />
                              <span className="text-xs font-semibold text-gold uppercase tracking-wider">Practical Steps</span>
                            </div>
                            <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line">
                              {message.response.practicalSteps}
                            </p>
                          </div>
                        )}
                        {message.response.marketingTips && (
                          <div className="pt-2 border-t border-border/50">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <TrendingUp className="w-3 h-3 text-gold" />
                              <span className="text-xs font-semibold text-gold uppercase tracking-wider">Marketing Tips</span>
                            </div>
                            <p className="text-xs text-foreground/80 leading-relaxed">
                              {message.response.marketingTips}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-foreground/90 leading-relaxed">{message.content}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isPending && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-background" />
                  </div>
                  <div className="bg-secondary/50 border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input area */}
        <div className="flex-shrink-0 border-t border-border p-4">
          {speechError && (
            <p className="text-xs text-destructive mb-2">{speechError}</p>
          )}
          {isRecording && (
            <div className="flex items-center gap-2 mb-2 px-1">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">Listening... speak now</span>
            </div>
          )}
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about branding, marketing, strategy..."
              disabled={isPending || isRecording}
              className="flex-1 bg-secondary/40 border-border focus:border-gold/50 text-foreground placeholder:text-muted-foreground"
            />
            {speechSupported && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleMicToggle}
                disabled={isPending}
                className={cn(
                  'border-border transition-all',
                  isRecording
                    ? 'bg-red-500/10 border-red-500/40 text-red-400 animate-pulse-ring'
                    : 'text-muted-foreground hover:text-gold hover:border-gold/40'
                )}
                title={isRecording ? 'Stop recording' : 'Start voice input'}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            )}
            <Button
              onClick={() => handleSend()}
              disabled={isPending || !inputValue.trim()}
              className="gold-gradient text-background hover:opacity-90 transition-opacity disabled:opacity-50"
              size="icon"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
