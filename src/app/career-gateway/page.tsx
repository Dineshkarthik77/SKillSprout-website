import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CareerGatewayContent } from './career-gateway-content';
import { ClientOnly } from '@/components/common/client-only';

export default function CareerGateway() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <ClientOnly>
          <CareerGatewayContent />
        </ClientOnly>
      </main>
      <Footer />
    </div>
  );
}
