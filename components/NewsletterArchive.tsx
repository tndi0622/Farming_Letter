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
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black dark:text-white">지난 뉴스레터</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
                        지난호는 <span className="text-[--primary] font-bold">멤버십 회원</span>만 볼 수 있습니다.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newsletters.map((newsletter, index) => {
                    const isLocked = index > 0; // Lock everything except the latest one as an example/preview

                    return (
                        <div key={newsletter.id} className={`relative group ${index > 0 ? 'hidden md:block' : ''}`}>
                            <Link
                                href={isLocked ? '#' : `/newsletter/${newsletter.id}`}
                                className={`block bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 transition-all ${isLocked ? 'cursor-not-allowed opacity-70' : 'hover:border-[--primary]/50 shadow-sm dark:shadow-none hover:shadow-xl hover:translate-y-[-4px]'}`}
                                onClick={(e) => isLocked && e.preventDefault()}
                            >
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={newsletter.thumbnail}
                                        alt={newsletter.title}
                                        fill
                                        className={`object-cover transition-transform duration-500 ${isLocked ? 'grayscale blur-[2px]' : 'group-hover:scale-105'}`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                                    {/* Volume Badge */}
                                    <div className="absolute top-3 left-3 px-2 py-1 bg-white/20 backdrop-blur-md rounded border border-white/20 shadow-lg">
                                        <span className="text-xs font-bold text-white tracking-wide">
                                            {newsletter.id.toUpperCase().replace('-', ' ')}
                                        </span>
                                    </div>

                                    {isLocked && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px]">
                                            <div className="p-3 bg-white/10 rounded-full border border-white/10 mb-2">
                                                <Lock className="w-6 h-6 text-gray-300" />
                                            </div>
                                            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Premium Only</span>
                                        </div>
                                    )}

                                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-medium text-gray-300">
                                        <div className="flex items-center space-x-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{newsletter.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 space-y-3 relative">
                                    <h3 className="font-bold text-lg md:text-xl leading-snug text-black dark:text-gray-100 group-hover:text-[--primary] transition-colors break-keep">
                                        {newsletter.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
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
