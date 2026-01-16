export default function NewsletterSkeleton() {
    return (
        <div className="glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row h-full">
            <div className="md:w-2/5 relative min-h-[250px] bg-gray-200 dark:bg-white/5 animate-pulse" />
            <div className="p-8 md:w-3/5 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-20 h-4 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse" />
                    <div className="w-16 h-4 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse" />
                </div>
                <div className="space-y-3 mb-6">
                    <div className="w-full h-8 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse" />
                    <div className="w-3/4 h-8 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse" />
                </div>
                <div className="space-y-2 mb-8">
                    <div className="w-full h-4 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                    <div className="w-full h-4 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                    <div className="w-2/3 h-4 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                </div>
                <div className="w-32 h-10 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse" />
            </div>
        </div>
    );
}
