'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { Send, Trash2, User as UserIcon, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Comment {
    id: number;
    user_id: string;
    user_name: string;
    content: string;
    created_at: string;
}

interface CommentSectionProps {
    newsletterId: string;
}

export default function CommentSection({ newsletterId }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const fetchUserAndComments = async () => {
            // Get User
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);

            // Get Comments
            await fetchComments();
            setLoading(false);
        };

        fetchUserAndComments();

        // Optional: Realtime subscription could go here
    }, [newsletterId]);

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('newsletter_id', newsletterId)
            .order('created_at', { ascending: false });

        if (!error && data) {
            setComments(data);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !newComment.trim()) return;

        setSubmitting(true);
        console.log('Submitting comment...', {
            newsletterId,
            userId: user.id,
            userName: user.user_metadata?.full_name || '익명 게이머',
            content: newComment.trim()
        });

        const { data, error } = await supabase
            .from('comments')
            .insert({
                newsletter_id: newsletterId,
                user_id: user.id,
                user_name: user.user_metadata?.full_name || '익명 게이머',
                content: newComment.trim(),
            })
            .select()
            .single();

        if (!error && data) {
            console.log('Comment submitted successfully:', data);
            setNewComment('');
            // Optimistic update or fetch
            setComments(prev => [data as Comment, ...prev]);
        } else {
            console.error('Error submitting comment:', error);
            alert(`댓글 작성에 실패했습니다: ${error?.message}`);
        }
        setSubmitting(false);
    };

    const handleDelete = async (commentId: number) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        const { error } = await supabase
            .from('comments')
            .delete()
            .eq('id', commentId);

        if (!error) {
            setComments(comments.filter(c => c.id !== commentId));
        } else {
            alert('삭제 실패');
        }
    };

    return (
        <div className="mt-16 glass-panel p-6 md:p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[--primary]" />
                댓글 <span className="text-[--primary]">{comments.length}</span>
            </h3>

            {/* Comment Form */}
            {user ? (
                <form onSubmit={handleSubmit} className="mb-10 relative">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[--primary] to-purple-600 flex items-center justify-center shrink-0 text-white font-bold text-sm">
                            {user.email?.[0].toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="이 게임에 대한 생각을 자유롭게 남겨주세요..."
                                className="w-full h-24 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[--primary] resize-none"
                            />
                            <div className="flex justify-end mt-2">
                                <button
                                    type="submit"
                                    disabled={submitting || !newComment.trim()}
                                    className="px-4 py-2 bg-[--primary] text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {submitting ? '등록 중...' : (
                                        <>
                                            등록 <Send className="w-3 h-3" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="mb-10 p-6 bg-gray-50 dark:bg-white/5 rounded-xl text-center border border-gray-100 dark:border-white/5">
                    <p className="text-gray-500 mb-4">댓글을 작성하려면 로그인이 필요합니다.</p>
                    <Link
                        href={`/login?redirect=${pathname}`}
                        className="inline-block px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
                    >
                        로그인하기
                    </Link>
                </div>
            )}

            {/* Comment List */}
            {loading ? (
                <div className="space-y-4">
                    {[1, 2].map(i => (
                        <div key={i} className="flex gap-4 animate-pulse">
                            <div className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/4" />
                                <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : comments.length > 0 ? (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="group flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center shrink-0 text-gray-500 dark:text-gray-300 font-bold text-sm">
                                {comment.user_name[0]}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-900 dark:text-white">{comment.user_name}</span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(comment.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    {user?.id === comment.user_id && (
                                        <button
                                            onClick={() => handleDelete(comment.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-gray-500">
                    첫 번째 댓글의 주인공이 되어보세요! 🎉
                </div>
            )}
        </div>
    );
}
