import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ClientOnly } from '@/components/common/client-only';
import { InteractiveDashboard } from './interactive-dashboard';

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <ClientOnly>
          <InteractiveDashboard />
        </ClientOnly>
      </main>
      <Footer />
    </div>
  );
}
