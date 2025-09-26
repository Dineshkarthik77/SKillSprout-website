'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Terminal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const initialCode = `function isEven(num) {
  // Your code here
}`;

export function CodingChallengeContent() {
  const router = useRouter();
  const { toast } = useToast();
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(null);
    setIsCorrect(null);

    // Simulate running code and checking against test cases
    setTimeout(() => {
      // In a real app, this would involve a secure code execution sandbox
      // For this simulation, we'll just check for a simple string contains
      const isSolutionCorrect = code.includes('num % 2 === 0');
      
      setIsCorrect(isSolutionCorrect);

      if (isSolutionCorrect) {
        setOutput('Success! All test cases passed.');
        toast({
          title: 'Correct!',
          description: 'Your solution passed all tests.',
        });
      } else {
        setOutput('Error: Your solution failed some test cases.');
        toast({
          variant: 'destructive',
          title: 'Not quite!',
          description: 'Your solution did not pass all test cases. Try again.',
        });
      }

      setIsRunning(false);
    }, 1500);
  };

  const handleProceed = () => {
    router.push('/tech-assessment/2');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Level 1: Coding Challenge</CardTitle>
          <CardDescription>Write a function to determine if a number is even or odd.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your code here..."
            className="font-mono h-64 bg-muted/50"
          />
          {output && (
            <Alert variant={isCorrect ? 'default' : 'destructive'}>
              <Terminal className="h-4 w-4" />
              <AlertTitle>{isCorrect ? 'Execution Result' : 'Execution Error'}</AlertTitle>
              <AlertDescription>
                <pre className="whitespace-pre-wrap">{output}</pre>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleRunCode} disabled={isRunning}>
            {isRunning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Run Code
          </Button>
          {isCorrect && (
            <Button onClick={handleProceed}>
              Proceed to Level 2
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
