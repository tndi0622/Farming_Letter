import Header from '@/components/Header';
import { getGameDetails } from '@/lib/rawgClient';
import { ArrowLeft, Calendar, Star, Monitor } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

import { getSteamGameDetails } from '@/lib/steamClient';
import { Game } from '@/lib/types';

export default async function GameDetail({ params }: PageProps) {
    const { id } = await params;

    let game: Game | null;
    if (id.startsWith('steam_')) {
        game = await getSteamGameDetails(id);
    } else {
        game = await getGameDetails(id);
    }

    if (!game) {
        notFound();
    }

    return (
        <div className="min-h-screen pb-20 bg-black text-white">
            <Header />

            <main>
                {/* Hero Section */}
                <div className="relative w-full h-[60vh] md:h-[70vh]">
                    <Image
                        src={game.coverImage}
                        alt={game.title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors backdrop-blur-sm bg-black/30 px-3 py-1 rounded-full border border-white/10"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            메인으로 돌아가기
                        </Link>

                        <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-4 text-white drop-shadow-2xl">
                            {game.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                            {game.rating > 0 && (
                                <div className="flex items-center space-x-1 px-3 py-1 bg-[--warning]/20 text-[--warning] rounded-lg border border-[--warning]/20">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="font-bold">{game.rating}</span>
                                </div>
                            )}
                            <div className="flex items-center space-x-2 text-gray-300">
                                <Calendar className="w-4 h-4" />
                                <span>{game.releaseDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="grid md:grid-cols-[2fr_1fr] gap-12">
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-2xl font-bold mb-4 text-[--primary]">게임 소개</h2>
                                <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                                    {game.summary || "상세 설명이 없습니다."}
                                </p>
                            </section>
                        </div>

                        <aside className="space-y-8">
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                                <h3 className="tex-lg font-bold mb-4 flex items-center">
                                    <Monitor className="w-5 h-5 mr-2 text-[--secondary]" />
                                    플랫폼
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {game.platforms.map((p) => (
                                        <span key={p} className="px-3 py-1.5 bg-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/20 transition-colors">
                                            {p}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Metadata placeholder */}
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                                <h3 className="tex-lg font-bold mb-4 text-gray-200">정보</h3>
                                <dl className="space-y-4 text-sm">
                                    <div>
                                        <dt className="text-gray-500 mb-1">장르</dt>
                                        <dd className="text-white">{game.genres?.join(', ') || '정보 없음'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-500 mb-1">개발사</dt>
                                        <dd className="text-white">{game.developers?.join(', ') || '정보 없음'}</dd>
                                    </div>
                                </dl>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}
