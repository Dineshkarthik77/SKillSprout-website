import type { LucideIcon } from 'lucide-react';

export type FeedPost = {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  timestamp: string;
  message: string;
  imageUrl?: string;
  imageHint?: string;
  likes: number;
  comments: number;
};

export const mockFeedPosts: FeedPost[] = [
  {
    id: '1',
    user: {
      name: 'Jane Doe',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
    },
    timestamp: '2h ago',
    message: 'Just completed the first module in my new learning path! The 3D model of the rocket is so cool. 🚀 #SkillSprout #LearnAndGrow',
    imageUrl: 'https://picsum.photos/seed/feed1/600/400',
    imageHint: 'rocket launch',
    likes: 125,
    comments: 12,
  },
  {
    id: '2',
    user: {
      name: 'John Smith',
      avatarUrl: 'https://i.pravatar.cc/150?img=8',
    },
    timestamp: '5h ago',
    message: 'The AI career guide suggested a path in Healthcare, and I\'m loving the initial assessment. It feels very personalized.',
    likes: 88,
    comments: 5,
  },
   {
    id: '3',
    user: {
      name: 'Alex Ray',
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
    },
    timestamp: '1d ago',
    message: 'Our team\'s Eco-Drone project is really coming along! My contributions are up to 35%. Check out our progress on the dashboard!',
    imageUrl: 'https://picsum.photos/seed/feed2/600/400',
    imageHint: 'drone forest',
    likes: 210,
    comments: 34,
  },
];
