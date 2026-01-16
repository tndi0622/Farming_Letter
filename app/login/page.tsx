import AuthForm from '@/components/AuthForm';
import { Metadata } from 'next';

import Link from 'next/link';

export const metadata: Metadata = {
    title: '로그인 - 파밍레터',
    description: '파밍레터에 로그인하고 맞춤형 게임 뉴스를 받아보세요.',
};

export default function LoginPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-white dark:bg-black transition-colors">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[--primary]/10 rounded-full blur-[100px] opacity-50" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] opacity-50" />
            </div>

            <div className="relative z-10 w-full">
                <div className="max-w-md mx-auto mb-6">
                    <Link href="/" className="inline-flex items-center text-gray-500 hover:text-[--primary] transition-colors font-medium">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        메인으로 돌아가기
                    </Link>
                </div>
                <AuthForm view="login" />
            </div>
        </div>
    );
}
