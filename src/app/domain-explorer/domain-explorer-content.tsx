"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Cpu,
  Hammer,
  Banknote,
  Briefcase,
  Brush,
  HeartPulse,
  FlaskConical,
  Scale,
  BookOpen,
  Building2,
  Bot,
  type LucideIcon,
} from 'lucide-react';
import { useThemeContext } from '@/context/theme-context';
import { useQuizContext } from '@/context/quiz-context';
import { cn } from '@/lib/utils';

type Domain = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  path: string;
};

const domains: Domain[] = [
  {
    id: 'cs',
    name: 'Technology',
    description: 'Innovate with code, data, and systems.',
    icon: Cpu,
    path: '/tech-assessment/level-1',
  },
  {
    id: 'mech',
    name: 'Skilled Trades & Artisanship',
    description: 'Build, repair, and create with your hands.',
    icon: Hammer,
    path: '/skilled-trades-assessment/1',
  },
  {
    id: 'public',
    name: 'Public Service & Administration',
    description: 'Serve the community and manage public resources.',
    icon: Building2,
    path: '/public-service-assessment/1',
  },
  {
    id: 'edu',
    name: 'Education',
    description: 'Inspire and empower the next generation.',
    icon: BookOpen,
    path: '/education-assessment/1',
  },
  {
    id: 'biz',
    name: 'Business & Finance',
    description: 'Lead, manage, and grow economic value.',
    icon: Banknote,
    path: '/business-assessment/1',
  },
  {
    id: 'creative',
    name: 'Creative & Marketing',
    description: 'Imagine, design, and promote compelling ideas.',
    icon: Brush,
    path: '/creative-marketing-assessment/1',
  },
  {
    id: 'health',
    name: 'Healthcare',
    description: 'Care for others and advance medical science.',
    icon: HeartPulse,
    path: '/healthcare-assessment/1',
  },
  {
    id: 'science',
    name: 'Science & Research',
    description: 'Discover, experiment, and expand knowledge.',
    icon: FlaskConical,
    path: '/science-research-assessment/1',
  },
  {
    id: 'legal',
    name: 'Legal',
    description: 'Uphold justice and navigate the law.',
    icon: Scale,
    path: '/legal-assessment/1',
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Explore a variety of unique career paths.',
    icon: Briefcase,
    path: '/career-quiz',
  },
];

export function DomainExplorerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTheme } = useThemeContext();
  const { resetAssessments } = useQuizContext();
  const recommendation = searchParams.get('recommendation');

  const handleDomainSelect = (domain: Domain) => {
    setTheme(domain.id);
    resetAssessments();
    router.push(domain.path);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
        Choose Your Domain
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
        Select a domain to begin your tailored assessment, or go with our AI's suggestion to start your personalized journey.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {domains.map((domain) => {
          const isRecommended = domain.name === recommendation;
          return (
            <Card
              key={domain.id}
              onClick={() => handleDomainSelect(domain)}
              className={cn(
                'cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl text-left',
                isRecommended && 'ring-2 ring-primary'
              )}
            >
              <CardHeader className="relative">
                {isRecommended && (
                  <Badge className="absolute top-4 right-4">
                    <Bot className="mr-2 h-4 w-4" />
                    AI Suggestion
                  </Badge>
                )}
                <div className="p-3 bg-primary/10 rounded-full w-fit mb-2">
                  <domain.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-headline">{domain.name}</CardTitle>
                <CardDescription>{domain.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
