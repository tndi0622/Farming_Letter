import Header from '@/components/Header';
import NewsletterHero from '@/components/NewsletterHero';
import QuickBriefing from '@/components/QuickBriefing';
import GameCard from '@/components/GameCard';
import PlatformSection from '@/components/PlatformSection';
import { newReleases, popularGames, onSaleGames, dailyBriefing, recentNewsletters } from '@/lib/mockData';
import NewsletterArchive from '@/components/NewsletterArchive';
import { ArrowRight, Flame, Percent, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen pb-20">
      <Header />

      <main>
        <div id="subscribe">
          <NewsletterHero />
        </div>
        <QuickBriefing data={dailyBriefing} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-20 py-10 md:py-20">

          <div className="text-center space-y-4 mb-8 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-bold tracking-tight break-keep">뉴스레터 미리보기</h2>
            <p className="text-gray-400 text-base md:text-lg break-keep">매주 이런 알찬 정보들이 배달됩니다.</p>
          </div>

          {/* New Releases Section */}
          <section>
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-[--primary]" />
                <h2 className="text-xl md:text-2xl font-bold">이번 주 신작</h2>
              </div>
              <Link href="#" className="flex items-center text-xs md:text-sm text-[--primary] hover:text-white transition-colors">
                캘린더 전체보기 <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
              </Link>
            </div>

            <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:pb-0 md:mx-0 md:px-0 snap-x snap-mandatory hide-scrollbar">
              {newReleases.map((game) => (
                <div key={game.id} className="min-w-[280px] w-[80vw] md:w-auto h-80 snap-center">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </section>

          {/* Platform Section */}
          <PlatformSection games={[...popularGames, ...newReleases]} />

          {/* Popular Games Section */}
          <section>
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 md:w-6 md:h-6 text-[--accent]" />
                <h2 className="text-xl md:text-2xl font-bold">지금 뜨는 게임</h2>
              </div>
              <Link href="#" className="flex items-center text-xs md:text-sm text-[--accent] hover:text-white transition-colors">
                인기 순위 100 <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
              </Link>
            </div>

            <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:pb-0 md:mx-0 md:px-0 snap-x snap-mandatory hide-scrollbar">
              {popularGames.map((game, idx) => (
                <div key={game.id} className="min-w-[280px] w-[80vw] md:w-auto h-[340px] snap-center">
                  <GameCard game={game} showRank={idx + 1} />
                </div>
              ))}
            </div>
          </section>

          {/* On Sale Section */}
          <section className="bg-gradient-to-br from-[--success]/10 to-transparent p-6 md:p-8 rounded-2xl border border-[--success]/20">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center space-x-2">
                <Percent className="w-5 h-5 md:w-6 md:h-6 text-[--success]" />
                <h2 className="text-xl md:text-2xl font-bold text-white">최저가 핫딜</h2>
              </div>
              <Link href="#" className="flex items-center text-xs md:text-sm text-[--success] hover:text-white transition-colors">
                전체 세일 보기 <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
              </Link>
            </div>

            <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:pb-0 md:mx-0 md:px-0 snap-x snap-mandatory hide-scrollbar">
              {onSaleGames.map((game) => (
                <div key={game.id} className="min-w-[280px] w-[80vw] md:w-auto h-72 snap-center">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </section>


          {/* Recent Newsletters Section */}
          <NewsletterArchive newsletters={recentNewsletters} />
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-white/10 mt-20 bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
          <p>© 2026 파밍레터. All rights reserved.</p>
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
