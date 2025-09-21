'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { DraggableCard } from '../draggable-card';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useThemeContext } from '@/context/theme-context';
import { useQuizContext } from '@/context/quiz-context';

const ModelViewer = dynamic(() => import('./model-viewer-wrapper').then(mod => mod.ModelViewerWrapper), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[400px]" />,
});

const themeModels: Record<string, string[]> = {
  'cs': ['/models/RobotExpressive.glb', '/models/Laptop.glb', '/models/Server.glb'],
  'mech': ['/models/Hammer.glb', '/models/Wrench.glb', '/models/Engine.glb'],
  'default': ['/models/Astronaut.glb', '/models/RocketShip.glb', '/models/Planet.glb'],
};

export function ProgressVisualizer({ id }: { id: string }) {
  const { theme, setTheme } = useThemeContext();
  // In a real app, this would be part of the QuizContext state
  const level = 2; 
  const totalLevels = 3;
  
  const [currentStep, setCurrentStep] = useState(level - 1);
  const progress = ((currentStep + 1) / totalLevels) * 100;
  
  const models = themeModels[theme] || themeModels['default'];
  const currentModel = models[currentStep];

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setCurrentStep(0);
  }

  return (
    <DraggableCard id={id}>
      <CardHeader>
        <CardTitle>Progress Visualizer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] bg-muted rounded-lg mb-4">
           <ModelViewer src={currentModel} />
        </div>
        <div className="space-y-4">
            <div className='flex justify-between items-center'>
                <p>Project Progress</p>
                <p className='font-bold'>{Math.round(progress)}%</p>
            </div>
          <Progress value={progress} />
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={theme} onValueChange={handleThemeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Project Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs">Technology</SelectItem>
                <SelectItem value="mech">Skilled Trades</SelectItem>
                <SelectItem value="default">General</SelectItem>
              </SelectContent>
            </Select>
            <div className='flex gap-2'>
                <Button variant="outline" onClick={() => setCurrentStep(s => Math.max(0, s - 1))} disabled={currentStep === 0}>Prev Step</Button>
                <Button onClick={() => setCurrentStep(s => Math.min(totalLevels - 1, s + 1))} disabled={currentStep === totalLevels - 1}>Next Step</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </DraggableCard>
  );
}
