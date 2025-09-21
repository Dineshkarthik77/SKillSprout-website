import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ClientOnly } from '@/components/common/client-only';
import { EducationAssessmentContent } from './assessment-content';

function EducationAssessmentPage({ params }: { params: { level: string } }) {
  const level = parseInt(params.level, 10);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <ClientOnly>
          <EducationAssessmentContent level={level} />
        </ClientOnly>
      </main>
      <Footer />
    </div>
  );
}

export default function EducationAssessment({ params }: { params: { level: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EducationAssessmentPage params={params} />
    </Suspense>
  );
}
