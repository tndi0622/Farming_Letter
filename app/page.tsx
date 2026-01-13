import Header from '@/components/Header';
import NewsletterHero from '@/components/NewsletterHero';
import GameCard from '@/components/GameCard';
import PlatformSection from '@/components/PlatformSection';
import { newReleases as mockNewReleases, popularGames as mockPopularGames, onSaleGames as mockOnSaleGames, recentNewsletters, featuredGame as mockFeaturedGame } from '@/lib/mockData';
import NewsletterArchive from '@/components/NewsletterArchive';
import FeaturesSection from '@/components/FeaturesSection';
import BottomCTA from '@/components/BottomCTA';
import { ArrowRight, Flame, Percent, Calendar } from 'lucide-react';
import Link from 'next/link';
import { getNewReleases, getIndieSpotlight, getPlatformTrending } from '@/lib/rawgClient';
import { getGamesFromSlugs } from '@/lib/gameHelpers';
import { getDeals } from '@/lib/cheapSharkClient';
import { getSteamSpecials } from '@/lib/steamClient';

export default async function Home() {
  const [
    fetchedNewReleases,
    fetchedIndieGames,
    fetchedDeals,
    fetchedSteamSpecials,
    trendingPC,
    trendingPS5,
    trendingXbox,
    trendingSwitch
  ] = await Promise.all([
    getNewReleases(),
    getIndieSpotlight(),
    getDeals(),
    getSteamSpecials(),
    getPlatformTrending('4'),   // PC
    getPlatformTrending('187'), // PS5
    getPlatformTrending('186'), // Xbox Series X/S
    getPlatformTrending('7')    // Switch
  ]);

  const newReleases = fetchedNewReleases.length > 0 ? fetchedNewReleases : mockNewReleases;


  // Merge Deals: Steam Specials + CheapShark
  const steamGames = fetchedSteamSpecials.map(deal => ({
    id: deal.id,
    title: deal.title,
    summary: 'Steam 공식 특별 할인',
    coverImage: deal.thumbnail,
    platforms: ['PC', 'Steam'],
    releaseDate: 'HOT DEAL',
    rating: 0,
    price: parseInt(deal.salePrice.replace(/[^0-9]/g, '')) || 0,
    discount: parseInt(deal.discount.replace('%', '')) || 0,
    storeLink: deal.link
  }));

  const onSaleGames = [...steamGames, ...(fetchedDeals.length > 0 ? fetchedDeals : mockOnSaleGames)].slice(0, 10); // Check top 10 mixed deals
  const indieGames = fetchedIndieGames.length > 0 ? fetchedIndieGames : [];

  // Combine all mocks for fallback filtering
  const allMockGames = [
    ...mockNewReleases,
    ...mockPopularGames,
    ...mockOnSaleGames,
    mockFeaturedGame
  ];

  // Helper to filter mocks by platform if API fails
  const getFallback = (platform: string) => allMockGames.filter(g => g.platforms.some(p => p.includes(platform)));

  const platformData = {
    PC: trendingPC.length > 0 ? trendingPC : getFallback('PC'),
    PS5: trendingPS5.length > 0 ? trendingPS5 : getFallback('PS5'),
    Xbox: trendingXbox.length > 0 ? trendingXbox : getFallback('Xbox'),
    Switch: trendingSwitch.length > 0 ? trendingSwitch : getFallback('Switch')
  };



  return (
    <div className="min-h-screen pb-0">
      <Header />

      <main>
        <div id="subscribe">
          <NewsletterHero />
        </div>

        <FeaturesSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-20 py-10 md:py-20">

          <div className="text-center space-y-4 mb-8 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-bold tracking-tight break-keep">이번 주 게임 업계는 이렇게 흘렀어요</h2>
            <p className="text-gray-400 text-base md:text-lg break-keep">매주 놓치면 아쉬운 알찬 정보들이 배달됩니다.</p>
          </div>

          {/* New Releases Section */}
          <section>
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-[--primary]" />
                <h2 className="text-xl md:text-2xl font-bold">주목할 만한 신작</h2>
              </div>
              <Link href="#" className="flex items-center text-xs md:text-sm text-[--primary] hover:text-white transition-colors">
                출시 예정작 더보기 <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
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
          <PlatformSection data={platformData} />

          {/* Indie Spotlight Section */}
          {indieGames.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">💎</span>
                  <h2 className="text-xl md:text-2xl font-bold">글로벌 인디 스포트라이트</h2>
                </div>
                <Link href="#" className="flex items-center text-xs md:text-sm text-gray-400 hover:text-white transition-colors">
                  G-Star / E3 쇼케이스 <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                </Link>
              </div>

              <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:pb-0 md:mx-0 md:px-0 snap-x snap-mandatory hide-scrollbar">
                {indieGames.map((game) => (
                  <div key={game.id} className="min-w-[280px] w-[80vw] md:w-auto h-72 snap-center">
                    <GameCard game={game} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* On Sale Section */}
          <section className="bg-gradient-to-br from-[--success]/10 to-transparent p-6 md:p-8 rounded-2xl border border-[--success]/20">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center space-x-2">
                <Percent className="w-5 h-5 md:w-6 md:h-6 text-[--success]" />
                <h2 className="text-xl md:text-2xl font-bold text-white">검증된 최저가 핫딜</h2>
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

          {/* Newsletter Archive Section */}
          <NewsletterArchive newsletters={recentNewsletters} />

        </div>

        <BottomCTA />
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-white/10 mt-0 bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-xs text-[--primary] font-bold tracking-widest uppercase mb-4">
            Personal Project
          </div>
          <p className="text-gray-400 text-sm mb-6">
            © 2026 파밍레터. Built with Next.js, Supabase, Tailwind CSS.
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">서비스 소개</Link>
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">개인정보처리방침</Link>
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">이용약관</Link>
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">문의하기</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
