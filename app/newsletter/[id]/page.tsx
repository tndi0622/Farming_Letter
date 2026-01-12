import { recentNewsletters } from '@/lib/mockData';
import Header from '@/components/Header';
import Image from 'next/image';
import { Calendar, ArrowLeft, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NewsletterSignup from '@/components/NewsletterSignup';

export default async function NewsletterPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const newsletter = recentNewsletters.find(n => n.id === id);

    if (!newsletter) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <main className="pt-24 pb-20">
                <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <div className="mb-8">
                        <Link href="/#archive" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            목록으로 돌아가기
                        </Link>
                    </div>

                    {/* Header */}
                    <header className="mb-10 text-center">
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1.5" />
                                {newsletter.date}
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1.5" />
                                5분 읽기
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                            {newsletter.title}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                            {newsletter.summary}
                        </p>
                    </header>

                    {/* Featured Image */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
                        <Image
                            src={newsletter.thumbnail}
                            alt={newsletter.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Content Body (Mock) */}
                    <div className="prose prose-invert prose-lg max-w-none space-y-8 text-gray-300/90 leading-relaxed">
                        <p>
                            안녕하세요, <strong>파밍레터</strong>입니다. <br />
                            이번 주에도 어김없이 흥미로운 게임 소식들과 함께 찾아왔습니다.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">주목할 만한 소식</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>새로운 기대작의 출시일이 확정되었습니다.</li>
                            <li>개발사 인터뷰에서 밝혀진 비하인드 스토리를 확인하세요.</li>
                            <li>이번 주말에만 진행되는 특별한 할인 이벤트가 있습니다.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">심층 분석</h2>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8 not-prose">
                            <h3 className="text-lg font-bold text-[--primary] mb-2">Editor's Note</h3>
                            <p className="text-sm text-gray-300">
                                이번 호부터는 독자 여러분의 피드백을 반영하여 모바일 가독성을 대폭 개선했습니다.
                                앞으로도 더 나은 읽는 경험을 제공하기 위해 노력하겠습니다.
                            </p>
                        </div>

                        <p>
                            언제나 그랬듯, 즐거운 게임 라이프 되시길 바랍니다.<br />
                            다음 주에 또 만나요!
                        </p>
                    </div>

                    {/* Share & Tags */}
                    <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
                        <div className="flex space-x-2">
                            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-gray-300">게임 뉴스</span>
                            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-gray-300">주간 이슈</span>
                        </div>
                        <button className="flex items-center text-gray-400 hover:text-white transition-colors">
                            <Share2 className="w-5 h-5 mr-2" />
                            공유하기
                        </button>
                    </div>

                </article>

                {/* Newsletter Signup at bottom */}
                <div className="max-w-4xl mx-auto mt-20">
                    <NewsletterSignup />
                </div>
            </main>
        </div>
    );
}
