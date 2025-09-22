import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Briefcase, DollarSign, Clock } from 'lucide-react';
import type { GenerateCareerStoryboardOutput } from '@/ai/flows/generate-career-storyboard';

type CardData = GenerateCareerStoryboardOutput[0];

interface StoryboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CardData;
}

export function StoryboardModal({ isOpen, onClose, data }: StoryboardModalProps) {
  const router = useRouter();

  const handleStartPath = () => {
    const params = new URLSearchParams({
      gaps: JSON.stringify(data.requiredSkills),
      style: 'visual', // Defaulting to visual, could be a user choice later
    });
    router.push(`/pro-path?${params.toString()}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">{data.jobTitle}</DialogTitle>
          <DialogDescription>{data.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Required Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.requiredSkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Salary Range
            </h4>
            <p className="text-muted-foreground">{data.salaryRange}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              A Day in the Life
            </h4>
            <p className="text-muted-foreground text-sm">{data.dayInTheLife}</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
          <Button onClick={handleStartPath}>
            <Briefcase className="mr-2 h-4 w-4" />
            Start My Learning Path!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
