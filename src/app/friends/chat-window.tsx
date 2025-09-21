'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Camera } from 'lucide-react';
import { CameraModal } from './camera-modal';
import { cn } from '@/lib/utils';
import type { Friend } from './progress-snaps-content';

type Message = {
  id: number;
  text: string;
  sender: 'me' | 'friend';
  avatar: string;
  image?: string;
};

export function ChatWindow({ friend }: { friend: Friend }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey! How's the new module coming along?", sender: 'friend', avatar: friend.avatar },
    { id: 2, text: "It's great! Just finished a level, check it out.", sender: 'me', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: 3, text: "", image: "https://picsum.photos/seed/progress-snap/300/400", sender: 'me', avatar: 'https://i.pravatar.cc/150?img=6' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, friend]);
  
  const addMessage = (text: string, image?: string) => {
    if (!text.trim() && !image) return;
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      image,
      sender: 'me',
      avatar: 'https://i.pravatar.cc/150?img=6' // Placeholder for current user avatar
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleSendSnap = (imageDataUri: string) => {
    addMessage("", imageDataUri);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage(inputValue);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-4 border-b">
        <Avatar>
          <AvatarImage src={friend.avatar} />
          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold">{friend.name}</h2>
      </div>

      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex items-end gap-2',
                msg.sender === 'me' ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.sender === 'friend' && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={msg.avatar} />
                  <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={cn(
                  'p-2 rounded-lg max-w-xs',
                  msg.image ? 'p-1' : 'p-3',
                  msg.sender === 'me'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {msg.text && <p>{msg.text}</p>}
                {msg.image && <img src={msg.image} alt="snap" className="rounded-md max-w-full h-auto" />}
              </div>
              
              {msg.sender === 'me' && (
                 <Avatar className="w-8 h-8">
                  <AvatarImage src={msg.avatar} />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow"
          />
          <Button type="button" variant="ghost" size="icon" onClick={() => setIsCameraOpen(true)}>
            <Camera className="w-5 h-5" />
            <span className="sr-only">Open camera</span>
          </Button>
          <Button type="submit" size="icon" disabled={!inputValue.trim()}>
            <Send className="w-5 h-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
      <CameraModal 
        isOpen={isCameraOpen} 
        onClose={() => setIsCameraOpen(false)}
        onSendSnap={handleSendSnap}
      />
    </div>
  );
}
