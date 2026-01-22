'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Mail, Lock, ArrowRight, Github, User } from 'lucide-react';

interface AuthFormProps {
    view: 'login' | 'signup';
}

export default function AuthForm({ view }: AuthFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validation for Signup
        if (view === 'signup') {
            if (password !== confirmPassword) {
                setError('비밀번호가 서로 일치하지 않습니다.');
                setLoading(false);
                return;
            }

            // Nickname Validation
            const hasHangul = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(nickname);
            const minLength = hasHangul ? 2 : 4;

            if (nickname.length < minLength) {
                setError(hasHangul
                    ? '한글 닉네임은 2글자 이상이어야 합니다.'
                    : '영문 닉네임은 4글자 이상이어야 합니다.');
                setLoading(false);
                return;
            }

            if (!email.includes('@')) {
                setError('올바른 이메일 형식이 아닙니다. (@ 포함)');
                setLoading(false);
                return;
            }
        }

        try {
            if (view === 'signup') {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                        data: {
                            full_name: nickname, // Store nickname in user metadata
                        },
                    },
                });
                if (error) throw error;

                // 이메일 확인 알림 제거 및 바로 로그인 시도
                if (data.session) {
                    router.push('/');
                    router.refresh();
                } else {
                    // 세션이 바로 생성되지 않은 경우 (보통 이메일 확인 설정 때문)
                    // 로그인 시도
                    const { error: signInError } = await supabase.auth.signInWithPassword({
                        email,
                        password,
                    });

                    if (!signInError) {
                        router.push('/');
                        router.refresh();
                    } else {
                        // 이메일 확인이 필수인 경우 여기서 실패할 수 있음
                        // 사용자 요청에 따라 알림은 띄우지 않거나, 최소한의 안내만 함
                        console.error('Auto-login failed:', signInError);
                        alert('자동 로그인에 실패했습니다. Supabase 설정에서 이메일 확인을 비활성화했는지 확인해주세요.');
                    }
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.push('/');
                router.refresh();
            }
        } catch (err: any) {
            setError(err.message || '오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="w-full max-w-md mx-auto">
            <div className="glass-panel border border-white/20 dark:border-white/10 bg-white/50 dark:bg-black/50 p-8 rounded-2xl shadow-xl backdrop-blur-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
                        {view === 'login' ? '다시 오셨군요!' : '모험을 시작하세요'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {view === 'login'
                            ? '파밍레터와 함께 게임 세상을 탐험할 준비가 되셨나요?'
                            : '나만의 맞춤형 게임 뉴스레터를 받아보세요.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nickname Field - Only for Signup */}
                    {view === 'signup' && (
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">닉네임</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-[--primary] transition-colors" />
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    placeholder="멋진 닉네임을 지어주세요"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[--primary]/50 focus:border-[--primary] transition-all text-gray-900 dark:text-white"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">이메일</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-[--primary] transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[--primary]/50 focus:border-[--primary] transition-all text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">비밀번호</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-[--primary] transition-colors" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[--primary]/50 focus:border-[--primary] transition-all text-gray-900 dark:text-white"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    {/* Password Confirm - Only for Signup */}
                    {view === 'signup' && (
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">비밀번호 확인</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-[--primary] transition-colors" />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="비밀번호를 한번 더 입력해주세요"
                                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-white/5 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-900 dark:text-white ${confirmPassword && password !== confirmPassword
                                        ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                                        : 'border-gray-200 dark:border-white/10 focus:ring-[--primary]/50 focus:border-[--primary]'
                                        }`}
                                    required
                                    minLength={6}
                                />
                            </div>
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-xs text-red-500 ml-1">비밀번호가 일치하지 않습니다.</p>
                            )}
                        </div>
                    )}

                    {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400 animate-pulse">
                            🚨 {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <span>{view === 'login' ? '로그인하기' : '회원가입하기'}</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {view === 'login' ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?'} {''}
                        <Link
                            href={view === 'login' ? '/signup' : '/login'}
                            className="font-bold text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                            {view === 'login' ? '회원가입하기' : '로그인하기'}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
