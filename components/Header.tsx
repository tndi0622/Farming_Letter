'use client';

import Link from 'next/link';
import { Search, Menu, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        // Check initial session
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };
        checkSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-gray-200 dark:border-white/5 bg-white/70 dark:bg-black/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 md:h-24">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <div className="relative w-32 h-16 md:w-40 md:h-16">
                                <Image
                                    src="/logo_transparent-B.svg"
                                    alt="Farming Letter Logo"
                                    fill
                                    className="object-contain dark:invert"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-900 dark:text-white font-medium hover:text-[--primary] transition-colors">뉴스레터</Link>
                        <Link href="#archive" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors text-sm font-medium">지난호 보기</Link>
                    </nav>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle />

                        {user ? (
                            <div className="flex items-center space-x-3">
                                <Link href="/mypage" className="group flex items-center space-x-3 hover:opacity-80 transition-opacity">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[--primary] transition-colors">
                                        {user.user_metadata?.full_name || user.email?.split('@')[0]}님
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[--primary] to-purple-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white dark:ring-black">
                                        {user.email?.[0].toUpperCase()}
                                    </div>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                    title="로그아웃"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[--primary] transition-colors"
                                >
                                    로그인
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full text-sm hover:opacity-80 transition-opacity"
                                >
                                    시작하기
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white p-2"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden glass-panel border-t border-gray-200 dark:border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-white/10">뉴스레터</Link>
                        <Link href="#archive" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10">지난호 보기</Link>

                        <div className="border-t border-gray-200 dark:border-white/10 my-2 pt-2">
                            {user ? (
                                <div className="space-y-2 px-3">
                                    <div className="text-sm text-gray-500">로그인 정보: {user.email}</div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left py-2 text-red-500 font-bold"
                                    >
                                        로그아웃
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2 px-3">
                                    <Link href="/login" className="block py-2 text-gray-600 dark:text-gray-300">로그인</Link>
                                    <Link href="/signup" className="block py-2 text-[--primary] font-bold">회원가입</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
