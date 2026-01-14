export default function Loading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-t-[--primary] border-white/10 animate-spin"></div>
                <p className="text-white/50 text-sm font-mono tracking-widest">LOADING...</p>
            </div>
        </div>
    )
}
