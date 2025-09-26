
import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ClientOnly } from '@/components/common/client-only';
import { SkilledTradesAssessmentContent } from './assessment-content';
import { SimulationChallengeContent } from './simulation-challenge-content';

function SkilledTradesAssessmentPage({ params }: { params: { level: string } }) {
  const level = parseInt(params.level, 10);
  
  const AssessmentComponent = level === 2 ? SimulationChallengeContent : SkilledTradesAssessmentContent;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <ClientOnly>
          <AssessmentComponent level={level} />
        </ClientOnly>
      </main>
      <Footer />
    </div>
  );
}

export default function SkilledTradesAssessment({ params }: { params: { level: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SkilledTradesAssessmentPage params={params} />
    </Suspense>
  );
}
