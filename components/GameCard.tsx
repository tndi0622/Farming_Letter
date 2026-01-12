'use client';

import { Game } from '@/lib/types';
import Image from 'next/image';
import { Star } from 'lucide-react';
import Link from 'next/link';

interface GameCardProps {
    game: Game;
    showRank?: number;
    featured?: boolean;
}

export default function GameCard({ game, showRank }: GameCardProps) {
    return (
        <Link href={`/game/${game.id}`} className="block h-full">
            <div className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[--primary]/10 h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                        src={game.coverImage}
                        alt={game.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-sm font-medium text-white/90">상세 보기</span>
                    </div>

                    {/* Rating Badge */}
                    {game.rating > 0 && (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur rounded flex items-center space-x-1 border border-white/10">
                            <Star className="w-3 h-3 text-[--warning] fill-current" />
                            <span className={`text-xs font-bold ${game.rating >= 90 ? 'text-[--success]' : 'text-white'}`}>
                                {game.rating}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-lg leading-tight group-hover:text-[--primary] transition-colors line-clamp-2 break-keep">
                            {showRank && <span className="mr-2 text-[--primary]">#{showRank}</span>}
                            {game.title}
                        </h3>
                    </div>

                    <div className="mt-auto space-y-2">
                        <div className="flex flex-wrap gap-1">
                            {game.platforms.slice(0, 3).map((p) => (
                                <span key={p} className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-gray-300 border border-white/5">
                                    {p}
                                </span>
                            ))}
                            {game.platforms.length > 3 && (
                                <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-gray-300">+</span>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">{game.releaseDate}</span>
                            {game.price ? (
                                <div className="flex flex-col items-end">
                                    {game.discount && (
                                        <span className="text-[10px] px-1 rounded bg-[--success]/20 text-[--success] mb-0.5">
                                            -{game.discount}%
                                        </span>
                                    )}
                                    <span className="font-bold text-white">${game.price}</span>
                                </div>
                            ) : (
                                <span className="text-xs text-gray-500">출시예정</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
