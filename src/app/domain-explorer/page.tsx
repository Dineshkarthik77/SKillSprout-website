import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { DomainExplorerContent } from './domain-explorer-content';

function DomainExplorerPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
                <DomainExplorerContent />
            </main>
            <Footer />
        </div>
    );
}

export default function DomainExplorer() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DomainExplorerPage />
        </Suspense>
    )
}
