import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Friend } from './progress-snaps-content';

interface FriendListProps {
  friends: Friend[];
  selectedFriend: Friend | null;
  onSelectFriend: (friend: Friend) => void;
}

export function FriendList({ friends, selectedFriend, onSelectFriend }: FriendListProps) {
  return (
    <div className="flex flex-col h-full">
       <h2 className="p-4 text-xl font-headline border-b">Friends</h2>
       <ScrollArea className="flex-grow">
        {friends.map((friend) => (
          <button
            key={friend.id}
            onClick={() => onSelectFriend(friend)}
            className={cn(
              'flex items-center gap-3 p-4 w-full text-left hover:bg-muted/50 transition-colors',
              selectedFriend?.id === friend.id && 'bg-muted'
            )}
          >
            <div className="relative">
              <Avatar>
                <AvatarImage src={friend.avatar} />
                <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {friend.online && (
                 <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
              )}
            </div>
            <span className="font-medium">{friend.name}</span>
          </button>
        ))}
       </ScrollArea>
    </div>
  )
}
