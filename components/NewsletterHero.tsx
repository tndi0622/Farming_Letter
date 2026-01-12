'use client';

import { Mail, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { useState } from 'react';

export default function NewsletterHero() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            // Import dynamically or check for instance availability
            const { supabase } = await import('@/lib/supabaseClient');

            if (!supabase) {
                throw new Error('시스템 점검 중입니다. 잠시 후 다시 시도해주세요.');
            }

            const { error } = await supabase
                .from('subscribers')
                .insert([{ email }]);

            if (error) {
                if (error.code === '23505') {
                    throw new Error('이미 구독 중인 이메일입니다.');
                }
                throw error;
            }

            setStatus('success');
            setEmail('');
        } catch (error: any) {
            console.error('Subscription error:', error);
            setStatus('error'); // There is no 'error' status in the original state type, need to update it too
            setErrorMessage(error.message || '오류가 발생했습니다.');
        }
    };

    return (
        <div className="relative w-full h-screen border-b border-white/5 flex items-center justify-center overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-black">
                <div className="absolute inset-0 bg-gradient-to-tr from-[--secondary]/20 via-black to-[--primary]/20 animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[--primary]/10 to-transparent opacity-50" />
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

                {/* Badge */}
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Zap className="w-3 h-3 md:w-4 md:h-4 text-[--warning]" />
                    <span className="text-xs md:text-sm font-medium text-gray-300">5만 명의 게이머와 함께하세요</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    게임 트렌드 <br />
                    <span className="text-[--primary]">매일 아침 배송.</span>
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-2xl text-gray-400 mb-8 md:mb-10 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    더 이상 찾아헤매지 마세요. 신작 소식부터 숨은 명작, 최저가 할인 정보까지 <span className="text-white font-semibold">5분 요약 뉴스레터</span>로 받아보세요.
                </p>

                {/* Signup Form */}
                <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    {status === 'success' ? (
                        <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-8 py-6 rounded-2xl flex flex-col items-center space-y-2 backdrop-blur-md">
                            <CheckCircle className="w-8 h-8 mb-2" />
                            <span className="font-bold text-lg">구독해주셔서 감사합니다!</span>
                            <span className="text-sm opacity-80">메일함을 확인해주세요.</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[--primary] to-[--secondary] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-black/80 sm:bg-black rounded-2xl sm:rounded-full p-2 border border-white/10 shadow-2xl gap-2 sm:gap-0">
                                <div className="pl-2 sm:pl-4 text-gray-400 hidden sm:block">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="이메일 주소를 입력하세요"
                                    required
                                    className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder-gray-500 text-base md:text-lg text-center sm:text-left rounded-xl sm:rounded-none"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="px-6 md:px-8 py-3 bg-white text-black font-bold rounded-xl sm:rounded-full hover:bg-gray-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 whitespace-nowrap"
                                >
                                    <span>{status === 'loading' ? '구독 중...' : '무료 구독하기'}</span>
                                    {!status && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </div>
                            <p className="mt-4 text-xs md:text-sm text-gray-500">
                                평생 무료. 언제든 구독 취소 가능합니다.
                            </p>
                        </form>
                    )}
                    {status === 'error' && (
                        <p className="mt-2 text-red-400 text-sm md:text-base animate-in fade-in slide-in-from-top-2">
                            {errorMessage}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
