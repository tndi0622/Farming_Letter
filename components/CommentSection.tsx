'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { Send, Trash2, User as UserIcon, MessageSquare, Pencil, X, Check } from 'lucide-react';
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

    // Edit State
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState('');

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

    const handleEditInit = (comment: Comment) => {
        setEditingId(comment.id);
        setEditContent(comment.content);
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditContent('');
    };

    const handleUpdate = async (commentId: number) => {
        if (!editContent.trim()) return;

        const { error } = await supabase
            .from('comments')
            .update({ content: editContent.trim() })
            .eq('id', commentId);

        if (!error) {
            setComments(comments.map(c =>
                c.id === commentId ? { ...c, content: editContent.trim() } : c
            ));
            setEditingId(null);
            setEditContent('');
        } else {
            alert('댓글 수정에 실패했습니다.');
            console.error(error);
        }
    };

    return (
        <div className="mt-16 glass-panel p-6 md:p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-black dark:text-white" />
                댓글 <span className="text-black dark:text-white">{comments.length}</span>
            </h3>

            {/* Comment Form */}
            {user ? (
                <form onSubmit={handleSubmit} className="mb-10 relative">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black dark:from-white dark:to-gray-300 flex items-center justify-center shrink-0 text-white dark:text-black font-bold text-sm">
                            {user.email?.[0].toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="이 게임에 대한 생각을 자유롭게 남겨주세요..."
                                className="w-full h-24 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
                            />
                            <div className="flex justify-end mt-2">
                                <button
                                    type="submit"
                                    disabled={submitting || !newComment.trim()}
                                    className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                                >
                                    {submitting ? '등록 중...' : (
                                        <>
                                            등록 <Send className="w-4 h-4" />
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
                                    {user?.id === comment.user_id && editingId !== comment.id && (
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEditInit(comment)}
                                                className="p-1 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                                                title="수정"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(comment.id)}
                                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                title="삭제"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {editingId === comment.id ? (
                                    <div className="mt-2">
                                        <textarea
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            className="w-full h-24 bg-white dark:bg-black/30 border border-black/20 dark:border-white/20 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white resize-none"
                                        />
                                        <div className="flex justify-end gap-2 mt-2">
                                            <button
                                                onClick={handleEditCancel}
                                                className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
                                            >
                                                <X className="w-3 h-3" /> 취소
                                            </button>
                                            <button
                                                onClick={() => handleUpdate(comment.id)}
                                                className="px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-md text-xs font-bold hover:opacity-80 transition-opacity flex items-center gap-1"
                                            >
                                                <Check className="w-3 h-3" /> 저장
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                                        {comment.content}
                                    </p>
                                )}
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
