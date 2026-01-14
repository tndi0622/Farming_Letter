'use client';

import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default function NewsletterHero() {

    return (
        <div className="relative w-full h-screen border-b border-gray-200 dark:border-white/5 flex items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-500 light:bg-white">
            {/* Dynamic Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-[--secondary]/10 via-white dark:via-black to-[--primary]/10 animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[--primary]/5 to-transparent opacity-50" />
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

                {/* Badge */}
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Zap className="w-3 h-3 md:w-4 md:h-4 text-[--warning]" />
                    <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300">5만 명의 게이머와 함께하세요</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 md:mb-6 flex flex-col items-center gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 text-gray-900 dark:text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-white/50">게임 트렌드</span>
                    <span className="text-[--primary]">매주 배송.</span>
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-2xl text-gray-500 dark:text-gray-400 mb-8 md:mb-10 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    더 이상 찾아헤매지 마세요. 신작 소식부터 숨은 명작, 최저가 할인 정보까지 <span className="text-gray-900 dark:text-white font-semibold">5분 요약 뉴스레터</span>로 받아보세요.
                </p>

                {/* Signup Button (Direct Link) */}
                <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 flex justify-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[--primary] to-[--secondary] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <Link
                            href="https://page.stibee.com/subscriptions/465991"
                            target="_blank"
                            className="relative flex items-center justify-between space-x-2 sm:space-x-4 bg-black dark:bg-white text-white dark:text-black px-5 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-lg md:text-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                        >
                            <span>이번 주 게임 업계 요약, 메일로 받아보기</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
