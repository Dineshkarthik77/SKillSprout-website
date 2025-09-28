import { Sprout } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Sprout className="h-8 w-8 text-accent" />
          <span className="text-2xl font-bold font-headline text-foreground">
            SkillSprout
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/career-gateway">AI Gateway</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/domain-explorer">Domain Explorer</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/pro-path">Pro Path</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
