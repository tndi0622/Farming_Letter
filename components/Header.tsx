'use client';

import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 md:h-24">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <div className="relative w-48 h-20 md:w-28 md:h-14">
                                <Image
                                    src="/logo-B.svg"
                                    alt="Farming Letter Logo"
                                    fill
                                    className="object-contain invert mix-blend-screen"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/" className="text-white font-medium">뉴스레터</Link>
                        <Link href="#archive" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">지난호 보기</Link>
                        <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">리뷰</Link>
                        <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">캘린더</Link>
                    </nav>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <Link href="#subscribe" className="px-4 py-2 bg-white text-black font-bold rounded-full text-sm hover:bg-gray-200 transition-colors">
                            구독하기
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-300 hover:text-white p-2"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden glass-panel border-t border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-white/10">뉴스레터</Link>
                        <Link href="#archive" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">지난호 보기</Link>
                        <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">리뷰</Link>
                        <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">캘린더</Link>
                    </div>
                </div>
            )}
        </header>
    );
}
