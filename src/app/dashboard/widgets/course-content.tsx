'use client';

import Link from 'next/link';
import { DraggableCard } from '../draggable-card';
import { CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cpu, Hammer, Leaf, type LucideIcon } from 'lucide-react';
import { useThemeContext } from '@/context/theme-context';

type ModuleContent = {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
};

const contentByTheme: Record<string, ModuleContent> = {
  'cs': {
    title: "Data Structures",
    description: "Master algorithms and data structures for high-performance code.",
    icon: Cpu,
    link: "/modules/data-structures"
  },
  'mech': {
    title: "Thermodynamics Simulation",
    description: "Understand heat transfer and energy conversion in mechanical systems.",
    icon: Hammer,
    link: "/modules/thermodynamics"
  },
  'default': {
    title: "First Principles Thinking",
    description: "Learn to break down complex problems into basic elements.",
    icon: Leaf,
    link: "/modules/first-principles"
  }
};

export function CourseContent({ id }: { id:string }) {
  const { theme } = useThemeContext();
  const content = contentByTheme[theme] || contentByTheme['default'];
  const Icon = content.icon;

  return (
    <DraggableCard id={id}>
      <CardHeader>
        <div className='flex items-start justify-between'>
            <div>
                <CardTitle>Next Module</CardTitle>
                <CardDescription>Your next step to mastery</CardDescription>
            </div>
            <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="w-6 h-6 text-primary" />
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="font-semibold text-lg">{content.title}</h3>
        <p className="text-muted-foreground text-sm">{content.description}</p>
        <Button asChild className="w-full">
            <Link href={content.link}>Start Module</Link>
        </Button>
      </CardContent>
    </DraggableCard>
  );
}
