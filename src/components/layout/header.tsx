import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-[hsl(var(--chart-2))]" />
          <span className="text-2xl font-bold font-headline text-foreground">
            SkillSprout
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/career-gateway">AI Gateway</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/domain-explorer">Domain Explorer</Link>
          </Button>
           <Button variant="ghost" asChild>
            <Link href="/pro-path?gaps=%5B%22Data%20Analysis%22%2C%22Machine%20Learning%22%5D&style=visual">Learning Path</Link>
          </Button>
           <Button variant="ghost" asChild>
            <Link href="/feed">Feed</Link>
          </Button>
           <Button variant="ghost" asChild>
            <Link href="/friends">Friends</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
