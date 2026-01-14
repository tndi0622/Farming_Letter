'use client';

import NewsletterArchive from '@/components/NewsletterArchive';
import Header from '@/components/Header';
import { recentNewsletters } from '@/lib/mockData';

export default function ArchivePage() {
    return (
        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
            <Header />
            <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <NewsletterArchive newsletters={recentNewsletters} />
            </main>
        </div>
    );
}
