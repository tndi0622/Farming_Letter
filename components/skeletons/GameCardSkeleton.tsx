export default function GameCardSkeleton() {
    return (
        <div className="h-full bg-white/5 rounded-xl overflow-hidden border border-white/5">
            {/* Image Placeholder */}
            <div className="relative aspect-video w-full bg-white/10 animate-pulse" />

            {/* Content Placeholder */}
            <div className="p-4 space-y-3">
                {/* Title */}
                <div className="h-6 bg-white/10 rounded-md w-3/4 animate-pulse" />

                {/* Tags */}
                <div className="flex gap-2 pt-2">
                    <div className="h-5 bg-white/10 rounded w-12 animate-pulse" />
                    <div className="h-5 bg-white/10 rounded w-12 animate-pulse" />
                </div>

                {/* Footer (Date/Price) */}
                <div className="flex justify-between items-center pt-4">
                    <div className="h-4 bg-white/10 rounded w-20 animate-pulse" />
                    <div className="h-6 bg-white/10 rounded w-24 animate-pulse" />
                </div>
            </div>
        </div>
    );
}
