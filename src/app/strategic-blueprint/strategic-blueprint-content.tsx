'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, BrainCircuit, Lightbulb, ShieldCheck, CheckCircle, Target, Loader2, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuizContext } from '@/context/quiz-context';

type Skill = {
  id: string;
  name: string;
  score: number;
  icon: LucideIcon;
};

const techSkills: Record<string, Omit<Skill, 'score'>> = {
  foundational: { id: 'foundational', name: 'Foundational Knowledge', icon: BrainCircuit },
  applied: { id: 'applied', name: 'Applied Technical Scenario', icon: Lightbulb },
  advanced: { id: 'advanced', name: 'Advanced Problem-Solving', icon: ShieldCheck },
};

export function StrategicBlueprintContent() {
  const router = useRouter();
  const { techAssessmentScores } = useQuizContext();
  const [selectedGaps, setSelectedGaps] = useState<string[]>([]);
  const [learningStyle, setLearningStyle] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const scores = [
    { ...techSkills.foundational, score: techAssessmentScores.level1 },
    { ...techSkills.applied, score: techAssessmentScores.level2 },
    { ...techSkills.advanced, score: techAssessmentScores.level3 },
  ];

  const totalScore = scores.reduce((acc, s) => acc + s.score, 0);
  const averageScore = scores.length > 0 ? totalScore / scores.length : 0;

  const identifiedGaps = scores.filter(s => s.score < 70).map(s => s.name);

  const handleGapToggle = (gap: string, checked: boolean) => {
    setSelectedGaps(prev => 
      checked ? [...prev, gap] : prev.filter(g => g !== gap)
    );
  };

  const handleGeneratePath = () => {
    if (selectedGaps.length === 0 || !learningStyle) {
      alert('Please select at least one skill gap and a learning style.');
      return;
    }
    setIsGenerating(true);
    const params = new URLSearchParams({
      gaps: JSON.stringify(selectedGaps),
      style: learningStyle,
    });
    router.push(`/pro-path?${params.toString()}`);
  };
  
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <BarChart className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          Your Strategic Blueprint
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          An AI-powered analysis of your assessment results to guide your next steps.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall Performance</CardTitle>
          <CardDescription>Your average score across all technology assessment levels.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold font-headline text-primary">{Math.round(averageScore)}%</span>
            <span className="text-sm text-muted-foreground">Competency Score</span>
          </div>
          <Progress value={averageScore} />
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-8">
        {scores.map((skill) => {
          const Icon = skill.icon;
          return (
            <Card key={skill.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-headline">{skill.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Progress value={skill.score} />
                <p className="text-sm text-muted-foreground">Score: {skill.score}%</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-primary" />
            <CardTitle>Skill Gap Analysis & Next Steps</CardTitle>
          </div>
          <CardDescription>
            Based on your results, we've identified key areas for growth. Select the skills you want to focus on and choose your preferred learning style to generate a personalized roadmap.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Identified Skill Gaps:</h4>
            <div className="space-y-2">
              {identifiedGaps.length > 0 ? identifiedGaps.map(gap => (
                <div key={gap} className="flex items-center space-x-2">
                  <Checkbox 
                    id={gap} 
                    onCheckedChange={(checked) => handleGapToggle(gap, !!checked)}
                  />
                  <Label htmlFor={gap}>{gap}</Label>
                </div>
              )) : (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <p>Great job! No significant skill gaps identified.</p>
                </div>
              )}
            </div>
          </div>
          
          <div>
             <h4 className="font-semibold mb-3">Preferred Learning Style:</h4>
             <Select onValueChange={setLearningStyle} value={learningStyle}>
              <SelectTrigger className="w-full md:w-1/2">
                <SelectValue placeholder="Select your style..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visual">Visual (Videos, Diagrams)</SelectItem>
                <SelectItem value="textual">Textual (Articles, Books)</SelectItem>
                <SelectItem value="kinesthetic">Kinesthetic (Projects, Hands-on)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            size="lg" 
            className="w-full" 
            onClick={handleGeneratePath}
            disabled={isGenerating || selectedGaps.length === 0 || !learningStyle}
          >
            {isGenerating ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <CheckCircle className="mr-2 h-5 w-5" />
            )}
            Generate My Pro Path
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
