'use client';

import { Mail, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function NewsletterSignup() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <section className="relative overflow-hidden py-24 rounded-3xl mx-4 sm:mx-0 my-20">
            {/* Background with gradient and mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-[--secondary] to-[--primary] opacity-20"></div>
            <div className="absolute inset-0 backdrop-blur-3xl"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                <Mail className="w-12 h-12 mx-auto mb-6 text-white" />
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                    Don't Miss a Beat
                </h2>
                <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                    Get the <span className="text-[--warning] font-semibold">GamePulse Daily</span> delivered to your inbox every morning.
                    Fresh news, new releases, and exclusive deals.
                </p>

                {status === 'success' ? (
                    <div className="bg-green-500/20 text-green-400 px-6 py-4 rounded-full inline-flex items-center space-x-2 animate-in fade-in zoom-in">
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-bold">You're in! Welcome to the pulse.</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full px-6 py-4 rounded-full bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent transition-all backdrop-blur-sm"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                            {status === 'loading' ? 'Joining...' : 'Subscribe Free'}
                        </button>
                    </form>
                )}

                <p className="mt-6 text-xs text-gray-500">
                    No spam, ever. Unsubscribe at any time.
                </p>
            </div>
        </section>
    );
}
