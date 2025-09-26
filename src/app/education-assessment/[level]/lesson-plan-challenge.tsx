
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  generateLessonPlanScenario,
  type GenerateLessonPlanScenarioOutput,
  evaluateLessonPlan,
  type EvaluateLessonPlanInput,
} from '@/ai/flows/education-assessment-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ArrowRight, RefreshCw, CheckCircle, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type PageState = 'loading' | 'loaded' | 'evaluating' | 'evaluated' | 'error';
type LessonPlanChoices = Omit<EvaluateLessonPlanInput, 'scenario'>;

export function LessonPlanChallenge({ level }: { level: number }) {
  const router = useRouter();
  const { toast } = useToast();
  const [pageState, setPageState] = useState<PageState>('loading');
  const [scenario, setScenario] = useState<GenerateLessonPlanScenarioOutput | null>(null);
  const [choices, setChoices] = useState<LessonPlanChoices>({
    learningObjective: '',
    activity: '',
    assessment: '',
  });
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetchScenario();
  }, []);

  const fetchScenario = async () => {
    setPageState('loading');
    try {
      const result = await generateLessonPlanScenario();
      setScenario(result);
      setPageState('loaded');
    } catch (error) {
      console.error('Failed to generate lesson plan scenario:', error);
      setPageState('error');
    }
  };

  const handleSelection = (type: keyof LessonPlanChoices, value: string) => {
    setChoices(prev => ({ ...prev, [type]: value }));
  };

  const handleSubmit = async () => {
    if (!scenario || !choices.learningObjective || !choices.activity || !choices.assessment) {
      toast({
        variant: 'destructive',
        title: 'Incomplete Plan',
        description: 'Please make a selection for each category.',
      });
      return;
    }
    
    setPageState('evaluating');
    try {
      const result = await evaluateLessonPlan({ scenario, ...choices });
      setFeedback(result.feedback);
      setPageState('evaluated');
      toast({
        title: 'Lesson Plan Evaluated!',
        description: 'Check out the AI-powered feedback below.',
      });
    } catch (error) {
       console.error('Failed to evaluate lesson plan:', error);
       setPageState('error');
    }
  };

  const handleNext = () => {
    router.push(`/career-storyboard?domain=Education`);
  };
  
  const isSubmitDisabled = !choices.learningObjective || !choices.activity || !choices.assessment;

  if (pageState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center text-center h-96">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <h2 className="text-2xl font-headline font-semibold">
          Designing Your Classroom Challenge...
        </h2>
        <p className="text-muted-foreground">Level {level}: Preparing your teaching scenario.</p>
      </div>
    );
  }

  if (pageState === 'error' || !scenario) {
    return (
       <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load the simulation. Please try again.
        </AlertDescription>
         <Button onClick={fetchScenario} variant="secondary" className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Level 2: Lesson Plan Builder</CardTitle>
          <CardDescription>Design an effective lesson plan for the following scenario.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Alert>
             <Lightbulb className="h-4 w-4" />
            <AlertTitle>Your Scenario</AlertTitle>
            <AlertDescription>
              <p><strong>Subject:</strong> {scenario.subject}</p>
              <p><strong>Grade Level:</strong> {scenario.gradeLevel}</p>
              <p><strong>Key Challenge:</strong> {scenario.studentNeed}</p>
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">1. Choose a Learning Objective</h3>
            <RadioGroup onValueChange={(value) => handleSelection('learningObjective', value)} disabled={pageState === 'evaluated'}>
              {scenario.options.learningObjectives.map((opt, i) => (
                <div key={i} className="flex items-center space-x-2 p-3 rounded-md border has-[:checked]:bg-muted">
                  <RadioGroupItem value={opt} id={`obj-${i}`} />
                  <Label htmlFor={`obj-${i}`}>{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
           <div className="space-y-4">
            <h3 className="font-semibold text-lg">2. Select an Engaging Activity</h3>
            <RadioGroup onValueChange={(value) => handleSelection('activity', value)} disabled={pageState === 'evaluated'}>
              {scenario.options.activities.map((opt, i) => (
                <div key={i} className="flex items-center space-x-2 p-3 rounded-md border has-[:checked]:bg-muted">
                  <RadioGroupItem value={opt} id={`act-${i}`} />
                  <Label htmlFor={`act-${i}`}>{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

           <div className="space-y-4">
            <h3 className="font-semibold text-lg">3. Pick an Assessment Method</h3>
            <RadioGroup onValueChange={(value) => handleSelection('assessment', value)} disabled={pageState === 'evaluated'}>
              {scenario.options.assessments.map((opt, i) => (
                <div key={i} className="flex items-center space-x-2 p-3 rounded-md border has-[:checked]:bg-muted">
                  <RadioGroupItem value={opt} id={`ass-${i}`} />
                  <Label htmlFor={`ass-${i}`}>{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {pageState === 'evaluated' && feedback && (
            <Alert variant="default" className="bg-primary/10 border-primary/30">
              <CheckCircle className="h-4 w-4 text-primary" />
              <AlertTitle className="text-primary">AI Feedback</AlertTitle>
              <AlertDescription>
                {feedback}
              </AlertDescription>
            </Alert>
          )}

        </CardContent>
        <CardFooter>
          {pageState !== 'evaluated' ? (
            <Button onClick={handleSubmit} disabled={isSubmitDisabled || pageState === 'evaluating'}>
              {pageState === 'evaluating' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Lesson Plan
            </Button>
          ) : (
             <Button onClick={handleNext}>
              Finish Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
