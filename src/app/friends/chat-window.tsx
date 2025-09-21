import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Paperclip, Camera, Smile } from 'lucide-react';
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

  const addMessage = (text: string, image?: string) => {
    if (!text && !image) return;
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-4 border-b">
        <Avatar>
          <AvatarImage src={friend.avatar} />
          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold">{friend.name}</h2>
      </div>

      <ScrollArea className="flex-grow p-4">
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
                  'p-3 rounded-lg max-w-xs',
                  msg.sender === 'me'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {msg.text && <p>{msg.text}</p>}
                {msg.image && <img src={msg.image} alt="snap" className="rounded-md" />}
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

      <div className="p-4 border-t">
        <div className="relative">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addMessage(inputValue)}
            placeholder="Type a message..."
            className="pr-24"
          />
          <div className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setIsCameraOpen(true)}>
              <Camera className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => addMessage(inputValue)}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      <CameraModal 
        isOpen={isCameraOpen} 
        onClose={() => setIsCameraOpen(false)}
        onSendSnap={handleSendSnap}
      />
    </div>
  );
}
