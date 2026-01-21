
import { recentNewsletters } from '@/lib/mockData';
import Header from '@/components/Header';
import Image from 'next/image';
import { Calendar, ArrowLeft, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NewsletterHero from '@/components/NewsletterHero';
import { getGameDetails } from '@/lib/rawgClient';
import GameCard from '@/components/GameCard';
import CommentSection from '@/components/CommentSection';
import NewsletterSignup from '@/components/NewsletterSignup';

// Helper to parse simple markdown (**text** -> bold) and newlines
function renderContent(text: string) {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
        if (!line.trim()) return <br key={i} className="hidden sm:block" />; // Handle multiple newlines elegantly
        return (

            <p key={i} className="mb-4 text-left break-keep leading-relaxed" dangerouslySetInnerHTML={{
                __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>')
            }} />
        );
    });
}

export default async function NewsletterPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const newsletter = recentNewsletters.find(n => n.id === id);

    if (!newsletter) {
        return notFound();
    }

    // Fetch related games if highlights exist
    const highlightsWithGames = newsletter.highlights ? await Promise.all(
        newsletter.highlights.map(async (item) => {
            let game = null;
            if (item.gameSlug) {
                try {
                    game = await getGameDetails(item.gameSlug);
                } catch (e) {
                    console.error(`Failed to fetch game for slug ${item.gameSlug}`, e);
                }
            }
            return { ...item, game };
        })
    ) : [];

    return (
        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white selection:bg-[--primary] selection:text-white transition-colors">
            <Header />

            <main className="pt-24 pb-20">
                <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <div className="mb-8">
                        <Link href="/#archive" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            목록으로 돌아가기
                        </Link>
                    </div>

                    {/* Article Header */}
                    <header className="mb-10 text-center">
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1.5" />
                                {newsletter.date}
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1.5" />
                                5분 읽기
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:to-gray-400 break-keep">
                            {newsletter.title}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto break-keep">
                            {newsletter.summary}
                        </p>
                    </header>

                    {/* Featured Image */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 border border-gray-200 dark:border-white/10 shadow-2xl group">
                        <Image
                            src={newsletter.thumbnail}
                            alt={newsletter.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    {/* Content Body */}
                    <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300/90 leading-relaxed">

                        {/* Intro */}
                        <div className="text-xl leading-relaxed text-gray-800 dark:text-gray-200 mb-12 drop-shadow-sm font-light break-keep">
                            {renderContent(newsletter.intro || '')}
                        </div>

                        {/* Key Highlights */}
                        {highlightsWithGames.length > 0 && (
                            <div className="mt-16 space-y-16">
                                <div className="flex items-center space-x-4 mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white m-0">
                                        주목할 만한 소식
                                    </h2>
                                    <div className="h-px bg-gray-200 dark:bg-white/20 flex-grow"></div>
                                </div>

                                {highlightsWithGames.map((item, idx) => (
                                    <div key={idx} className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-[--primary]/30 dark:hover:border-white/20">
                                        {/* Background Decor */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[--primary]/10 blur-[50px] rounded-full pointer-events-none" />

                                        <div className="relative z-10">
                                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                                <span className="w-1.5 h-1.5 bg-[--primary] rounded-full mr-3 animate-pulse"></span>
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                                {item.description}
                                            </p>

                                            {item.game && (
                                                <div className="mt-8">
                                                    <div className="bg-gray-100 dark:bg-black/40 p-4 rounded-xl border border-gray-200 dark:border-white/5">
                                                        <div className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-wider flex justify-between items-center">
                                                            <span>Related Game</span>
                                                            <span className="text-[--primary] flex items-center gap-1">
                                                                Live Data <span className="w-1 h-1 bg-[--primary] rounded-full animate-ping"></span>
                                                            </span>
                                                        </div>
                                                        <div className="max-w-[300px] sm:max-w-sm">
                                                            <GameCard game={item.game} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Deep Dive */}
                        {newsletter.deepDive && (
                            <div className="mt-20">
                                <div className="bg-gradient-to-br from-gray-100 to-white dark:from-[#1a1a1a] dark:to-black p-8 md:p-10 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[--primary] to-[--secondary] opacity-70"></div>

                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                                        <span className="w-2 h-8 bg-[--secondary] mr-4 rounded-sm"></span>
                                        심층 분석
                                    </h2>

                                    <div className="pl-6 border-l-2 border-gray-200 dark:border-white/10 space-y-6">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white break-keep">{newsletter.deepDive.title}</h3>
                                        <div className="text-gray-700 dark:text-gray-300 leading-loose break-keep">
                                            {renderContent(newsletter.deepDive.content)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Editor's Note */}
                        {newsletter.editorNote && (
                            <div className="mt-16 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-xl p-6 md:p-8 relative">
                                <h3 className="text-sm font-bold text-[--primary] mb-3 uppercase tracking-widest">
                                    Editor's Note
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-2 border-gray-300 dark:border-gray-600 pl-4">
                                    {newsletter.editorNote}
                                </p>
                            </div>
                        )}

                        {/* Outro */}
                        <div className="border-t border-gray-200 dark:border-white/10 pt-12 mt-16 text-center">
                            <div className="text-lg text-gray-700 dark:text-gray-300 font-medium leading-loose">
                                {renderContent(newsletter.outro || '')}
                            </div>
                        </div>
                    </div>



                    {/* Share & Tags */}
                    <div className="mt-16 flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex gap-2">
                            {['#게임뉴스', '#2026기대작', '#오픈월드'].map(tag => (
                                <span key={tag} className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-4 py-1.5 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors cursor-pointer">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[--primary] transition-colors group">
                            <Share2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                            공유하기
                        </button>
                    </div>

                    {/* Comment Section */}
                    <CommentSection newsletterId={id} />

                </article>

                {/* Newsletter Signup at bottom */}
                <div className="max-w-4xl mx-auto mt-24 px-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[--primary] to-[--secondary] opacity-10 blur-[80px] rounded-full"></div>
                        <NewsletterSignup />
                    </div>
                </div>
            </main>
        </div>
    );
}
