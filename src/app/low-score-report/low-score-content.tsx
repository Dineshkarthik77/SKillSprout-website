'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ThumbsUp, Sparkles } from 'lucide-react';

const skillGapsByLevel: Record<string, string[]> = {
  beginner: ['JavaScript Fundamentals', 'HTML/CSS Basics', 'Intro to Data Structures'],
  intermediate: ['Asynchronous JavaScript', 'React State Management', 'API Integration'],
  advanced: ['System Design Principles', 'Database Optimization', 'Advanced Algorithms'],
};

export function LowScoreContent() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const handleGeneratePath = () => {
    if (!selectedLevel) {
      alert('Please select a level to generate your learning path.');
      return;
    }
    const gaps = skillGapsByLevel[selectedLevel];
    const params = new URLSearchParams({
      gaps: JSON.stringify(gaps),
      style: 'visual', // Default to a supportive visual style
    });
    router.push(`/pro-path?${params.toString()}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <ThumbsUp className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          Every Expert Was Once a Beginner!
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          This is just a starting point, not a final verdict. The most important step is the one you take next. Let's recalibrate and build a path that works for you.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Where Do You Feel You Are?</CardTitle>
          <CardDescription>
            Forget the score for a moment. Based on your experience, which level feels like the right starting point for you?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={selectedLevel} onValueChange={setSelectedLevel}>
            <div className="flex items-center space-x-2 p-4 rounded-md border has-[:checked]:bg-muted">
              <RadioGroupItem value="beginner" id="beginner" />
              <Label htmlFor="beginner" className="flex-grow cursor-pointer">
                <h3 className="font-semibold">Beginner Level</h3>
                <p className="text-sm text-muted-foreground">"I'm just starting out and want to build a solid foundation."</p>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-4 rounded-md border has-[:checked]:bg-muted">
              <RadioGroupItem value="intermediate" id="intermediate" />
              <Label htmlFor="intermediate" className="flex-grow cursor-pointer">
                <h3 className="font-semibold">Intermediate Level</h3>
                <p className="text-sm text-muted-foreground">"I know the basics but want to connect concepts and build practical skills."</p>
              </Label>
            </div>
             <div className="flex items-center space-x-2 p-4 rounded-md border has-[:checked]:bg-muted">
              <RadioGroupItem value="advanced" id="advanced" />
              <Label htmlFor="advanced" className="flex-grow cursor-pointer">
                <h3 className="font-semibold">Somewhat Advanced Level</h3>
                <p className="text-sm text-muted-foreground">"I have some experience but want to tackle more complex, high-level challenges."</p>
              </Label>
            </div>
          </RadioGroup>
          <Button 
            size="lg" 
            className="w-full" 
            onClick={handleGeneratePath}
            disabled={!selectedLevel}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Generate My New Path
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
