import GameCardSkeleton from '@/components/skeletons/GameCardSkeleton';

export default function Loading() {
    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors">
            {/* Header Skeleton */}
            <div className="fixed top-0 w-full h-16 bg-white/80 dark:bg-black/80 backdrop-blur z-50 border-b border-gray-200 dark:border-white/10" />

            <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto space-y-12">
                {/* Hero Skeleton */}
                <div className="w-full aspect-[21/9] bg-gray-200 dark:bg-white/5 rounded-3xl animate-pulse" />

                {/* Section Skeleton */}
                <div className="space-y-6">
                    <div className="w-48 h-8 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-[400px]">
                                <GameCardSkeleton />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
