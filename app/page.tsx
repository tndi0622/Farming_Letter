import Header from '@/components/Header';
import NewsletterHero from '@/components/NewsletterHero';
import QuickBriefing from '@/components/QuickBriefing';
import GameCard from '@/components/GameCard';
import PlatformSection from '@/components/PlatformSection';
import NewsletterSignup from '@/components/NewsletterSignup';
import { featuredGame, newReleases, popularGames, onSaleGames, dailyBriefing } from '@/lib/mockData';
import { ArrowRight, Flame, Percent, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen pb-20">
      <Header />

      <main>
        <NewsletterHero />
        <QuickBriefing data={dailyBriefing} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 py-20">

          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">뉴스레터 미리보기</h2>
            <p className="text-gray-400 text-lg">매주 이런 알찬 정보들이 배달됩니다.</p>
          </div>

          {/* New Releases Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-[--primary]" />
                <h2 className="text-2xl font-bold">이번 주 신작</h2>
              </div>
              <Link href="#" className="flex items-center text-sm text-[--primary] hover:text-white transition-colors">
                캘린더 전체보기 <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newReleases.map((game) => (
                <div key={game.id} className="h-80">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </section>

          {/* Platform Section */}
          <PlatformSection games={[...popularGames, ...newReleases]} />

          {/* Popular Games Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Flame className="w-6 h-6 text-[--accent]" />
                <h2 className="text-2xl font-bold">지금 뜨는 게임</h2>
              </div>
              <Link href="#" className="flex items-center text-sm text-[--accent] hover:text-white transition-colors">
                인기 순위 100 <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularGames.map((game, idx) => (
                <div key={game.id} className="h-[340px]">
                  <GameCard game={game} showRank={idx + 1} />
                </div>
              ))}
            </div>
          </section>

          {/* On Sale Section */}
          <section className="bg-gradient-to-br from-[--success]/10 to-transparent p-8 rounded-2xl border border-[--success]/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Percent className="w-6 h-6 text-[--success]" />
                <h2 className="text-2xl font-bold text-white">최저가 핫딜</h2>
              </div>
              <Link href="#" className="flex items-center text-sm text-[--success] hover:text-white transition-colors">
                전체 세일 보기 <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {onSaleGames.map((game) => (
                <div key={game.id} className="h-72">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </section>

          {/* Newsletter Section */}
          <NewsletterSignup />
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-white/10 mt-20 bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
          <p>© 2026 GamePulse. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="#" className="hover:text-white">서비스 소개</Link>
            <Link href="#" className="hover:text-white">개인정보처리방침</Link>
            <Link href="#" className="hover:text-white">이용약관</Link>
            <Link href="#" className="hover:text-white">문의하기</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
