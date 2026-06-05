import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Fingerprint,
} from 'lucide-react';

interface LOGIN_PAGE_PROPS {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function LoginPage({ onSuccess, onCancel }: LOGIN_PAGE_PROPS) {
  const [email, setEmail] = useState('demo@idea2site.com');
  const [password, setPassword] = useState('password123');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Simulate authenticating against standard bank-grade SAML SSO
    setTimeout(() => {
      if (!email.includes('@')) {
        setError('Please enter a valid credentials routing email.');
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
        onSuccess();
      }
    }, 1205);
  };

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-zinc-100 flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 clip-path-grid opacity-25" />
      <div className="glow-spot top-1/4 left-1/4" />
      <div className="glow-spot glow-spot-emerald bottom-1/4 right-1/4" />

      {/* Main Glass Contain Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-stone-950/60 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-2xl relative shadow-2xl z-10"
      >
        {/* Back and Header */}
        <div className="flex justify-between items-center mb-8 select-none">
          <button
            onClick={onCancel}
            className="text-xs text-zinc-500 hover:text-white transition font-mono"
          >
            &larr; Back to Home
          </button>
          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono tracking-wider px-2 py-0.5 rounded-full uppercase">
            SECURE ROUTE
          </span>
        </div>

        {/* Brand Display */}
        <div className="text-center mb-8 select-none">
          <div className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 items-center justify-center shadow-lg shadow-purple-500/15 mb-4">
            <Fingerprint className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-display font-bold text-white tracking-tight">
            Authenticate to IdeaFlow
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Access your secure analytics workspace nodes instantly.
          </p>
        </div>

        {error && (
          <div className="mb-5 bg-rose-500/10 border border-rose-500/25 p-3 rounded-xl flex items-start gap-2.5 text-xs text-rose-400 font-sans">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block">
              Workspace Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@idea2site.com"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-indigo-500/80 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-650 transition outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider">
              <label className="text-zinc-500">Workspace Password</label>
              <a href="#reset" className="text-indigo-400 hover:text-indigo-300 transition">
                Reset Secret
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-indigo-500/80 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-650 transition outline-none"
              />
            </div>
          </div>

          {/* Secure SAML sign-on check */}
          <div className="flex items-center space-x-2 py-1 select-none">
            <input
              type="checkbox"
              id="saml"
              defaultChecked
              className="accent-indigo-504 w-4 h-4 bg-zinc-900 border-zinc-800 roundedcursor-pointer focus:ring-0"
            />
            <label htmlFor="saml" className="text-xs text-zinc-400 cursor-pointer">
              Secure authentication via Enterprise Identity Provider
            </label>
          </div>

          {/* Trigger Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl cursor-pointer text-xs transition duration-200 mt-2 flex items-center justify-center space-x-2 group hover:shadow-lg hover:shadow-indigo-500/10"
          >
            {isSubmitting ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Synchronizing Ledgers...</span>
              </span>
            ) : (
              <>
                <span>Mount Analytics Session</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Footnote */}
        <div className="text-center mt-8 text-[11px] text-zinc-650 font-mono select-none">
          DESIGNED & DEVELOPED BY IDEA2SITE
        </div>
      </motion.div>
    </div>
  );
}
