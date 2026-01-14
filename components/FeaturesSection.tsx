
'use client';

import { ShieldCheck, UserCheck, Filter, Target } from 'lucide-react';

export default function FeaturesSection() {
    const features = [
        {
            icon: ShieldCheck,
            title: "광고 없는 클린함",
            description: "숙제 방송, 뒷광고 걱정 마세요. 오직 게임의 본질만 다룹니다."
        },
        {
            icon: UserCheck,
            title: "실제 플레이어 관점",
            description: "개발사 보도자료 복붙이 아닌, 에디터가 직접 플레이하고 느낀 점을 요약합니다."
        },
        {
            icon: Filter,
            title: "과대광고 필터링",
            description: "트레일러 사기에 속지 않도록, 실제 인게임 플레이와 성능을 분석해 드립니다."
        },
        {
            icon: Target,
            title: "맞춤형 큐레이션",
            description: "PC, 콘솔, 인디 등 취향에 맞는 게임만 쏙쏙 골라보세요."
        }
    ];

    return (
        <section className="py-16 md:py-24 border-b border-gray-200 dark:border-white/5 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black dark:text-white">왜 '파밍레터'인가요?</h2>
                    <p className="text-gray-500 dark:text-gray-400">쏟아지는 게임 뉴스 속에서 길을 잃지 않도록.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <div key={idx} className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-center group shadow-sm dark:shadow-none">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[--primary]/10 text-[--primary] mb-4 group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-black dark:text-white">{feature.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed word-keep break-keep">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
