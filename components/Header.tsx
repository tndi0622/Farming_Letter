'use client';

import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <button className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors hidden xl:block">
                            <Search className="w-5 h-5" />
                        </button>
                        <Link href="https://page.stibee.com/subscriptions/465991" target="_blank" className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full text-sm hover:opacity-80 transition-opacity">
                            구독하기
                        </Link>
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
                    </div>
                </div>
            )}
        </header>
    );
}
