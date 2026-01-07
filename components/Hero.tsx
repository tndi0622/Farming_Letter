'use client';

import { Play, Info } from 'lucide-react';
import { Game } from '@/lib/types';
import Image from 'next/image';

interface HeroProps {
    game: Game;
}

export default function Hero({ game }: HeroProps) {
    return (
        <div className="relative w-full h-[80vh] flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={game.coverImage}
                    alt={game.title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl space-y-6">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[--primary]/20 text-[--primary] border border-[--primary]/30 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-[--primary] animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-wider">Featured Game</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight drop-shadow-2xl">
                        {game.title}
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 line-clamp-3 md:line-clamp-none max-w-lg drop-shadow-md">
                        {game.summary}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <button className="flex items-center space-x-2 px-8 py-3 bg-[--primary] hover:bg-blue-600 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25">
                            <Play className="w-5 h-5 fill-current" />
                            <span>Watch Trailer</span>
                        </button>

                        <button className="flex items-center space-x-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold backdrop-blur-md transition-all border border-white/20">
                            <Info className="w-5 h-5" />
                            <span>More Info</span>
                        </button>
                    </div>

                    <div className="flex items-center space-x-4 text-sm font-medium text-gray-400 pt-4">
                        <div className="flex space-x-2">
                            {game.platforms.map((p) => (
                                <span key={p} className="px-2 py-1 bg-white/5 rounded border border-white/10">{p}</span>
                            ))}
                        </div>
                        <span>•</span>
                        <span className="text-[--success]">{game.releaseDate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
