import { Leaf } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-[hsl(var(--chart-2))]" />
          <span className="text-2xl font-bold font-headline text-foreground">
            SkillSprout
          </span>
        </Link>
      </div>
    </header>
  );
}
