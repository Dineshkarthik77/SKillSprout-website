'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  generateRepairScenario,
  type GenerateRepairScenarioOutput,
} from '@/ai/flows/generate-repair-scenario';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Wrench, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Tool = {
  id: string;
  name: string;
};

type Item = Tool & { containerId: 'available' | 'used' };

type PageState = 'loading' | 'loaded' | 'error' | 'evaluating';
type ResultState = 'unevaluated' | 'correct' | 'incorrect';

function SortableTool({ id, name, isOverlay }: { id: string, name: string, isOverlay?: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'p-2 bg-muted rounded-md flex items-center gap-2 border touch-none',
        isDragging && 'opacity-50',
        isOverlay && 'shadow-lg'
      )}
    >
      <Wrench className="w-4 h-4 text-muted-foreground" />
      <span className="flex-grow">{name}</span>
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-muted-foreground">
        <svg viewBox="0 0 20 20" width="12"><path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" fill="currentColor"></path></svg>
      </button>
    </div>
  );
}

export function SimulationChallengeContent({ level }: { level: number }) {
  const router = useRouter();
  const { toast } = useToast();
  const [pageState, setPageState] = useState<PageState>('loading');
  const [scenario, setScenario] = useState<GenerateRepairScenarioOutput | null>(null);
  const [items, setItems] = useState<Record<string, Item[]>>({ available: [], used: [] });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [resultState, setResultState] = useState<ResultState>('unevaluated');

  useEffect(() => {
    const fetchScenario = async () => {
      setPageState('loading');
      try {
        const result = await generateRepairScenario();
        setScenario(result);
        setItems({
          available: result.availableTools.map(t => ({ ...t, containerId: 'available' })),
          used: [],
        });
        setPageState('loaded');
      } catch (error) {
        console.error('Failed to generate scenario:', error);
        setPageState('error');
      }
    };
    fetchScenario();
  }, []);

  const sensors = useSensors(useSensor(PointerSensor));

  const findContainer = (id: string) => {
    if (id in items) return id;
    return Object.keys(items).find(key => items[key].some(item => item.id === id));
  };
  
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };
  
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems(prev => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      const activeIndex = activeItems.findIndex(item => item.id === active.id);
      const overIndex = overItems.findIndex(item => item.id === over.id) ?? overItems.length;
      
      let newItems = { ...prev };
      const [movedItem] = activeItems.splice(activeIndex, 1);
      movedItem.containerId = overContainer as 'available' | 'used';
      overItems.splice(overIndex, 0, movedItem);

      return newItems;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);

    if (activeContainer === overContainer) {
      setItems(prev => {
        const activeItems = prev[activeContainer];
        const oldIndex = activeItems.findIndex(item => item.id === active.id);
        const newIndex = activeItems.findIndex(item => item.id === over.id);
        return {
          ...prev,
          [activeContainer]: arrayMove(activeItems, oldIndex, newIndex),
        };
      });
    }
    setActiveId(null);
  };
  
  const handleSubmit = () => {
    setPageState('evaluating');
    const userSteps = items.used.map(tool => tool.id);
    const correctSteps = scenario?.correctSteps || [];

    const isCorrect = JSON.stringify(userSteps) === JSON.stringify(correctSteps);
    
    setTimeout(() => {
        if (isCorrect) {
            setResultState('correct');
            toast({
                title: "Success!",
                description: "You've correctly identified the steps to fix the problem.",
            });
        } else {
            setResultState('incorrect');
            toast({
                variant: "destructive",
                title: "Not quite right.",
                description: "The sequence of tools wasn't correct. Try re-ordering or swapping tools.",
            });
        }
        setPageState('loaded');
    }, 1500);
  };

  const handleNext = () => {
    router.push(`/skilled-trades-assessment/3`);
  };

  const activeTool = activeId ? [...items.available, ...items.used].find(item => item.id === activeId) : null;

  if (pageState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center text-center h-96">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <h2 className="text-2xl font-headline font-semibold">
          Building Your Hands-On Challenge...
        </h2>
        <p className="text-muted-foreground">Preparing a practical simulation for you.</p>
      </div>
    );
  }

  if (pageState === 'error' || !scenario) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load the simulation. Please try returning to the domain explorer.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{scenario.title}</CardTitle>
            <CardDescription>{scenario.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Image
                src={scenario.imageUrl}
                alt="Repair scenario"
                width={600}
                height={400}
                className="rounded-lg object-cover"
                data-ai-hint={scenario.imageHint}
              />
               <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Available Tools</CardTitle>
                </CardHeader>
                <CardContent>
                    <SortableContext items={items.available.map(i => i.id)} strategy={rectSortingStrategy}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {items.available.map(tool => (
                                <SortableTool key={tool.id} id={tool.id} name={tool.name} />
                            ))}
                        </div>
                    </SortableContext>
                </CardContent>
               </Card>
            </div>
            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Your Repair Steps</CardTitle>
                    <CardDescription>Drag tools here in the correct order.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SortableContext items={items.used.map(i => i.id)} strategy={rectSortingStrategy}>
                        <div className="space-y-2 min-h-[200px] p-2 rounded-md bg-background border-dashed border-2">
                             {items.used.map(tool => (
                                <SortableTool key={tool.id} id={tool.id} name={tool.name} />
                            ))}
                            {items.used.length === 0 && (
                                <div className="text-center text-muted-foreground p-8">Drop tools here</div>
                            )}
                        </div>
                    </SortableContext>
                </CardContent>
            </Card>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button onClick={handleSubmit} disabled={pageState === 'evaluating' || items.used.length === 0}>
              {pageState === 'evaluating' ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-2 h-4 w-4" />
              )}
              Evaluate My Solution
            </Button>
            {resultState === 'correct' && (
                <Button onClick={handleNext}>Proceed to Level 3</Button>
            )}
            {resultState === 'incorrect' && (
                <div className="flex items-center gap-2 text-destructive">
                    <X className="w-5 h-5"/>
                    <span className="font-semibold">Incorrect, try again!</span>
                </div>
            )}
          </CardFooter>
        </Card>
      </div>
      {activeTool && (
        <div className="pointer-events-none fixed inset-0 z-50">
            <SortableTool id={activeTool.id} name={activeTool.name} isOverlay/>
        </div>
      )}
    </DndContext>
  );
}
