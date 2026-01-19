'use client';

import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function NewsletterSignup() {
    return (
        <section className="relative overflow-hidden py-12 md:py-24 rounded-3xl mx-4 sm:mx-0 my-10 md:my-20">
            {/* Background with gradient and mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-[--secondary] to-[--primary] opacity-20"></div>
            <div className="absolute inset-0 backdrop-blur-3xl"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                <Mail className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 md:mb-6 text-gray-900 dark:text-white" />
                <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight text-gray-900 dark:text-white">
                    게임 트렌드의 중심
                </h2>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto">
                    매일 아침 <span className="text-black dark:text-white font-semibold">파밍레터 데일리</span>를 메일함으로 보내드립니다.
                    따끈따끈한 최신 뉴스, 신작 정보, 그리고 독점 할인 혜택을 놓치지 마세요.
                </p>

                <div className="max-w-md mx-auto w-full">
                    <a
                        href="https://page.stibee.com/subscriptions/465991"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold text-lg rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        <span>무료 구독하기</span>
                    </a>
                </div>

                <p className="mt-6 text-xs text-gray-500">
                    스팸은 절대 보내지 않습니다. 언제든 구독 취소 가능합니다.
                </p>
            </div>
        </section>
    );
}
