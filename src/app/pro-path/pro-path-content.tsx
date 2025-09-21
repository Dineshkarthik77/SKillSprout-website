'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  getLearningRecommendations,
  type GetLearningRecommendationsOutput,
} from '@/ai/flows/personalized-career-recommendations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Trophy,
  Flag,
  Building,
  Rocket,
  BookOpen,
  Briefcase,
  Award,
  CheckCircle,
  Loader2,
  type LucideIcon,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type PageState = 'loading' | 'loaded' | 'error';

const phaseIcons: Record<number, LucideIcon> = {
  1: Flag,
  2: Building,
  3: Rocket,
};

const resourceIcons: Record<string, LucideIcon> = {
  Course: BookOpen,
  Project: Briefcase,
  Article: BookOpen,
  Video: BookOpen,
  Book: BookOpen,
  default: Award,
};

export function ProPathContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pageState, setPageState] = useState<PageState>('loading');
  const [data, setData] = useState<GetLearningRecommendationsOutput | null>(null);

  useEffect(() => {
    const gapsParam = searchParams.get('gaps');
    const styleParam = searchParams.get('style');

    if (!gapsParam || !styleParam) {
      router.push('/strategic-blueprint'); // A placeholder page
      return;
    }

    const fetchData = async () => {
      try {
        const gaps = JSON.parse(gapsParam);
        const result = await getLearningRecommendations({
          gaps,
          style: styleParam,
        });
        setData(result);
        setPageState('loaded');
      } catch (error) {
        console.error('Failed to get learning recommendations:', error);
        setPageState('error');
      }
    };

    fetchData();
  }, [searchParams, router]);

  if (pageState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center text-center h-96">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <h2 className="text-2xl font-headline font-semibold">
          Generating Your Personalized Pro Path...
        </h2>
        <p className="text-muted-foreground">
          Our AI is crafting the perfect learning journey just for you.
        </p>
      </div>
    );
  }

  if (pageState === 'error' || !data) {
    return (
       <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to generate your learning path. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Trophy className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          Your SkillSprout Pro Path
        </h1>
        <p className="text-lg text-muted-foreground mt-4">{data.intro}</p>
      </div>

      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        {data.phases.map((phase) => {
          const PhaseIcon = phaseIcons[phase.phase] || Flag;
          return (
            <AccordionItem key={phase.phase} value={`item-${phase.phase}`}>
              <AccordionTrigger className="text-xl font-headline hover:no-underline">
                <div className="flex items-center gap-4">
                  <PhaseIcon className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-left">
                      Phase {phase.phase}: {phase.title}
                    </h3>
                    <p className="text-sm font-normal text-muted-foreground text-left">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-8 border-l-2 border-primary/20 ml-5">
                <div className="space-y-6 pt-4">
                  {phase.resources.map((resource, index) => {
                    const ResourceIcon =
                      resourceIcons[resource.type] || resourceIcons.default;
                    return (
                      <Card key={index} className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/30">
                           <div className='flex items-center gap-3'>
                            <ResourceIcon className="w-5 h-5 text-muted-foreground" />
                            <CardTitle className="text-base font-medium">
                              {resource.title}
                            </CardTitle>
                          </div>
                          <Button asChild variant="secondary" size="sm">
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          </Button>
                        </CardHeader>
                        <CardContent className='pt-4'>
                          <p className="text-sm text-muted-foreground">
                            {resource.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                  <div className="flex items-center gap-3 text-primary font-semibold p-4 rounded-lg bg-primary/10">
                    <CheckCircle className="w-6 h-6" />
                    <p>Milestone: {phase.milestone}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="text-center mt-12">
        <Button asChild size="lg">
          <Link href="/dashboard">Start Your First Module</Link>
        </Button>
      </div>
    </div>
  );
}
