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

type Widget = {
  id: string;
  component: React.ComponentType;
  column: 'left' | 'right';
};

const initialWidgets: Widget[] = [
  { id: 'progress-visualizer', component: ProgressVisualizer, column: 'left' },
  { id: 'quiz-progress', component: QuizProgressCard, column: 'right' },
  { id: 'shared-streak', component: SharedStreak, column: 'right' },
  { id: 'course-content', component: CourseContent, column: 'right' },
];

export function InteractiveDashboard() {
  const [widgets, setWidgets] = useState(initialWidgets);

  const leftColumnWidgets = widgets.filter((w) => w.column === 'left');
  const rightColumnWidgets = widgets.filter((w) => w.column === 'right');

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const reordered = arrayMove(items, oldIndex, newIndex);

        // This simple implementation reassigns columns based on position.
        // A more complex setup could handle column-to-column dragging.
        return reordered.map((item, index) => ({
          ...item,
          column: index === 0 ? 'left' : 'right',
        }));
      });
    }
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          Welcome to Your Sandbox
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Arrange your dashboard to fit your learning style. Drag and drop widgets to customize your view.
        </p>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SortableContext items={leftColumnWidgets.map(w => w.id)} strategy={verticalListSortingStrategy}>
              {leftColumnWidgets.map(({ id, component: Component }) => (
                <Component key={id} id={id} />
              ))}
            </SortableContext>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <SortableContext items={rightColumnWidgets.map(w => w.id)} strategy={verticalListSortingStrategy}>
              {rightColumnWidgets.map(({ id, component: Component }) => (
                 <Component key={id} id={id} />
              ))}
            </SortableContext>
          </div>
        </div>
      </DndContext>
    </div>
  );
}
