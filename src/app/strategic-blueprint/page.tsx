import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ClientOnly } from '@/components/common/client-only';
import { StrategicBlueprintContent } from './strategic-blueprint-content';

function StrategicBlueprintPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <ClientOnly>
          <StrategicBlueprintContent />
        </ClientOnly>
      </main>
      <Footer />
    </div>
  );
}

export default function StrategicBlueprint() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StrategicBlueprintPage />
    </Suspense>
  );
}
