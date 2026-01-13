'use client';

import { ArrowRight, Calendar, Lock } from 'lucide-react';
import Link from 'next/link';
import { Newsletter } from '@/lib/types';
import Image from 'next/image';

interface NewsletterArchiveProps {
    newsletters: Newsletter[];
}

export default function NewsletterArchive({ newsletters }: NewsletterArchiveProps) {
    // Mock grouping by month for visual structure (simulating weekly grouping as requested)
    // In a real app, we'd parse dates and group by week number.
    // For now, we'll just map them and pretend they are weekly issues.

    return (
        <section className="py-10 md:py-20" id="archive">
            <div className="flex items-center justify-between mb-8 md:mb-12">
                <div className="space-y-1">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">지난 뉴스레터</h2>
                    <p className="text-gray-400 text-sm md:text-base">
                        지난호는 <span className="text-[--primary] font-bold">멤버십 회원</span>만 볼 수 있습니다.
                    </p>
                </div>
                <Link href="/archive" className="flex items-center text-sm font-medium text-[--primary] hover:text-white transition-colors">
                    전체 보기 <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newsletters.map((newsletter, index) => {
                    const isLocked = index > 0; // Lock everything except the latest one as an example/preview

                    return (
                        <div key={newsletter.id} className={`relative group ${index > 0 ? 'hidden md:block' : ''}`}>
                            <Link
                                href={isLocked ? '#' : `/newsletter/${newsletter.id}`}
                                className={`block bg-white/5 rounded-2xl overflow-hidden border border-white/5 transition-all ${isLocked ? 'cursor-not-allowed opacity-70' : 'hover:bg-white/10 hover:border-white/20'}`}
                                onClick={(e) => isLocked && e.preventDefault()}
                            >
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={newsletter.thumbnail}
                                        alt={newsletter.title}
                                        fill
                                        className={`object-cover transition-transform duration-500 ${isLocked ? 'grayscale blur-[2px]' : 'group-hover:scale-105'}`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-60" />

                                    {isLocked && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px]">
                                            <div className="p-3 bg-black/50 rounded-full border border-white/10 mb-2">
                                                <Lock className="w-6 h-6 text-gray-300" />
                                            </div>
                                            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Premium Only</span>
                                        </div>
                                    )}

                                    <div className="absolute bottom-3 left-4 flex items-center space-x-2 text-xs font-medium text-white/90">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{newsletter.date}</span>
                                    </div>
                                </div>
                                <div className="p-5 space-y-3">
                                    <h3 className="font-bold text-lg leading-tight group-hover:text-[--primary] transition-colors line-clamp-2">
                                        {newsletter.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                                        {newsletter.summary}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
