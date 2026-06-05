import React from 'react';
import { RECENT_ACTIVITIES } from '../data';
import { Activity, CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function RecentActivity() {
  return (
    <div className="glass-card p-6 rounded-2xl border border-zinc-800/45 relative overflow-hidden flex flex-col justify-between h-full">
      {/* Background glow shadow spot */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Widget Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-semibold text-white tracking-tight">
              Platform Activity Feed
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-zinc-900 border border-zinc-800 text-zinc-500">
            SECURE AUDIT
          </span>
        </div>
        <p className="text-xs text-zinc-500 mt-0.5">
          Live stream of workspace telemetry, subscription logs, and auth gates.
        </p>
      </div>

      {/* Activity List Container */}
      <div className="mt-4 space-y-3.5 h-88 overflow-y-auto pr-1">
        {RECENT_ACTIVITIES.map((act) => {
          return (
            <div
              key={act.id}
              className="group flex gap-3.5 p-2.5 rounded-xl border border-transparent hover:border-zinc-800/60 hover:bg-zinc-900/30 transition-all duration-200"
            >
              {/* User Avatar Roundel OR Initials */}
              <div className="relative shrink-0">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-xs shadow-inner uppercase select-none ${act.user.color}`}>
                  {act.user.initials}
                </div>
                {/* Micro operational status dot */}
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 rounded-full bg-zinc-950 items-center justify-center border border-zinc-900 shadow">
                  {act.status === 'success' ? (
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  ) : act.status === 'failed' ? (
                    <XCircle className="w-2.5 h-2.5 text-rose-400" />
                  ) : (
                    <AlertCircle className="w-2.5 h-2.5 text-amber-400" />
                  )}
                </span>
              </div>

              {/* Activity description */}
              <div className="flex-1 min-w-0 py-0.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-semibold text-white truncate hover:underline cursor-pointer block">
                    {act.user.name}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                    {act.time}
                  </span>
                </div>
                
                <p className="text-xs text-zinc-400 mt-0.5 font-sans leading-tight">
                  {act.action}{' '}
                  <span className="text-zinc-200 font-medium font-mono text-[11px] bg-zinc-900/80 px-1 py-0.5 rounded border border-zinc-800/40">
                    {act.target}
                  </span>
                </p>

                {/* Email detail and metrics subline if amount exists */}
                <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-zinc-900/40 text-[10px] text-zinc-500">
                  <span className="truncate font-mono font-medium">{act.user.email}</span>
                  {act.amount && (
                    <span className="font-semibold text-emerald-400 font-mono text-[11px] bg-emerald-500/5 px-1.5 py-0.2 rounded border border-emerald-500/10">
                      {act.amount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer loading ticker */}
      <div className="mt-4 pt-3.5 border-t border-zinc-805/40 flex items-center justify-between text-[11px] text-zinc-500">
        <span className="flex items-center space-x-1 font-mono">
          <RefreshCw className="w-2.5 h-2.5 text-zinc-600 animate-spin mr-1" />
          <span>LISTENING ON SOCKET: 3000</span>
        </span>
        <span className="hover:underline cursor-pointer text-indigo-400 font-semibold font-sans">
          Audit Ledger &rarr;
        </span>
      </div>
    </div>
  );
}
