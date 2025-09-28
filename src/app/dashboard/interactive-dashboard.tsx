
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

type Widget = {
  id: string;
  component: React.ComponentType<{ id: string }>;
};

const initialWidgets: Widget[] = [
  { id: 'progress-visualizer', component: ProgressVisualizer },
  { id: 'quiz-progress', component: QuizProgressCard },
  { id: 'shared-streak', component: SharedStreak },
  { id: 'course-content', component: CourseContent },
];

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
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://i.pravatar.cc/150?img=6" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold font-headline">My Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's your personalized learning hub.
            </p>
          </div>
        </div>
      </header>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={widgets.map(w => w.id)} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {widgets.map(({ id, component: Component }) => (
              <Component key={id} id={id} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
