'use client';

import { Play, Info } from 'lucide-react';
import { Game } from '@/lib/types';
import Image from 'next/image';

interface HeroProps {
    game: Game;
}

export default function Hero({ game }: HeroProps) {
    return (
        <div className="relative w-full h-[80vh] flex items-center overflow-hidden group">
            {/* Background Image with Ken Burns Effect */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={game.coverImage}
                    alt={game.title}
                    fill
                    className="object-cover opacity-60 transition-transform duration-[20s] ease-in-out transform scale-100 group-hover:scale-110"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />

                {/* Animated Particles (CSS only simple implementation) */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping" />
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[--primary]/40 rounded-full animate-ping delay-700" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl space-y-8 animate-fade-in-up">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[--primary]/20 text-[--primary] border border-[--primary]/30 backdrop-blur-md shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[--primary] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[--primary]"></span>
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest">Featured Game</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
                        {game.title}
                    </h1>

                    <p className="text-lg md:text-2xl text-gray-200 line-clamp-3 md:line-clamp-none max-w-xl drop-shadow-md font-light leading-relaxed">
                        {game.summary || "Experience the next evolution of gaming. Immerse yourself in a world crafted for the bold."}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-6">
                        <button className="group flex items-center space-x-3 px-8 py-4 bg-[--primary] hover:bg-blue-600 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25 active:scale-95">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                <Play className="w-4 h-4 fill-current ml-0.5" />
                            </div>
                            <span className="text-lg">Watch Trailer</span>
                        </button>

                        <button className="flex items-center space-x-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold backdrop-blur-md transition-all border border-white/10 hover:border-white/30 active:scale-95">
                            <Info className="w-5 h-5" />
                            <span>More Info</span>
                        </button>
                    </div>

                    <div className="flex items-center space-x-6 text-sm font-medium text-gray-400 pt-6 border-t border-white/10 max-w-md">
                        <div className="flex -space-x-2">
                            {['PC', 'PS5'].map((p, i) => (
                                <div key={p} className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-black bg-neutral-800 text-white z-${10 - i}`}>
                                    {p}
                                </div>
                            ))}
                            {game.platforms.length > 2 && (
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-black bg-neutral-700 text-white z-0">
                                    +{game.platforms.length - 2}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[--success]" />
                            <span className="text-white font-bold">{game.releaseDate || 'Available Now'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
