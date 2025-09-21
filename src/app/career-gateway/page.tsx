import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function CareerGateway() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold font-headline mb-4">Career Gateway</h1>
        <p className="text-lg text-muted-foreground mb-8">This page is under construction. Come back soon!</p>
        <Button asChild>
          <Link href="/">
            Go back to Homepage
          </Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
