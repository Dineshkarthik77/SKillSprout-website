'use client';

import Link from 'next/link';
import { DraggableCard } from '../draggable-card';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useQuizContext } from '@/context/quiz-context';

export function QuizProgressCard({ id }: { id: string }) {
  // In a real app, this state would come from the context
  const isComplete = false;
  const currentLevel = 2;
  const totalLevels = 3;
  const progress = (currentLevel / totalLevels) * 100;

  return (
    <DraggableCard id={id}>
      <CardHeader>
        <CardTitle>Assessment Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isComplete ? (
          <div>
            <p className="text-center text-lg font-semibold text-primary mb-4">
              Congratulations! You&apos;ve completed your assessment.
            </p>
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/strategic-blueprint">View Blueprint</Link>
              </Button>
              <Button asChild variant="secondary" className="flex-1">
                <Link href="/domain-explorer">Start Over</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between mb-2">
              <span>Level {currentLevel} of {totalLevels}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
            <Button asChild className="w-full mt-4">
              <Link href="/tech-assessment/2">Continue Assessment</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </DraggableCard>
  );
}
