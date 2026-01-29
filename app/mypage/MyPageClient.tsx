'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Settings, LogOut, Gamepad, User as UserIcon } from 'lucide-react';
import GameCard from '@/components/GameCard';
import GameCardSkeleton from '@/components/skeletons/GameCardSkeleton';
import { Game } from '@/lib/types';
import { featuredGame, newReleases, popularGames } from '@/lib/mockData';



export default function MyPageClient() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'wishlist' | 'library' | 'settings'>('wishlist');
    const [wishlist, setWishlist] = useState<Game[]>([]);

    // Settings State
    const [newsletter, setNewsletter] = useState(false);
    const [discountAlert, setDiscountAlert] = useState(false);

    // Profile Edit State
    const [originalName, setOriginalName] = useState('');
    const [editName, setEditName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/login');
                return;
            }
            setUser(session.user);

            // Initialize Settings from Metadata
            const metadata = session.user.user_metadata || {};
            setNewsletter(metadata.newsletter_subscribed ?? false); // Default to false if undefined
            setDiscountAlert(metadata.discount_alert ?? false);
            setOriginalName(metadata.full_name || '게이머');
            setEditName(metadata.full_name || '게이머');

            // Fetch real wishlist from Supabase
            const { data, error } = await supabase
                .from('wishlists')
                .select('*')
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false });

            if (!error && data) {
                const mappedGames: Game[] = data.map((item: any) => ({
                    id: item.game_id,
                    title: item.title,
                    coverImage: item.cover_image || '/placeholder_game.jpg',
                    platforms: [item.platform || 'Unknown'],
                    releaseDate: '2025', // Placeholder
                    rating: 0,
                    source: 'manual',
                }));
                setWishlist(mappedGames);
            }
            setLoading(false);
        };

        checkUser();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    // --- Profile Edit Handlers ---
    const startEditing = () => {
        setEditName(originalName);
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setEditName(originalName);
        setIsEditing(false);
    };

    const saveProfile = async () => {
        if (!user) return;
        if (!editName.trim()) {
            alert('닉네임을 입력해주세요.');
            return;
        }
        setIsSaving(true);
        try {
            const { data, error } = await supabase.auth.updateUser({
                data: { full_name: editName }
            });

            if (error) throw error;

            if (data.user) {
                setUser(data.user);
                setOriginalName(editName); // Update local original
                setIsEditing(false);
                alert('프로필이 업데이트되었습니다.');
            }
        } catch (error: any) {
            console.error('Update error:', error);
            alert('업데이트 실패: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    // --- Toggle Handlers ---
    const toggleNewsletter = async () => {
        if (!user) return;
        const newValue = !newsletter;
        setNewsletter(newValue); // Optimistic UI update

        try {
            const { error } = await supabase.auth.updateUser({
                data: { newsletter_subscribed: newValue }
            });
            if (error) {
                setNewsletter(!newValue); // Revert on error
                console.error(error);
                alert('설정 저장 실패');
            }
        } catch (err) {
            setNewsletter(!newValue);
        }
    };

    const toggleDiscountAlert = async () => {
        if (!user) return;
        const newValue = !discountAlert;
        setDiscountAlert(newValue); // Optimistic UI update

        try {
            const { error } = await supabase.auth.updateUser({
                data: { discount_alert: newValue }
            });
            if (error) {
                setDiscountAlert(!newValue); // Revert on error
                console.error(error);
                alert('설정 저장 실패');
            }
        } catch (err) {
            setDiscountAlert(!newValue);
        }
    };

    // --- Delete Account Handler ---
    const handleDeleteAccount = async () => {
        if (!user) return;
        if (!confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없으며, 모든 데이터(찜 목록 등)가 삭제됩니다.')) return;

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('No active session');

            // Call API route for key-protected deletion
            const res = await fetch('/api/auth/delete-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({ userId: user.id })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Delete failed');
            }

            // Sign out locally
            await supabase.auth.signOut();
            alert('회원 탈퇴가 완료되었습니다.');
            router.push('/');
            router.refresh();

        } catch (error: any) {
            console.error('Delete User Error:', error);
            alert('탈퇴 처리 중 오류가 발생했습니다: ' + error.message);
        }
    };


    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="glass-panel p-8 rounded-3xl mb-8 flex flex-col md:flex-row gap-6 animate-pulse">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 dark:bg-white/10" />
                    <div className="flex-1 space-y-4 py-2">
                        <div className="w-48 h-8 bg-gray-200 dark:bg-white/10 rounded" />
                        <div className="w-32 h-4 bg-gray-200 dark:bg-white/10 rounded" />
                        <div className="flex gap-2">
                            <div className="w-20 h-6 bg-gray-200 dark:bg-white/10 rounded-full" />
                            <div className="w-20 h-6 bg-gray-200 dark:bg-white/10 rounded-full" />
                        </div>
                    </div>
                </div>
                {/* Content Tabs Skeleton */}
                <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-white/5 p-1 rounded-xl w-3/4 h-12 animate-pulse" />

                {/* Content Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-80">
                            <GameCardSkeleton />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-[--primary] transition-colors font-medium">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    메인으로 돌아가기
                </Link>
            </div>

            {/* Profile Header */}
            <div className="glass-panel p-8 rounded-3xl mb-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[--primary]/5 to-purple-500/5 z-0" />

                {/* Avatar */}
                <div className="relative z-10">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-[--primary] to-purple-500 p-[3px] shadow-xl">
                        <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center overflow-hidden relative">
                            {/* Placeholder Avatar - Use first char of full_name if avail, else email */}
                            <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[--primary] to-purple-500">
                                {(originalName || user?.email || 'G')[0].toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left relative z-10 w-full md:w-auto">
                    {isEditing ? (
                        <div className="mb-4 max-w-xs mx-auto md:mx-0">
                            <label className="block text-xs font-bold text-gray-500 mb-1">닉네임 변경</label>
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-white/20 bg-white dark:bg-black/20 focus:ring-2 focus:ring-[--primary] outline-none text-black dark:text-white"
                                placeholder="새 닉네임"
                            />
                        </div>
                    ) : (
                        <div className="flex items-end justify-center md:justify-start gap-2 mb-2">
                            <h1 className="text-3xl font-bold text-black dark:text-white">
                                {originalName}
                            </h1>
                            <span className="text-xl font-bold text-[--primary] mb-1">
                                Lv. {Math.floor((user?.user_metadata?.exp || 0) / 100) + 1}
                            </span>
                        </div>
                    )}

                    {/* EXP Progress Bar */}
                    <div className="w-full max-w-xs mx-auto md:mx-0 mb-4 group relative">
                        <div className="flex justify-between text-xs text-gray-500 mb-1 font-bold">
                            <span>EXP</span>
                            <span>{(user?.user_metadata?.exp || 0) % 100} / 100</span>
                        </div>
                        <div className="h-2.5 bg-gray-200 dark:bg-black/40 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[--primary] to-purple-500 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${(user?.user_metadata?.exp || 0) % 100}%` }}
                            />
                        </div>
                        {/* Tooltip */}
                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            다음 레벨까지 {100 - ((user?.user_metadata?.exp || 0) % 100)} EXP 남음
                        </div>
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">{user?.email}</p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        <span className="px-3 py-1 bg-[--primary]/10 text-[--primary] rounded-full text-xs font-bold border border-[--primary]/20">
                            PC 게이머
                        </span>
                        {Math.floor((user?.user_metadata?.exp || 0) / 100) >= 2 && (
                            <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-full text-xs font-bold border border-yellow-500/20">
                                베테랑
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 relative z-10 w-full md:w-auto">
                    {isEditing ? (
                        <div className="flex gap-2">
                            <button
                                onClick={saveProfile}
                                disabled={isSaving}
                                className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                {isSaving ? '저장 중...' : '저장'}
                            </button>
                            <button
                                onClick={cancelEditing}
                                disabled={isSaving}
                                className="px-5 py-2.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors"
                            >
                                취소
                            </button>
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={handleLogout}
                                className="px-5 py-2.5 bg-gray-100 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded-xl text-sm font-bold transition-all flex items-center justify-center md:justify-start gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                로그아웃
                            </button>
                            <button
                                onClick={startEditing}
                                className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center md:justify-start gap-2"
                            >
                                <UserIcon className="w-4 h-4" />
                                프로필 편집
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Content Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-200/80 dark:bg-white/5 p-1 rounded-xl w-full md:w-fit mx-auto md:mx-0 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === 'wishlist'
                        ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                >
                    <Heart className={`w-4 h-4 ${activeTab === 'wishlist' ? 'text-red-500 fill-red-500' : ''}`} />
                    찜한 게임
                </button>

                <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === 'settings'
                        ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                >
                    <Settings className="w-4 h-4" />
                    설정
                </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {activeTab === 'wishlist' && (
                    <div className="space-y-6">
                        {wishlist.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {wishlist.map((game) => (
                                    <div key={game.id} className="h-80">
                                        <GameCard game={game} initialIsWishlisted={true} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">찜한 게임이 없습니다</h3>
                                <p className="text-gray-500">마음에 드는 게임을 찾아보세요!</p>
                                <Link href="/" className="inline-block mt-6 px-6 py-3 bg-[--primary] text-white rounded-full font-bold hover:shadow-lg transition-all">
                                    게임 둘러보기
                                </Link>
                            </div>
                        )}
                    </div>
                )}



                {activeTab === 'settings' && (
                    <div className="glass-panel p-6 md:p-8 rounded-3xl max-w-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">알림 설정</h3>

                        <div className="space-y-4">
                            {/* Newsletter Toggle */}
                            <div
                                onClick={toggleNewsletter}
                                className="flex items-center justify-between p-4 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                            >
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">뉴스레터 수신</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">매주 새로운 게임 소식을 이메일로 받습니다.</p>
                                </div>
                                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${newsletter ? 'bg-[--primary]' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm ${newsletter ? 'translate-x-6' : 'translate-x-1'}`}
                                    />
                                </div>
                            </div>

                            {/* Discount Alert Toggle */}
                            <div
                                onClick={toggleDiscountAlert}
                                className="flex items-center justify-between p-4 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                            >
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">찜한 게임 할인 알림</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">찜한 게임이 50% 이상 할인하면 알려줍니다.</p>
                                </div>
                                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${discountAlert ? 'bg-[--primary]' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm ${discountAlert ? 'translate-x-6' : 'translate-x-1'}`}
                                    />
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-6 mt-10 text-gray-900 dark:text-white">계정</h3>
                        <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
                            <h4 className="text-red-600 font-bold mb-2">회원 탈퇴</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다.</p>
                            <button
                                onClick={handleDeleteAccount}
                                className="text-xs text-red-500 font-bold underline hover:text-red-700 dark:hover:text-red-400"
                            >
                                탈퇴하기
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
