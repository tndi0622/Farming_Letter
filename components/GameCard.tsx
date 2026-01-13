'use client';

import { Game } from '@/lib/types';
import Image from 'next/image';
import { Star, ExternalLink, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface GameCardProps {
    game: Game;
    showRank?: number;
    featured?: boolean;
}

export default function GameCard({ game, showRank }: GameCardProps) {
    const handleStoreClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (game.storeLink) {
            window.open(game.storeLink, '_blank');
        }
    };

    return (
        <Link href={`/game/${game.id}`} className="block h-full group">
            <div className="relative bg-white/5 rounded-xl overflow-hidden border border-white/10 group-hover:border-[--primary]/50 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-[--primary]/20 h-full flex flex-col">
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
                                <span key={p} className="text-xs px-2 py-1 bg-white/10 rounded text-gray-300 border border-white/5">
                                    {p}
                                </span>
                            ))}
                            {game.platforms.length > 3 && (
                                <span className="text-xs px-2 py-1 bg-white/10 rounded text-gray-300">+</span>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400 font-medium">{game.releaseDate}</span>
                            {game.price ? (
                                game.storeLink ? (
                                    <button
                                        onClick={handleStoreClick}
                                        className="flex flex-col items-end group/btn cursor-pointer"
                                        title="스토어 바로가기"
                                    >
                                        {game.discount && (
                                            <div className="flex items-center space-x-1 mb-0.5">
                                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[--success]/20 text-[--success] font-bold">
                                                    -{game.discount}%
                                                </span>
                                                <ExternalLink className="w-3 h-3 text-[--success] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                            </div>
                                        )}
                                        <div className="flex items-center space-x-1 transition-colors">
                                            <span className="font-bold text-white group-hover/btn:text-[--success] underline decoration-transparent group-hover/btn:decoration-[--success] underline-offset-2 transition-all">
                                                {game.price > 500
                                                    ? `₩${game.price.toLocaleString()}`
                                                    : `$${game.price}`
                                                }
                                            </span>
                                        </div>
                                    </button>
                                ) : (
                                    <div className="flex flex-col items-end">
                                        {game.discount && (
                                            <span className="text-[10px] px-1 rounded bg-[--success]/20 text-[--success] mb-0.5">
                                                -{game.discount}%
                                            </span>
                                        )}
                                        <span className="font-bold text-white">
                                            {game.price > 500
                                                ? `₩${game.price.toLocaleString()}`
                                                : `$${game.price}`
                                            }
                                        </span>
                                    </div>
                                )
                            ) : (
                                <span className={`text-xs ${new Date(game.releaseDate) > new Date('2026-01-13') ? 'text-[--accent]' : 'text-gray-500'}`}>
                                    {new Date(game.releaseDate) > new Date('2026-01-13') ? '출시예정' : '상세보기'}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
