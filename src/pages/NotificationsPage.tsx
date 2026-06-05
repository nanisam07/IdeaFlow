import React, { useState } from 'react';
import { NOTIFICATIONS_LIST } from '../data';
import { NOTIFICATION_DATA } from '../types';
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  Info,
  ShieldCheck,
  CreditCard,
  Layers,
  Circle,
  FolderLock,
} from 'lucide-react';

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<NOTIFICATION_DATA[]>(NOTIFICATIONS_LIST);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Mark single as read
  const toggleRead = (id: string) => {
    setNotifs(
      notifs.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  // Mark all as read
  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  };

  // Delete notification helper
  const handleDelete = (id: string) => {
    setNotifs(notifs.filter((n) => n.id !== id));
  };

  // Filter category listing
  const filteredNotifs = notifs.filter((n) => {
    if (activeCategory === 'all') return true;
    return n.category === activeCategory;
  });

  const unreadCount = filteredNotifs.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      
      {/* Visual notification glass table control */}
      <div className="glass-card p-6 rounded-3xl border border-zinc-805/40 relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Action Ribbon row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-5 mb-5">
          <div className="flex items-center space-x-3.5">
            <div className="w-9 h-9 rounded-xl bg-pink-550/10 text-pink-400 border border-pink-550/20 flex items-center justify-center font-bold">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                Secure Alarm & System Notifications
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Workspace triggers, security audits, and credit charge logs.
              </p>
            </div>
          </div>

          <div className="flex bg-zinc-900/60 border border-zinc-850 p-0.5 rounded-xl text-xs gap-1">
            <button
              onClick={markAllRead}
              className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white transition cursor-pointer flex items-center space-x-1 font-sans"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark All Read</span>
            </button>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex space-x-1.5 border-b border-zinc-900 pb-4 mb-5 overflow-x-auto">
          {['all', 'system', 'security', 'billing', 'activity'].map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs rounded-xl cursor-pointer transition capitalize font-sans ${
                  isActive
                    ? 'bg-zinc-805 text-white font-semibold border border-zinc-700/50'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Visual Lists */}
        <div className="space-y-3 max-h-[34rem] overflow-y-auto pr-1">
          {filteredNotifs.length === 0 ? (
            <p className="text-center py-16 text-zinc-650 font-mono text-xs leading-relaxed">
              No notifications matching this category in workspace. Clear channels.
            </p>
          ) : (
            filteredNotifs.map((n) => {
              const iconBox =
                n.type === 'error'
                  ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                  : n.type === 'warning'
                  ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                  : n.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                  : 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400';

              return (
                <div
                  key={n.id}
                  onClick={() => toggleRead(n.id)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                    n.read
                      ? 'bg-zinc-900/10 border-zinc-900/60 text-zinc-500'
                      : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-200'
                  }`}
                >
                  {/* Status dot icon */}
                  <div className={`p-2 rounded-xl shrink-0 ${iconBox}`}>
                    {n.category === 'security' ? (
                      <ShieldCheck className="w-4 h-4" />
                    ) : n.category === 'billing' ? (
                      <CreditCard className="w-4 h-4" />
                    ) : n.type === 'warning' ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      <Info className="w-4 h-4" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 py-0.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className={`text-xs font-semibold ${n.read ? 'text-zinc-400' : 'text-white'}`}>
                        {n.title}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 shrink-0">{n.time}</span>
                    </div>

                    <p className="text-xs mt-1 leading-relaxed font-sans text-zinc-400">
                      {n.description}
                    </p>

                    <div className="flex items-center space-x-3.5 mt-2.5 pt-2 border-t border-zinc-900/50 text-[10px] font-mono text-zinc-550">
                      <span className="uppercase font-semibold">CAT: {n.category}</span>
                      <span>•</span>
                      <span>SECURE SYSTEM TRIGGER</span>
                    </div>
                  </div>

                  {/* Operational status toggle indicator */}
                  <div className="shrink-0 pt-1">
                    {!n.read ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-pink-505 shadow shadow-pink-500/30" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full border border-zinc-800" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-900/60 flex flex-col sm:flex-row justify-between text-[11px] font-mono text-zinc-555 gap-2">
          <span>ALARM SYSTEM VERSION (ALARM-O-MATIC v1.0)</span>
          <span>SYSTEM STATE: STABLE DISPATCH</span>
        </div>
      </div>
    </div>
  );
}
