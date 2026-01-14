
'use client';

import Link from 'next/link';

export default function BottomCTA() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[--primary]/10">
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black dark:via-transparent dark:to-transparent"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black dark:text-white">
                    <span className="text-[--primary]">매주 놓치면 손해인</span><br />
                    알짜배기 게임 정보
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto text-lg transition-colors">
                    5만 명의 게이머가 선택한 파밍레터.<br />
                    광고 없는 클린한 뉴스레터를 지금 바로 받아보세요.
                </p>
                <Link
                    href="https://page.stibee.com/subscriptions/465991"
                    target="_blank"
                    className="inline-flex items-center px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-bold rounded-full text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-105 shadow-xl shadow-[--primary]/20"
                >
                    지금 바로 메일로 받아보기
                </Link>
            </div>
        </section>
    );
}
