'use client';

import { useState } from 'react';
import { Game } from '@/lib/types';
import GameCard from './GameCard';
import { Monitor, Gamepad2, Gamepad, Tv } from 'lucide-react';

interface PlatformSectionProps {
    games: Game[];
}

export default function PlatformSection({ games }: PlatformSectionProps) {
    const [activeTab, setActiveTab] = useState('PC');

    const platforms = [
        { id: 'PC', icon: Monitor, label: 'PC' },
        { id: 'PS5', icon: Gamepad2, label: '플레이스테이션' },
        { id: 'Xbox', icon: Gamepad, label: '엑스박스' },
        { id: 'Switch', icon: Tv, label: '닌텐도' },
    ];

    const filteredGames = games.filter(g => g.platforms.some(p => p.includes(activeTab) || activeTab === 'PC' && p.includes('PC')));
    // Simple filter logic. 'includes' is used loosely.

    return (
        <section>
            <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold">플랫폼별 추천</h2>
            </div>

            <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {platforms.map((p) => {
                    const Icon = p.icon;
                    const isActive = activeTab === p.id;
                    return (
                        <button
                            key={p.id}
                            onClick={() => setActiveTab(p.id)}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap ${isActive
                                ? 'bg-white text-black scale-105 shadow-lg shadow-white/10'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{p.label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:pb-0 md:mx-0 md:px-0 animate-in fade-in zoom-in duration-300 snap-x snap-mandatory hide-scrollbar">
                {filteredGames.slice(0, 4).map((game) => (
                    <div key={`${activeTab}-${game.id}`} className="min-w-[280px] w-[80vw] md:w-auto h-[300px] snap-center">
                        <GameCard game={game} />
                    </div>
                ))}
                {filteredGames.length === 0 && (
                    <div className="col-span-full py-10 text-center text-gray-500 bg-white/5 rounded-xl border border-white/5">
                        <p>현재 {activeTab} 추천 게임이 없습니다.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
