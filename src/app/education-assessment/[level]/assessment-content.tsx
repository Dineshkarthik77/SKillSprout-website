
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  generateQuiz,
  type GenerateQuizOutput,
} from '@/ai/flows/generate-quiz-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowRight, RefreshCw, Grip } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type PageState = 'loading' | 'loaded' | 'error';
type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export function EducationAssessmentContent({ level }: { level: number }) {
  const router = useRouter();
  const { toast } = useToast();
  const [pageState, setPageState] = useState<PageState>('loading');
  const [quizData, setQuizData] = useState<GenerateQuizOutput | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const fetchQuiz = useCallback(async () => {
    setPageState('loading');
    try {
      const result = await generateQuiz({ domain: 'Education', level });
      setQuizData(result);
      setPageState('loaded');
    } catch (error) {
      console.error('Failed to generate quiz:', error);
      setPageState('error');
    }
  }, [level]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleCheckAnswer = () => {
    if (!selectedAnswer || !quizData) return;
    
    const isCorrect = selectedAnswer === quizData.questions[currentQuestionIndex].answer;
    if (isCorrect) {
      setAnswerState('correct');
      setCorrectAnswers(prev => prev + 1);
      toast({
        title: "Correct!",
        description: quizData.questions[currentQuestionIndex].explanation,
      });
    } else {
      setAnswerState('incorrect');
      toast({
        variant: "destructive",
        title: "Not quite!",
        description: quizData.questions[currentQuestionIndex].explanation,
      });
    }
  };

  const handleNextQuestion = () => {
    if (!quizData) return;
    
    setAnswerState('unanswered');
    setSelectedAnswer(null);

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // End of quiz logic
      if (level < 3) {
        router.push(`/education-assessment/${level + 1}`);
      } else {
        router.push(`/career-storyboard?domain=Education`);
      }
    }
  };
  
  const currentQuestion = quizData?.questions[currentQuestionIndex];
  const progress = quizData ? ((currentQuestionIndex + 1) / quizData.questions.length) * 100 : 0;

  if (pageState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center text-center h-96">
        <div className="w-72 h-40 bg-card rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden animate-pulse-subtle shadow-lg">
            <div className="flex justify-between items-start">
                <div className="w-8 h-8 rounded-full bg-muted" />
                <Grip className="text-muted" />
            </div>
            <div className="space-y-2">
                <div className="h-4 w-3/4 bg-muted rounded-md" />
                <div className="h-3 w-1/2 bg-muted rounded-md" />
            </div>
        </div>
        <h2 className="text-2xl font-headline font-semibold mt-8">
          Generating Your Education Assessment...
        </h2>
        <p className="text-muted-foreground">Level {level}: Preparing your questions.</p>
      </div>
    );
  }

  if (pageState === 'error' || !quizData || !currentQuestion) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load the assessment. Please try returning to the domain explorer.
        </AlertDescription>
        <Button onClick={fetchQuiz} variant="secondary" className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
       <Card>
        <CardHeader>
          <Progress value={progress} className="mb-4" />
          <CardTitle className="font-headline text-2xl">{quizData.title}</CardTitle>
          <CardDescription>Question {currentQuestionIndex + 1} of {quizData.questions.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6">{currentQuestion.question}</p>
          <RadioGroup 
            value={selectedAnswer ?? ''} 
            onValueChange={setSelectedAnswer}
            disabled={answerState !== 'unanswered'}
          >
            {currentQuestion.options.map((option, index) => {
              const isCorrect = option === currentQuestion.answer;
              const isSelected = option === selectedAnswer;
              
              return (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-center space-x-2 p-3 rounded-md border transition-colors",
                    answerState === 'correct' && isCorrect && 'bg-green-100 border-green-400',
                    answerState === 'incorrect' && isSelected && 'bg-red-100 border-red-400',
                    answerState === 'incorrect' && isCorrect && 'bg-green-100 border-green-400',
                  )}
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">{option}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          {answerState === 'unanswered' ? (
             <Button onClick={handleCheckAnswer} disabled={!selectedAnswer}>
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex < quizData.questions.length - 1 ? "Next Question" : "Finish Level"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
