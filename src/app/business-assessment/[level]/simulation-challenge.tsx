
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function SimulationChallenge({ level }: { level: number }) {
  const router = useRouter();

  const handleNext = () => {
    router.push(`/career-storyboard?domain=Business & Finance`);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Level 2: Market Strategy Simulation</CardTitle>
          <CardDescription>You are launching a new high-end coffee maker.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Product Brief</h3>
            <p className="text-muted-foreground">Your company is launching "The Morning Brew," a premium smart coffee maker with advanced features and a sleek design. The target market is affluent millennials who value quality and convenience.</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Your First Big Decision:</h3>
            <p>Which pricing strategy will you adopt for the launch?</p>
            
            <RadioGroup>
              <div className="flex items-center space-x-2 p-3 rounded-md border has-[:checked]:bg-muted">
                <RadioGroupItem value="premium" id="premium" />
                <Label htmlFor="premium" className="cursor-pointer">
                  <span className="font-medium">Premium Pricing:</span> Set the price significantly higher than competitors to reinforce its high-end brand image.
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md border has-[:checked]:bg-muted">
                <RadioGroupItem value="competitive" id="competitive" />
                <Label htmlFor="competitive" className="cursor-pointer">
                  <span className="font-medium">Competitive Pricing:</span> Price it similarly to other high-end coffee makers to compete directly on features.
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md border has-[:checked]:bg-muted">
                <RadioGroupItem value="value" id="value" />
                <Label htmlFor="value" className="cursor-pointer">
                  <span className="font-medium">Value Pricing:</span> Price it slightly lower than competitors to attract a wider customer base and gain market share quickly.
                </Label>
              </div>
            </RadioGroup>
          </div>

        </CardContent>
        <div className="p-6">
          <Button onClick={handleNext} className="w-full">
            Lock in Strategy & Finish Assessment
          </Button>
        </div>
      </Card>
    </div>
  );
}
