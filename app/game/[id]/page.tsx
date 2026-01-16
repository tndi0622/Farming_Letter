
import Header from '@/components/Header';
import { getGameDetails } from '@/lib/rawgClient';
import { Star, Calendar, Gamepad2, Users, ArrowLeft, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function GameDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const game = await getGameDetails(id);

    if (!game) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
            <Header />

            <main className="pb-20">
                {/* Hero / Backdrop */}
                <div className="relative w-full h-[50vh] md:h-[60vh]">
                    <Image
                        src={game.coverImage}
                        alt={game.title}
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-black dark:via-black/40 dark:to-transparent" />

                    {/* Back Button (Floating) */}
                    <div className="absolute top-24 left-4 md:left-8 z-20">
                        <Link
                            href="/"
                            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all font-medium text-sm shadow-lg"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            메인으로
                        </Link>
                    </div>

                    {/* Title Overlay (Bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-end gap-6">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-black dark:text-white drop-shadow-sm leading-none">
                                {game.title}
                            </h1>
                            {game.rating > 0 && (
                                <div className="flex items-center space-x-2 bg-black/80 dark:bg-white/10 backdrop-blur px-4 py-2 rounded-lg border border-white/10 mb-2">
                                    <Star className="w-5 h-5 text-[--warning] fill-current" />
                                    <span className="text-xl font-bold text-white">{game.rating}</span>
                                    <span className="text-sm text-gray-400">/ 100</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Main Info & Summary */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 block flex items-center gap-1.5 font-medium">
                                    <Calendar className="w-4 h-4" /> 출시일
                                </span>
                                <span className="font-bold text-lg">{game.releaseDate || 'TBA'}</span>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 block flex items-center gap-1.5 font-medium">
                                    <Gamepad2 className="w-4 h-4" /> 장르
                                </span>
                                <span className="font-bold text-lg truncate block">
                                    {game.genres && game.genres.length > 0 ? game.genres[0] : 'Unknown'}
                                </span>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hidden md:block">
                                <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 block flex items-center gap-1.5 font-medium">
                                    <Users className="w-4 h-4" /> 개발사
                                </span>
                                <span className="font-bold text-lg truncate block">
                                    {game.developers && game.developers.length > 0 ? game.developers[0] : 'Unknown'}
                                </span>
                            </div>
                        </div>

                        {/* Summary Section */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <span className="w-1.5 h-6 bg-[--primary] mr-3 rounded-full"></span>
                                게임 소개
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                                {game.summary ? (
                                    <div dangerouslySetInnerHTML={{ __html: game.summary }} />
                                ) : (
                                    <p className="italic text-gray-500">상세 설명이 없습니다.</p>
                                )}
                            </div>
                        </section>

                        {/* Platforms */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">플레이 가능한 플랫폼</h2>
                            <div className="flex flex-wrap gap-2">
                                {game.platforms.map(p => (
                                    <span key={p} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 font-medium border border-gray-200 dark:border-zinc-700">
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar / Actions */}
                    <div className="space-y-6">
                        <div className="sticky top-24 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 shadow-xl">
                            <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">구매 및 정보</h3>

                            <div className="space-y-3">
                                {game.storeLink ? (
                                    <a
                                        href={game.storeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between w-full p-4 rounded-xl bg-[--primary] text-white hover:bg-[--primary]/90 transition-colors font-bold shadow-lg shadow-[--primary]/20 group"
                                    >
                                        <span>스토어 바로가기</span>
                                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                ) : (
                                    <button
                                        disabled
                                        className="flex items-center justify-between w-full p-4 rounded-xl bg-gray-200 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 cursor-not-allowed font-medium"
                                    >
                                        <span>판매처 정보 없음</span>
                                    </button>
                                )}

                                {/* Extra Mock Price Info if available in mock data (usually API doesn't give price easily) */}
                                {game.price && game.price > 0 && (
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5">
                                        <span className="text-gray-500 dark:text-gray-400">참고 가격</span>
                                        <span className="space-x-2">
                                            {game.discount && (
                                                <span className="text-sm text-[--success] bg-[--success]/10 px-2 py-0.5 rounded font-bold">-{game.discount}%</span>
                                            )}
                                            <span className="font-bold text-lg">
                                                {game.price > 500 ? `₩${game.price.toLocaleString()}` : `$${game.price}`}
                                            </span>
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5">
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    * 가격 및 출시일 정보는 실시간으로 변동될 수 있습니다. 정확한 정보는 각 스토어 페이지에서 확인해주세요.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
