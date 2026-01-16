export default function GameCardSkeleton() {
    return (
        <div className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/5 h-full flex flex-col">
            {/* Image Placeholder */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200 dark:bg-white/5 animate-pulse" />

            {/* Content Placeholder */}
            <div className="p-5 flex flex-col flex-grow relative">
                <div className="flex-1">
                    {/* Platform Tag */}
                    <div className="w-16 h-5 bg-gray-200 dark:bg-white/10 rounded-full mb-3 animate-pulse" />

                    {/* Title */}
                    <div className="w-3/4 h-7 bg-gray-200 dark:bg-white/10 rounded-lg mb-2 animate-pulse" />
                    <div className="w-1/2 h-7 bg-gray-200 dark:bg-white/10 rounded-lg mb-4 animate-pulse" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
                    <div className="w-20 h-6 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse" />
                    <div className="w-24 h-8 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse" />
                </div>
            </div>
        </div>
    );
}
