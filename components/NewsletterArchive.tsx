'use client';

import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Newsletter } from '@/lib/types';
import Image from 'next/image';

interface NewsletterArchiveProps {
    newsletters: Newsletter[];
}

export default function NewsletterArchive({ newsletters }: NewsletterArchiveProps) {
    return (
        <section className="py-10 md:py-20" id="archive">
            <div className="flex items-center justify-between mb-8 md:mb-12">
                <div className="space-y-1">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">지난 뉴스레터</h2>
                    <p className="text-gray-400 text-sm md:text-base">놓쳤던 지난 호들을 다시 확인해보세요.</p>
                </div>
                <Link href="/archive" className="flex items-center text-sm font-medium text-[--primary] hover:text-white transition-colors">
                    모두 보기 <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newsletters.map((newsletter) => (
                    <Link
                        key={newsletter.id}
                        href={`/newsletter/${newsletter.id}`}
                        className="group block bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all border border-white/5 hover:border-white/20"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                                src={newsletter.thumbnail}
                                alt={newsletter.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
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
                ))}
            </div>
        </section>
    );
}
