'use client';

import { Briefing } from '@/lib/types';
import { Clock, Zap, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface QuickBriefingProps {
    data: Briefing;
}

export default function QuickBriefing({ data }: QuickBriefingProps) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-gradient-to-r from-[--secondary]/20 to-[--primary]/20 border-y border-white/10 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 bg-[--warning] text-black px-2 py-1 rounded font-bold text-xs">
                            <Zap className="w-3 h-3 fill-current" />
                            <span>GameQuick</span>
                        </div>
                        <div className="flex items-center space-x-1 text-[--warning] text-sm font-medium animate-pulse">
                            <Clock className="w-4 h-4" />
                            <span>20시간 후 마감</span>
                        </div>
                    </div>

                    <div className="flex-1 md:mx-8 w-full">
                        <div className="flex items-center space-x-2 overflow-hidden">
                            <span className="text-gray-400 text-sm whitespace-nowrap">오늘의 헤드라인:</span>
                            <div className="flex-1 overflow-hidden relative h-5">
                                <div className="animate-marquee whitespace-nowrap text-sm font-medium text-white/90">
                                    {data.headlines.map((headline, i) => (
                                        <span key={i} className="mr-8 inline-block">• {headline}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="hidden md:flex items-center space-x-1 text-xs text-gray-400 hover:text-white transition-colors">
                        <span>브리핑 전체 보기</span>
                        <MessageSquare className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}
