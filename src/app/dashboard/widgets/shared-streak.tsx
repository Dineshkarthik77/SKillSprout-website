'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DraggableCard } from '../draggable-card';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export function SharedStreak({ id }: { id: string }) {
  const contribution = 35;
  
  return (
    <DraggableCard id={id}>
      <CardHeader>
        <CardTitle>Shared Project: Eco-Drone</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Image 
          src="https://picsum.photos/seed/project-drone/400/200"
          alt="Eco-Drone Project"
          width={400}
          height={200}
          className="rounded-md object-cover"
          data-ai-hint="drone forest"
        />
        <div className="flex -space-x-2">
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/150?img=1" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
           <Avatar>
            <AvatarImage src="https://i.pravatar.cc/150?img=2" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
           <Avatar>
            <AvatarImage src="https://i.pravatar.cc/150?img=3" />
            <AvatarFallback>U3</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span>Your Contribution</span>
            <span>{contribution}%</span>
          </div>
          <Progress value={contribution} />
        </div>
        <Button asChild className="w-full" variant="secondary">
          <Link href="#">View Leaderboard</Link>
        </Button>
      </CardContent>
    </DraggableCard>
  );
}
