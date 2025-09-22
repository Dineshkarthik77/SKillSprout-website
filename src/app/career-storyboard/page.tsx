import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ClientOnly } from '@/components/common/client-only';
import { StoryboardContent } from './storyboard-content';

function CareerStoryboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <ClientOnly>
          <StoryboardContent />
        </ClientOnly>
      </main>
      <Footer />
    </div>
  );
}

export default function CareerStoryboard() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CareerStoryboardPage />
        </Suspense>
    )
}
