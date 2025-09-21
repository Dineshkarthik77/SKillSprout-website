'use client';

import { useState } from 'react';
import { FriendList } from './friend-list';
import { ChatWindow } from './chat-window';
import { Card } from '@/components/ui/card';

export type Friend = {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
};

const friendsData: Friend[] = [
  { id: 1, name: 'Alex', avatar: 'https://i.pravatar.cc/150?img=1', online: true },
  { id: 2, name: 'Sarah', avatar: 'https://i.pravatar.cc/150?img=2', online: false },
  { id: 3, name: 'Mike', avatar: 'https://i.pravatar.cc/150?img=3', online: true },
  { id: 4, name: 'Jen', avatar: 'https://i.pravatar.cc/150?img=4', online: false },
  { id: 5, name: 'Chris', avatar: 'https://i.pravatar.cc/150?img=5', online: true },
];

export function ProgressSnapsContent() {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(friendsData[0]);

  return (
    <div>
       <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          Progress Snaps
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Share your learning journey with friends.
        </p>
      </div>
      <Card className="grid grid-cols-1 md:grid-cols-3 h-[70vh] w-full max-w-5xl mx-auto">
        <FriendList
          friends={friendsData}
          selectedFriend={selectedFriend}
          onSelectFriend={setSelectedFriend}
        />
        <div className="md:col-span-2 border-l">
          {selectedFriend ? (
            <ChatWindow friend={selectedFriend} />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Select a friend to start chatting</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
