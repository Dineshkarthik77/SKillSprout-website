'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  generateCareerStoryboard,
  type GenerateCareerStoryboardOutput,
} from '@/ai/flows/generate-career-storyboard';
import { StoryboardCard } from './storyboard-card';
import { StoryboardModal } from './storyboard-modal';
import { Loader2, Compass } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type PageState = 'loading' | 'loaded' | 'error';
type StoryboardData = GenerateCareerStoryboardOutput;
type SelectedCardData = StoryboardData[0] | null;

export function StoryboardContent() {
  const searchParams = useSearchParams();
  const [pageState, setPageState] = useState<PageState>('loading');
  const [storyboardData, setStoryboardData] = useState<StoryboardData | null>(null);
  const [selectedCard, setSelectedCard] = useState<SelectedCardData>(null);

  useEffect(() => {
    const domain = searchParams.get('domain');
    if (!domain) {
      setPageState('error');
      return;
    }

    const fetchStoryboard = async () => {
      setPageState('loading');
      try {
        const result = await generateCareerStoryboard({ domain });
        setStoryboardData(result);
        setPageState('loaded');
      } catch (error) {
        console.error('Failed to generate career storyboard:', error);
        setPageState('error');
      }
    };

    fetchStoryboard();
  }, [searchParams]);

  if (pageState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center text-center h-96">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <h2 className="text-2xl font-headline font-semibold">
          Building Your Career Storyboard...
        </h2>
        <p className="text-muted-foreground">
          Our AI is analyzing your results to find the perfect roles for you.
        </p>
      </div>
    );
  }

  if (pageState === 'error' || !storyboardData) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load your career storyboard. Please try returning to the domain explorer and starting over.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <div className="text-center mb-12">
        <Compass className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          Your Interactive Career Storyboard
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          Based on your assessment, here are three career paths you're well-suited for. Explore the details and choose the one that excites you most.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {storyboardData.map((cardData) => (
          <StoryboardCard
            key={cardData.jobTitle}
            data={cardData}
            onViewDetails={() => setSelectedCard(cardData)}
          />
        ))}
      </div>
      
      {selectedCard && (
        <StoryboardModal
          isOpen={!!selectedCard}
          onClose={() => setSelectedCard(null)}
          data={selectedCard}
        />
      )}
    </div>
  );
}
