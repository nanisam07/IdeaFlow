import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Import local page views & widgets
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

// Tab panels
import AnalyticsPage from './pages/AnalyticsPage';
import CustomersPage from './pages/CustomersPage';
import ProjectsPage from './pages/ProjectsPage';
import ReportsPage from './pages/ReportsPage';
import TeamPage from './pages/TeamPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';

// Widgets
import KPICards from './components/KPICards';
import RevenueChart from './components/RevenueChart';
import WorldMapWidget from './components/WorldMapWidget';
import RecentActivity from './components/RecentActivity';

// Ingestion structures & loaders
import {
  SkeletonCard,
  SkeletonTable,
  SkeletonChart,
  SkeletonActivity,
} from './components/Skeleton';
import { GENERAL_KPIS } from './data';

type SCREEN_STATE = 'landing' | 'login' | 'app';

export default function App() {
  // Navigation Screens
  const [screen, setScreen] = useState<SCREEN_STATE>('landing');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedPlan, setSelectedPlan] = useState<string>('Growth Pro');

  // Interactive controls
  const [timeRange, setTimeRange] = useState<string>('30d');
  const [workspace, setWorkspace] = useState<string>('acme-prod');
  const [selectedKpi, setSelectedKpi] = useState<string>('kpi-mrr');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Auto scroll to top on tab transitions
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activeTab, screen]);

  // Simulate loader block on tab selection change to display our awesome Skeletons!
  const handleTabChange = (tabId: string) => {
    setIsLoading(true);
    setActiveTab(tabId);
    setTimeout(() => {
      setIsLoading(false);
    }, 450);
  };

  // Safe tab header titles & descriptions
  const getTabHeader = () => {
    switch (activeTab) {
      case 'dashboard':
        return {
          title: 'Workspace Overview',
          description: 'Live analytical trajectory tracking node billing, clickhouse databases, and regional active hubs.',
        };
      case 'analytics':
        return {
          title: 'Advanced SaaS Analytics',
          description: 'Monitor user cohorts, acquisition pipelines, conversions, and quarterly operating margins.',
        };
      case 'customers':
        return {
          title: 'Workspace Customer Accounts',
          description: 'Manage and search active enterprise clients, spent volumes, and regions globally.',
        };
      case 'projects':
        return {
          title: 'Project Roadmap Boards',
          description: 'Align core roadmaps, track budgets, and manage checklist task milestones.',
        };
      case 'reports':
        return {
          title: 'ClickHouse Query Analyst',
          description: 'Deploy custom SQL query sessions on live analytics buckets safely.',
        };
      case 'team':
        return {
          title: 'Workspace Administrators List',
          description: 'Configure system roles, access scopes, and mail active invitations securely.',
        };
      case 'notifications':
        return {
          title: 'Secure System Alarm Feed',
          description: 'Track security violations, invoice updates, and high capacity alert structures.',
        };
      case 'settings':
        return {
          title: 'Workspace Configuration Settings',
          description: 'Review secret API tokens, slack webhooks setup, and pricing tier controls.',
        };
      default:
        return {
          title: 'IdeaFlow Platform Hub',
          description: 'Premium analytical decisions engine.',
        };
    }
  };

  const headerDetails = getTabHeader();

  // Primary Workspace tab renderer
  const renderActiveTabContent = () => {
    if (isLoading) {
      // Dynamic Skeletons simulation!
      if (activeTab === 'dashboard') {
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SkeletonChart />
              </div>
              <div className="lg:col-span-1">
                <SkeletonActivity />
              </div>
            </div>
          </div>
        );
      }
      return <SkeletonTable />;
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* KPI Cards Row */}
            <KPICards
              kpis={GENERAL_KPIS}
              onSelectKpi={setSelectedKpi}
              selectedKpi={selectedKpi}
            />

            {/* Ingestion & telemetry graphics split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Central Area graph */}
              <div className="lg:col-span-2">
                <RevenueChart selectedKpi={selectedKpi} />
              </div>

              {/* Secure activity stream */}
              <div className="lg:col-span-1">
                <RecentActivity />
              </div>
            </div>

            {/* Geographical map overlay section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <WorldMapWidget />
              </div>

              {/* Informative portfolio quick action card */}
              <div className="glass-card p-6 rounded-2xl border border-zinc-800/40 relative overflow-hidden flex flex-col justify-between text-left select-none bg-gradient-to-tr from-stone-950 via-zinc-950 to-zinc-900/40">
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-550/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="space-y-4">
                  <span className="text-[10px] font-mono tracking-widest text-indigo-404 uppercase">
                    Developer Notes & Creds
                  </span>
                  <h4 className="text-base font-semibold text-white tracking-tight">
                    Welcome to the Live Interactive Demo!
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    This single page platform is fully reactive. Click the cards, select workspaces, check off tasks, and click 'Simulate' to witness skeleton loaders in action.
                  </p>

                  <ul className="space-y-2 text-xs text-zinc-200">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>Sovereign state persistence: Active</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Live ClickHouse emulation layer</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <span>Gemini prediction engine initialized</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-900/60 text-[10px] font-mono text-zinc-500">
                  DEVELOPED & DESIGNED BY IDEA2SITE
                </div>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return <AnalyticsPage />;
      case 'customers':
        return <CustomersPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'team':
        return <TeamPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'settings':
        return <SettingsPage selectedPlan={selectedPlan} />;
      default:
        return (
          <div className="p-12 text-center text-zinc-550 font-mono text-xs select-none">
            WORKSPACE PATH IS LOCKED
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-zinc-100 font-sans relative">
      <AnimatePresence mode="wait">
        {/* LANDING SCREEN */}
        {screen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingPage
              onEnterApp={() => setScreen('app')}
              onGoToLogin={() => setScreen('login')}
              onSelectPlan={(plan) => setSelectedPlan(plan)}
            />
          </motion.div>
        )}

        {/* LOGIN SCREEN */}
        {screen === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <LoginPage
              onSuccess={() => setScreen('app')}
              onCancel={() => setScreen('landing')}
            />
          </motion.div>
        )}

        {/* CORE APPLICATION SPLIT SCREEN */}
        {screen === 'app' && (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-screen overflow-hidden"
          >
            <Sidebar
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              onExit={() => setScreen('landing')}
              unreadCount={2}
            />

            {/* Main scrollable body workspace viewport */}
            <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden bg-stone-950">
              {/* Dynamic lighting effects */}
              <div className="clip-path-grid absolute inset-0 opacity-15" />
              <div className="glow-spot top-1/3 left-1/4" />
              <div className="glow-spot glow-spot-emerald bottom-1/4 right-1/3" />

              <TopBar
                title={headerDetails.title}
                description={headerDetails.description}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                workspace={workspace}
                setWorkspace={setWorkspace}
              />

              {/* Tab panels viewport container */}
              <div className="flex-1 overflow-y-auto px-8 py-6 relative z-10 space-y-6">
                {renderActiveTabContent()}

                {/* Secure footer mark */}
                <footer className="pt-12 pb-6 border-t border-zinc-900/60 mt-12 flex justify-between items-center text-[10px] font-mono text-zinc-650 tracking-wider">
                  <span>DESIGNED & DEVELOPED BY IDEA2SITE</span>
                  
                </footer>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
