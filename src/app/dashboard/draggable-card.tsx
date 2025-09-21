'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DraggableCard({ id, children, className }: { id: string, children: React.ReactNode, className?: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card className={cn("relative", className)}>
        <button {...listeners} className="absolute top-3 right-3 text-muted-foreground cursor-grab active:cursor-grabbing">
          <GripVertical />
        </button>
        {children}
      </Card>
    </div>
  );
}
