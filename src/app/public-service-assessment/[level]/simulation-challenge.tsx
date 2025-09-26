'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export function SimulationChallenge({ level }: { level: number }) {
  const router = useRouter();

  const handleNext = () => {
    router.push(`/career-storyboard?domain=Public Service & Administration`);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Level 2: Community Project Simulation</CardTitle>
          <CardDescription>You are the project manager for a new community park.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Project Brief</h3>
            <p className="text-muted-foreground">The city council has approved a $50,000 budget to build a new park in a residential area. Your goal is to deliver a successful project that meets the community's needs while staying within budget and on schedule.</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Your First Decision:</h3>
            <p>A group of local residents is protesting the park's design, demanding more green space and fewer concrete paths. This change would increase the cost by 10%. What do you do?</p>
            
            <RadioGroup>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-1" id="option-1" />
                <Label htmlFor="option-1">Ignore the protests and proceed with the original design to stay on budget.</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-2" id="option-2" />
                <Label htmlFor="option-2">Hold a public consultation to discuss a compromise, even if it delays the project.</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-3" id="option-3" />
                <Label htmlFor="option-3">Approve the design change and request more funding from the city council.</Label>
              </div>
            </RadioGroup>
          </div>

        </CardContent>
        <div className="p-6">
          <Button onClick={handleNext} className="w-full">
            Submit Decision &amp; View Outcome
          </Button>
        </div>
      </Card>
    </div>
  );
}

    