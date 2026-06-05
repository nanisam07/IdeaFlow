import React from 'react';
import Image from 'next/image';

import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Shield,
  Layers,
  Zap,
  Globe,
  Database,
  Lock,
  Compass,
  CheckCircle2,
  Moon,
  Workflow,
  BarChart4,
} from 'lucide-react';
import { SAAS_PLANS } from '../data';

interface LANDING_PAGE_PROPS {
  onEnterApp: () => void;
  onGoToLogin: () => void;
  onSelectPlan: (planName: string) => void;
}

export default function LandingPage({ onEnterApp, onGoToLogin, onSelectPlan }: LANDING_PAGE_PROPS) {
  // Testimonial list
  const testimonials = [
    {
      quote: "IdeaFlow fundamentally transformed how our metrics are digested. The live ClickHouse integration coupled with gorgeous glass visuals keeps our team completely aligned.",
      author: "Samuel Victor",
      role: "CTO, Idea2Site",
      initials: "EH",
      color: "from-indigo-505 to-purple-500",
    },
    {
      quote: "No other dashboard matches this aesthetic density. It is highly responsive and looks like a custom hand-coded design from an elite agency.",
      author: "Victor",
      role: "Director of Systems, Oria",
      initials: "HK",
      color: "from-pink-500 to-rose-500",
    },
    {
      quote: "The SAML single sign-on security flows and instant PDF exporter saves our compliance team hours every week. Truly built for high execution teams.",
      author: "Sarah ",
      role: "Infrastructure Lead, Skynet Corp",
      initials: "SC",
      color: "from-cyan-500 to-emerald-500",
    },
  ];

  // Features grid list
  const features = [
    {
      icon: TrendingUp,
      title: "Real-time Telemetry Analytics",
      desc: "Instant metrics streaming with web socket connections updating revenue, active retention, and conversion ratios seamlessly.",
      color: "text-indigo-400 bg-indigo-500/10",
    },
    {
      icon: Globe,
      title: "Global Node Traffic Routing",
      desc: "Plot international usage structures via beautiful visual map matrices mapping database replica nodes accurately.",
      color: "text-purple-400 bg-purple-500/10",
    },
    {
      icon: Shield,
      title: "Enterprise SAML & SSO Auth",
      desc: "Bank-grade protection protocols securing multi-tenant authentication layers with complete active ledger logging.",
      color: "text-rose-400 bg-rose-500/10",
    },
    {
      icon: Layers,
      title: "Workspace Customization",
      desc: "Organize workflows via modular bento boxes, dynamic time intervals, and multiple sandbox environments.",
      color: "text-amber-400 bg-amber-500/10",
    },
    {
      icon: Database,
      title: "Optimized ClickHouse Pipelines",
      desc: "Ingestion workers that run lightning fast under 50ms, processing millions of event cycles without a hitch.",
      color: "text-emerald-400 bg-emerald-500/10",
    },
    {
      icon: Workflow,
      title: "Gemini Smart Metric Forecasting",
      desc: "Harness Google Gemini predictive algorithms to forecast next quarter churn ratios and cohort drop-off trends.",
      color: "text-pink-400 bg-pink-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-zinc-100 font-sans relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Ambient Background Dots & Lights */}
      <div className="clip-path-grid absolute inset-0 opacity-25" />
      <div className="glow-spot glow-spot-indigo top-[10%] left-[10%]" />
      <div className="glow-spot glow-spot-emerald top-[45%] right-[5%]" />
      <div className="glow-spot top-[75%] left-[25%]" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 h-16 bg-stone-950/80 backdrop-blur-md border-b border-zinc-900/60 transition-all">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3 select-none">
            <div className="flex items-center gap-4">
  <img
    src="/logo/ideaflow-logo.png"
    alt="IdeaFlow"
    className="h-40 w-auto object-contain"
  />
</div>
            <div>
              
              <span className="block text-[8px] text-zinc-500 -mt-1 font-mono tracking-widest">BY IDEA2SITE</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Platform Features</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing Structure</a>
            <a href="https://idea2site.in" className="hover:text-white transition-colors font-mono text-zinc-500 text-xs">DEVELOPED BY IDEA2SITE</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onGoToLogin}
              className="text-sm font-medium text-zinc-300 hover:text-white transition cursor-pointer"
            >
              Log In
            </button>
            <button
              id="landing-hero-cta"
              onClick={onEnterApp}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-500/10 text-white transition-all cursor-pointer flex items-center space-x-1.5 shadow"
            >
              <span>Instant Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm shadow mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-wide text-zinc-300">
              INTRODUCING THE METRIC PIPELINE OF 2026
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.08] max-w-4xl mx-auto">
            Turn Live SaaS Data Into{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 font-extrabold filter saturate-110">
              Decisive Execution
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            IdeaFlow provides analytical precision, predictive forecasting, and real-time visualization of metrics for elite teams. Connect ClickHouse, Postgres, Webhooks, or Stripe in seconds.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              id="hero-go-to-dashboard-btn"
              onClick={onEnterApp}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white transition-all transform hover:-translate-y-0.5 shadow-lg shadow-indigo-600/15 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Launch Live Dashboard Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#pricing"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all text-sm font-semibold text-zinc-400 flex items-center justify-center space-x-1.5"
            >
              <span>Explore Annual Pricing</span>
            </a>
          </div>

          {/* Micro Telemetry Trust Row */}
          <div className="mt-12 flex justify-center items-center space-x-8 text-xs font-mono text-zinc-500">
            <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> SECURE AUDITED</span>
            <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-indigo-500" /> NO CREDIT CARD REQUIRED</span>
            <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-purple-500" /> INSTANT 2026 DEPLOY</span>
          </div>
        </motion.div>

        {/* High fidelity interactive design screenshot mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 max-w-5xl mx-auto rounded-2xl border border-zinc-805/50 p-3 bg-zinc-950/40 backdrop-blur-xl shadow-2xl relative"
        >
          {/* Top Window chrome control indicators */}
          <div className="flex items-center justify-between px-3 pb-3 border-b border-zinc-900/60 mb-2">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/40" />
              <span className="w-3 h-3 rounded-full bg-amber-500/40" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/40" />
            </div>
            <div className="h-5 px-6 rounded bg-zinc-900/50 border border-zinc-800/40 flex items-center text-[10px] font-mono text-zinc-500 select-none">
              https://dashboard.ideaflow.io/vanguard-hub
            </div>
            <div className="w-4" />
          </div>

          <div
            onClick={onEnterApp}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-zinc-950 border border-zinc-900 aspect-video flex flex-col justify-between"
          >
            {/* Hover preview activation card */}
            <div className="absolute inset-0 bg-stone-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-4 z-25">
              <div className="p-3.5 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-650/40 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <BarChart4 className="w-7 h-7" />
              </div>
              <p className="text-sm font-semibold tracking-wide text-white">Enter Live Workspace Platform &rarr;</p>
              <p className="text-[11px] font-mono text-zinc-500">EXPERIENCE THE STEEL SYSTEM ENGINE</p>
            </div>

            {/* Layout simulation inside the mockup */}
            <div className="h-10 border-b border-zinc-900 px-4 flex items-center justify-between bg-zinc-950/20">
              <div className="flex items-center space-x-3.5">
                <div className="w-4 h-4 rounded bg-gradient-to-tr from-indigo-500 to-pink-500" />
                <span className="text-[10px] font-semibold text-zinc-400">Workspace Sandbox</span>
              </div>
              <div className="flex space-x-1.5">
                <div className="w-12 h-4 rounded bg-zinc-900 border border-zinc-800/40" />
                <div className="w-16 h-4 rounded bg-zinc-900 border border-zinc-800/40" />
              </div>
            </div>

            {/* Simulated mock interior */}
            <div className="flex-1 grid grid-cols-4 gap-4 p-4">
              <div className="col-span-1 border border-zinc-900 rounded-xl p-3 flex flex-col justify-between bg-zinc-900/10">
                <div className="space-y-1">
                  <span className="block w-16 h-2 rounded bg-zinc-800" />
                  <span className="block w-24 h-4 rounded bg-zinc-700" />
                </div>
                <div className="h-8 rounded bg-zinc-900 border border-zinc-800/50" />
              </div>
              <div className="col-span-2 border border-zinc-900 rounded-xl p-3 flex flex-col justify-between bg-zinc-900/10 relative">
                <div className="flex justify-between items-center">
                  <span className="block w-24 h-2 rounded bg-zinc-800" />
                  <span className="block w-10 h-3 rounded bg-emerald-500/10" />
                </div>
                {/* Simulated sine line */}
                <div className="h-20 w-full flex items-end justify-between px-2">
                  <span className="w-[8%] h-[30%] bg-indigo-500/20 rounded-t" />
                  <span className="w-[8%] h-[50%] bg-indigo-500/25 rounded-t" />
                  <span className="w-[8%] h-[40%] bg-indigo-500/30 rounded-t" />
                  <span className="w-[8%] h-[75%] bg-indigo-500/40 rounded-t" />
                  <span className="w-[8%] h-[60%] bg-indigo-500/50 rounded-t" />
                  <span className="w-[8%] h-[90%] bg-indigo-500/70 rounded-t-lg" />
                </div>
              </div>
              <div className="col-span-1 border border-zinc-900 rounded-xl p-3 space-y-2 bg-zinc-905/10">
                <span className="block w-12 h-2 rounded bg-zinc-800" />
                <div className="space-y-1.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center bg-zinc-900/40 p-1.5 rounded">
                      <span className="w-8 h-2 rounded bg-zinc-850" />
                      <span className="w-12 h-2 rounded bg-zinc-800" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="py-24 bg-zinc-950/40 border-t border-b border-zinc-900/60 relative scroll-mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">Aesthetic Rigor</span>
            <h3 className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight mt-2">
              Built with High Density Architecture
            </h3>
            <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
              Every detail is calibrated to give founders and sysadmins instant qualitative control of business dynamics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-2xl border border-zinc-900/50 hover:border-zinc-800/80 hover:bg-zinc-900/20 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${feat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-semibold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      {feat.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-900/40 mt-6 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>INDEXED ON TELEMETRY</span>
                    <span className="uppercase text-[9px] group-hover:text-white transition-colors">ACTIVE PROT &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Review section */}
      <section id="testimonials" className="py-24 max-w-7xl mx-auto px-6 scroll-mt-12">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-pink-400 uppercase">User Experience</span>
          <h3 className="text-3xl font-display font-semibold text-white tracking-tight mt-2">
            Trusted by Builders Worldwide
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => {
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-zinc-900/40 flex flex-col justify-between bg-gradient-to-br from-zinc-950 to-zinc-900/40"
              >
                <div>
                  <p className="text-xs text-zinc-400 italic leading-relaxed font-sans">
                    "{test.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-900/60 flex items-center space-x-3 select-none">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${test.color} flex items-center justify-center font-display font-bold text-white text-xs`}>
                    {test.initials}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{test.author}</span>
                    <span className="text-[10px] font-mono text-zinc-500 block uppercase">{test.role}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing Modules Section */}
      <section id="pricing" className="py-24 bg-stone-950/60 border-t border-zinc-900/60 scroll-mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase">Clear Monetization</span>
            <h3 className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight mt-2">
              SaaS Operational Subscriptions
            </h3>
            <p className="text-sm text-zinc-400 mt-3">
              14-day zero lock-in sandbox trial included. Scale up as metrics payload rises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {SAAS_PLANS.map((plan) => {
              return (
                <div
                  key={plan.name}
                  className={`glass-card p-8 rounded-2xl border flex flex-col justify-between relative ${
                    plan.current
                      ? 'border-indigo-500/50 ring-2 ring-indigo-500/20 bg-zinc-900/40'
                      : 'border-zinc-900'
                  }`}
                >
                  {plan.current && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-mono text-[9px] font-bold rounded-full filter uppercase tracking-widest select-none">
                      {plan.badge}
                    </span>
                  )}

                  <div>
                    <div className="mb-4">
                      <span className="text-zinc-500 text-[10px] uppercase tracking-wider block font-mono">OPERATIONAL LEVEL</span>
                      <h4 className="text-lg font-bold text-white font-display mt-0.5">{plan.name}</h4>
                    </div>

                    <div className="flex items-baseline space-x-1.5 mb-6">
                      <span className="text-4xl font-extrabold text-white font-display">{plan.price}</span>
                      <span className="text-zinc-500 text-xs text-sans">/{plan.interval}</span>
                    </div>

                    <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6">
                      {plan.description}
                    </p>

                    {/* Feature bullet list */}
                    <ul className="space-y-3.5 mb-8">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mr-2.5 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      onSelectPlan(plan.name);
                      onEnterApp();
                    }}
                    className={`w-full py-3.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      plan.current
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-650/10'
                        : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                    }`}
                  >
                    Activate {plan.name} Tier
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer Branding Area */}
      <footer className="border-t border-zinc-900 py-12 bg-neutral-950 relative z-10 selection:bg-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center font-display font-semibold text-white text-xs">
              IF
            </div>
            <div>
              <span className="font-display font-semibold text-white tracking-tight text-sm">IdeaFlow</span>
              <span className="block text-[8px] text-zinc-650 font-mono tracking-widest">TURN DATA INTO DECISIONS</span>
            </div>
          </div>

          <div className="text-zinc-500 text-xs font-medium">
            Designed & Developed by <a href="https://idea2site.in" className="text-zinc-400 hover:text-white transition">Idea2Site</a>
          </div>

          <div className="flex space-x-6 text-xs text-zinc-500 font-mono">
            <span> All Rights Reserved </span>
            <span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
