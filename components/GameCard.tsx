'use client';

import { Game } from '@/lib/types';
import Image from 'next/image';
import { Star, ExternalLink, Heart } from 'lucide-react';
import Link from 'next/link';
import StoreIcon from './StoreIcon';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface GameCardProps {
    game: Game;
    showRank?: number;
    featured?: boolean;
    initialIsWishlisted?: boolean;
}

export default function GameCard({ game, showRank, initialIsWishlisted }: GameCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted ?? false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Check wishlist status on mount only if initial status is unknown
    useEffect(() => {
        if (initialIsWishlisted !== undefined) return;

        const checkWishlist = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { data, error } = await supabase
                .from('wishlists')
                .select('*')
                .eq('user_id', session.user.id)
                .eq('game_id', String(game.id))
                .maybeSingle();

            if (data) setIsWishlisted(true);
        };
        checkWishlist();
    }, [game.id, initialIsWishlisted]);

    const handleWishlistClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (loading) return;
        setLoading(true);

        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            if (confirm('찜하기 기능을 사용하려면 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
                router.push('/login');
            }
            setLoading(false);
            return;
        }

        try {
            if (isWishlisted) {
                // Remove from wishlist
                const { error } = await supabase
                    .from('wishlists')
                    .delete()
                    .eq('user_id', session.user.id)
                    .eq('game_id', String(game.id));

                if (error) throw error;
                setIsWishlisted(false);
            } else {
                // Add to wishlist
                const { error } = await supabase
                    .from('wishlists')
                    .insert({
                        user_id: session.user.id,
                        game_id: String(game.id),
                        title: game.title,
                        cover_image: game.coverImage,
                        platform: game.platforms[0] || 'Unknown' // Simple store of primary platform
                    });

                if (error) throw error;
                setIsWishlisted(true);
            }
        } catch (error) {
            console.error('Wishlist error:', error);
            alert('오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    const handleStoreClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (game.storeLink) {
            window.open(game.storeLink, '_blank');
        }
    };

    const isInternal = !game.source || game.source === 'rawg' || game.source === 'manual';
    const linkHref = isInternal ? `/game/${game.id}` : (game.storeLink || '#');
    const linkTarget = isInternal ? '_self' : '_blank';

    return (
        <Link href={linkHref} target={linkTarget} className="block h-full group" onClick={(e) => !isInternal && !game.storeLink && e.preventDefault()}>
            <div className="relative bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-800 group-hover:border-[--primary]/50 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-[--primary]/20 h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                        src={game.coverImage}
                        alt={game.title || 'Game Cover Image'}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-sm font-medium text-white/90">상세 보기</span>
                    </div>

                    {/* Wishlist Button (Heart) */}
                    <button
                        onClick={handleWishlistClick}
                        className="absolute top-2 right-2 p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md transition-all z-20 group/heart"
                    >
                        <Heart
                            className={`w-5 h-5 transition-colors ${isWishlisted
                                ? 'text-red-500 fill-red-500 scale-110'
                                : 'text-white group-hover/heart:text-red-400'
                                }`}
                        />
                    </button>

                    {/* Rating Badge - Moved to left to avoid conflict with heart */}
                    {game.rating > 0 && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur rounded flex items-center space-x-1 border border-white/10">
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
                        <h3 className="font-bold text-lg leading-tight text-black dark:text-white group-hover:text-[--primary] transition-colors line-clamp-2 break-keep">
                            {showRank && <span className="mr-2 text-[--primary]">#{showRank}</span>}
                            {game.title}
                        </h3>
                    </div>

                    <div className="mt-auto space-y-2">
                        <div className="flex flex-wrap gap-1">
                            {game.platforms.slice(0, 3).map((p) => (
                                <span key={p} className="text-xs px-2 py-1 bg-gray-100 dark:bg-white/10 rounded text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/5">
                                    {p}
                                </span>
                            ))}
                            {game.platforms.length > 3 && (
                                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-white/10 rounded text-gray-600 dark:text-gray-300">+</span>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">{game.releaseDate}</span>
                            {game.price ? (
                                game.storeLink ? (
                                    <button
                                        onClick={handleStoreClick}
                                        className="flex flex-col items-end group/btn cursor-pointer"
                                        title={`${game.store || '스토어'} 바로가기`}
                                    >
                                        {game.discount && (
                                            <div className="flex items-center space-x-1 mb-0.5">
                                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[--success]/20 text-[--success] font-bold">
                                                    -{game.discount}%
                                                </span>
                                                <ExternalLink className="w-3 h-3 text-[--success] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                            </div>
                                        )}
                                        <div className="flex items-center space-x-1.5 transition-colors">
                                            {game.store && <StoreIcon store={game.store} className="w-4 h-4 opacity-70 group-hover/btn:opacity-100 invert dark:invert-0" />}
                                            <span className="font-bold text-black dark:text-white group-hover/btn:text-[--success] underline decoration-transparent group-hover/btn:decoration-[--success] underline-offset-2 transition-all">
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
                                        <div className="flex items-center space-x-1.5">
                                            {game.store && <StoreIcon store={game.store} className="w-4 h-4 opacity-70 invert dark:invert-0" />}
                                            <span className="font-bold text-black dark:text-white">
                                                {game.price > 500
                                                    ? `₩${game.price.toLocaleString()}`
                                                    : `$${game.price}`
                                                }
                                            </span>
                                        </div>
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
