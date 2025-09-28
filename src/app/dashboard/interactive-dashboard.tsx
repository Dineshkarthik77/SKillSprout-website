
'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { ProgressVisualizer } from './widgets/progress-visualizer';
import { QuizProgressCard } from './widgets/quiz-progress-card';
import { SharedStreak } from './widgets/shared-streak';
import { CourseContent } from './widgets/course-content';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, Filter, Plus, Search } from 'lucide-react';
import { DraggableCard } from './draggable-card';
import { Progress } from '@/components/ui/progress';

type Widget = {
  id: string;
  component: React.ComponentType<{ id: string }>;
  title: string;
  description: string;
  hours: number;
  progress: number;
};

const initialWidgets: Widget[] = [
  { id: 'client-call', component: GeneralWidget, title: "Client Call", description: "ABC Corp.", hours: 12, progress: 24 },
  { id: 'code-review', component: GeneralWidget, title: "Focus Block", description: "Code Review", hours: 12, progress: 24 },
  { id: 'leisure-reading', component: GeneralWidget, title: "Leisure", description: "Reading", hours: 12, progress: 24 },
  { id: 'tomorrows-plan', component: GeneralWidget, title: "Tomorrow's Plan", description: "Review", hours: 12, progress: 24 },
];

function GeneralWidget({ id, title, description, hours, progress }: { id: string } & Omit<Widget, 'component' | 'id'>) {
    const cardData = initialWidgets.find(w => w.id === id);
    if (!cardData) return null;

  return (
    <DraggableCard id={id} className={id === 'client-call' ? 'bg-accent text-accent-foreground' : 'bg-card'}>
        <div className="p-4">
            <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-black/10 rounded-lg">
                   {/* Placeholder for icon */}
                </div>
            </div>
            <h3 className="font-bold">{cardData.title}</h3>
            <p className="text-sm opacity-80">{cardData.description}</p>
            <p className="text-xs opacity-60 mt-2">{cardData.hours} Hours Needed</p>
            <div className="mt-4">
                <Progress value={cardData.progress} className="h-2" indicatorClassName={id === 'client-call' ? 'bg-accent-foreground' : 'bg-primary'}/>
                <p className="text-right text-xs mt-1 font-bold">{cardData.progress}%</p>
            </div>
        </div>
    </DraggableCard>
  );
}

export function InteractiveDashboard() {
  const [widgets, setWidgets] = useState(initialWidgets);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
            <Avatar>
                <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-muted-foreground">Hello, James!</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Search /></Button>
            <Button variant="ghost" size="icon"><Bell /></Button>
        </div>
      </header>
      
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          Activity Planner
        </h1>
        <p className="text-muted-foreground mt-2">
          You have 8 pending tasks today
        </p>
      </div>

       <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm"><Filter className="mr-2"/> Filter</Button>
          <Button variant="secondary" size="sm"><Calendar className="mr-2"/> 12/11/2024</Button>
          <Button variant="secondary" size="sm"><Plus className="mr-2"/> Add Task</Button>
       </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={widgets.map(w => w.id)} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {widgets.map((widget) => (
                    <GeneralWidget key={widget.id} id={widget.id} {...widget} />
                ))}
            </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
