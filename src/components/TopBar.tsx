import React from 'react';
import {
  Calendar,
  Layers,
  ChevronDown,
  RefreshCw,
  Search,
  Zap,
} from 'lucide-react';

interface TOP_BAR_PROPS {
  title: string;
  description: string;
  timeRange: string;
  setTimeRange: (range: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  workspace: string;
  setWorkspace: (ws: string) => void;
}

export default function TopBar({
  title,
  description,
  timeRange,
  setTimeRange,
  isLoading,
  setIsLoading,
  workspace,
  setWorkspace,
}: TOP_BAR_PROPS) {
  const workspaces = [
    { id: 'acme-prod', label: 'Acme Corp (Production)' },
    { id: 'acme-dev', label: 'Acme Corp (Dev-Tunnel)' },
    { id: 'vortex-sh', label: 'Vortex Labs (Staging)' },
  ];

  const ranges = [
    { id: '24h', label: 'Last 24 hours' },
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '12m', label: 'Last 12 months' },
  ];

  return (
    <header className="h-16 bg-zinc-950/40 border-b border-zinc-800/40 flex items-center justify-between px-8 backdrop-blur-xl relative z-10">
      {/* Title & Description Left */}
      <div className="flex items-center space-x-6">
        <div className="hidden sm:block">
          <h1 className="text-base font-semibold text-white tracking-tight leading-none group flex items-center">
            {title}
            <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] bg-zinc-800 text-zinc-400 font-mono tracking-wider">
              SAAS v1.4
            </span>
          </h1>
          <p className="text-xs text-zinc-500 mt-1 font-sans">{description}</p>
        </div>

        {/* Vertical Separator */}
        <div className="h-6 w-px bg-zinc-800/60 hidden md:block" />

        {/* Workspace Selector Dropdown */}
        <div className="relative group/ws hidden md:block">
          <button className="flex items-center space-x-2 text-xs text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-800/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
            <Layers className="w-3.5 h-3.5 text-zinc-500" />
            <span className="font-medium">
              {workspaces.find((ws) => ws.id === workspace)?.label || workspace}
            </span>
            <ChevronDown className="w-3 h-3 text-zinc-500" />
          </button>

          {/* Simulated Dropdown Content */}
          <div className="absolute left-0 mt-1.5 w-52 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl p-1.5 hidden group-hover/ws:block z-30 select-none animate-in fade-in slide-in-from-top-1 duration-150">
            <span className="block text-[9px] font-mono tracking-wider text-zinc-500 px-2 py-1 uppercase">
              Select Workspace
            </span>
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                onClick={() => setWorkspace(ws.id)}
                className={`w-full text-left font-sans text-xs px-2.5 py-2 rounded-lg transition-colors block ${
                  workspace === ws.id
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                }`}
              >
                {ws.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Global Dashboard Controls Right */}
      <div className="flex items-center space-x-4">
        {/* Skeleton Sim Toggle Switch - Awesome polish metric! */}
        <div className="flex items-center space-x-2 bg-zinc-900/40 border border-zinc-800 px-3 py-1 rounded-xl">
          <div className="flex items-center space-x-1.5">
            <Zap className={`w-3.5 h-3.5 ${isLoading ? 'text-indigo-400 animate-bounce' : 'text-zinc-500'}`} />
            <span className="text-[10px] font-mono tracking-tight text-zinc-400 select-none hidden lg:inline">
              Simulate Load Skeletons
            </span>
          </div>
          <button
            id="skeleton-trigger-btn"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 1400);
            }}
            className="text-[10px] bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-semibold px-2 py-0.5 rounded-md flex items-center space-x-1 cursor-pointer transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>Simulate</span>
            )}
          </button>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center space-x-1 bg-zinc-900/80 border border-zinc-800/60 p-1 rounded-xl">
          {ranges.map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-3 py-1 text-[11px] rounded-lg transition-colors cursor-pointer font-sans ${
                timeRange === range.id
                  ? 'bg-zinc-800 text-white font-medium shadow-sm border border-zinc-700/60'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {range.id.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Simulated Trigger Force Update Refresh Button */}
        <button
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 700);
          }}
          className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition"
          title="Force telemetry cycle"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
