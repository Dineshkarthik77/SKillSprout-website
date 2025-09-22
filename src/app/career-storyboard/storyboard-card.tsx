import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import type { GenerateCareerStoryboardOutput } from '@/ai/flows/generate-career-storyboard';

type CardData = GenerateCareerStoryboardOutput[0];

interface StoryboardCardProps {
  data: CardData;
  onViewDetails: () => void;
}

const demandColors: Record<string, string> = {
  "High Demand": "bg-green-100 text-green-800 border-green-200",
  "Growing Market": "bg-blue-100 text-blue-800 border-blue-200",
  "Stable": "bg-gray-100 text-gray-800 border-gray-200",
};

export function StoryboardCard({ data, onViewDetails }: StoryboardCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{data.jobTitle}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Badge variant="outline" className={demandColors[data.demand]}>{data.demand}</Badge>
      </CardContent>
      <CardFooter>
        <Button onClick={onViewDetails} className="w-full">
          View Details
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
