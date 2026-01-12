'use client';

import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function NewsletterSignup() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            if (!supabase) {
                throw new Error('시스템 설정 오류: 데이터베이스 연결이 설정되지 않았습니다.');
            }

            // Check if email already exists (optional, but good practice)
            // Ideally, the database column should have a UNIQUE constraint.

            const { error } = await supabase
                .from('subscribers')
                .insert([{ email }]);

            if (error) {
                if (error.code === '23505') { // Unique violation code
                    throw new Error('이미 구독 중인 이메일입니다.');
                }
                throw error;
            }

            setStatus('success');
            setEmail('');
        } catch (error: any) {
            console.error('Subscription error:', error);
            setStatus('error');
            setErrorMessage(error.message || '구독 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <section className="relative overflow-hidden py-12 md:py-24 rounded-3xl mx-4 sm:mx-0 my-10 md:my-20">
            {/* Background with gradient and mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-[--secondary] to-[--primary] opacity-20"></div>
            <div className="absolute inset-0 backdrop-blur-3xl"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                <Mail className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 md:mb-6 text-white" />
                <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
                    게임 트렌드의 중심
                </h2>
                <p className="text-base md:text-lg text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto">
                    매일 아침 <span className="text-[--warning] font-semibold">파밍레터 데일리</span>를 메일함으로 보내드립니다.
                    따끈따끈한 최신 뉴스, 신작 정보, 그리고 독점 할인 혜택을 놓치지 마세요.
                </p>

                {status === 'success' ? (
                    <div className="bg-green-500/20 text-green-400 px-6 py-4 rounded-full inline-flex items-center space-x-2 animate-in fade-in zoom-in">
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-bold">구독 완료! 파밍레터에 오신 것을 환영합니다.</span>
                    </div>
                ) : (
                    <div className="max-w-lg mx-auto w-full">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일 주소를 입력하세요"
                                required
                                className="w-full px-6 py-3 md:py-4 rounded-full bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent transition-all backdrop-blur-sm"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full sm:w-auto px-8 py-3 md:py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                {status === 'loading' ? '처리 중...' : '무료 구독하기'}
                            </button>
                        </form>
                        {status === 'error' && (
                            <div className="mt-4 text-red-400 flex items-center justify-center space-x-2 text-sm animate-in slide-in-from-top-2">
                                <AlertCircle className="w-4 h-4" />
                                <span>{errorMessage}</span>
                            </div>
                        )}
                    </div>
                )}

                <p className="mt-6 text-xs text-gray-500">
                    스팸은 절대 보내지 않습니다. 언제든 구독 취소 가능합니다.
                </p>
            </div>
        </section>
    );
}
