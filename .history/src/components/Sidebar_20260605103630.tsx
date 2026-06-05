import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Folder,
  FileText,
  Bell,
  Settings,
  LogOut,
  Home,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

interface SIDEBAR_PROPS {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExit: () => void;
  unreadCount: number;
}

export default function Sidebar({ activeTab, setActiveTab, onExit, unreadCount }: SIDEBAR_PROPS) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'team', label: 'Team Members', icon: PersonnelIcon }, // fall back helper
    { id: 'notifications', label: 'Notifications', icon: Bell, count: unreadCount },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Map personnel icon safely
  function PersonnelIcon(props: any) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  return (
    <aside className="w-68 h-full bg-zinc-950/80 border-r border-zinc-800/60 flex flex-col justify-between backdrop-blur-xl relative z-20">
      {/* Top Section */}
      <div>
        {/* Brand/Logo Header */}
        <div className="h-16 flex items-center px-6 border-b border-zinc-800/40">
          <div className="flex items-center space-x-3">
            {/* Elegant futuristic hexagon brand icon */}
            <div className="flex items-center gap-4">
  <img
    src="/logo/ideaflow-logo.png"
    alt="IdeaFlow"
    className="h-40 w-auto object-contain"
  />
</div>
            <div>
              
              <span className="block text-[9px] text-zinc-500 -mt-1 font-mono tracking-wider">BY IDEA2SITE</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="py-6 px-4 space-y-1.5 select-none">
          <p className="px-3 text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-3">Core Platform</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-item-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 text-sm group ${
                  isActive
                    ? 'bg-gradient-to-r from-zinc-800/80 to-zinc-900/40 text-white font-medium shadow-inner border border-zinc-700/30'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 transition-transform duration-300 group-hover:scale-105 ${
                      isActive ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.count && item.count > 0 ? (
                  <span className="bg-indigo-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full filter saturate-110">
                    {item.count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-zinc-800/40 space-y-3 bg-zinc-950/40">
        {/* Support Card */}
        <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-3">
          <div className="flex items-start space-x-2.5">
            <HelpCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-semibold text-zinc-200 block">Workspace Support</span>
              <span className="text-[11px] text-zinc-500 block leading-tight">Need assistance? Contact our team.</span>
              <a
                href="#support"
                className="text-[11px] text-indigo-400 hover:text-indigo-300 inline-block font-medium hover:underline mt-1"
              >
                Get Help SLA
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Action Helpers */}
        <button
          onClick={onExit}
          className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-zinc-400 hover:text-rose-400 hover:bg-rose-500/5 transition-all text-sm font-medium group"
        >
          <Home className="w-4 h-4 text-zinc-500 group-hover:text-rose-400/80 transition-colors" />
          <span>Exit to Website</span>
        </button>

        {/* User Card */}
        <div className="flex items-center space-x-3 p-2 bg-zinc-900/20 border border-zinc-800/30 rounded-xl">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-display font-semibold text-xs select-none">
            EV
          </div>
          <div className="flex-1 overflow-hidden select-none">
            <span className="text-xs font-semibold text-white block truncate">Elisha Vance</span>
            <span className="text-[10px] text-zinc-500 block truncate font-mono">OWNER • ACME CO</span>
          </div>
          <button
            onClick={onExit}
            title="Sign Out"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800/50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
