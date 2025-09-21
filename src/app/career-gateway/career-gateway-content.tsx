'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Loader2, Send } from 'lucide-react';

import {
  chatWithCareerGuide,
  type ChatWithCareerGuideHistory,
} from '@/ai/flows/chat-with-career-guide';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function CareerGatewayContent() {
  const [messages, setMessages] = useState<ChatWithCareerGuideHistory>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
          viewport.scrollTop = viewport.scrollHeight;
        }
      }
    }, 100);
  };

  useEffect(() => {
    const startConversation = async () => {
      setIsLoading(true);
      try {
        const result = await chatWithCareerGuide([]);
        setMessages([{ role: 'model', content: result.response }]);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to start conversation with AI guide.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    startConversation();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user' as const, content: inputValue };
    const newMessages: ChatWithCareerGuideHistory = [...messages, userMessage];

    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);
    scrollToBottom();

    try {
      const result = await chatWithCareerGuide(newMessages);
      setMessages((prev) => [...prev, { role: 'model', content: result.response }]);
      scrollToBottom();

      if (result.recommendedDomain && result.recommendedDomain !== 'undetermined') {
        toast({
          title: 'Recommendation Found!',
          description: `We've identified a great career path for you in ${result.recommendedDomain}. Redirecting...`,
        });
        setTimeout(() => {
          router.push(`/domain-explorer?recommendation=${result.recommendedDomain}`);
        }, 2000);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get response from AI guide.',
      });
      setMessages(messages);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl h-[80vh] flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">AI Career Gateway</CardTitle>
        <CardDescription>Chat with our AI guide to discover your ideal career domain.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-grow pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'model' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <p
                  className={cn(
                    'max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  {message.content}
                </p>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <Bot className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <p className="bg-muted p-3 rounded-lg">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tell us about your interests..."
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !inputValue.trim()}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
