import React, { useState } from 'react';
import {
  Settings,
  Database,
  Lock,
  Globe,
  Compass,
  CheckCircle2,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  Slack,
} from 'lucide-react';

interface SETTINGS_PAGE_PROPS {
  selectedPlan: string;
}

export default function SettingsPage({ selectedPlan }: SETTINGS_PAGE_PROPS) {
  const [showKey, setShowKey] = useState(false);
  const [apiKey, setApiKey] = useState('if_live_949a2939b4b445037d04ea3810ef10be93');
  const [refreshInterval, setRefreshInterval] = useState('10 Seconds (Aggressive)');
  const [isCopied, setIsCopied] = useState(false);

  const [slackUrl, setSlackUrl] = useState('https://hooks.slack.com/services/T00/B00/X00');
  const [webhookLogs, setWebhookLogs] = useState(true);

  // Copy API key helper
  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1400);
  };

  // Re-generate API Key simulation trigger
  const handleReGenerate = () => {
    if (confirm('Re-generating the production key will immediately revoke the active live tunnel. Proceed?')) {
      const generated = 'if_live_' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setApiKey(generated);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 2 column grid block configs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* API keys console panel (Silicon valley mock security) */}
        <div className="glass-card p-6 rounded-3xl border border-zinc-805/40 relative overflow-hidden flex flex-col justify-between h-full col-span-2 select-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-550/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-rose-455" />
              Production API Credentials Core
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Securely authenticate webhooks and ClickHouse ingestion routers instantly.
            </p>
          </div>

          <div className="space-y-4 mt-6">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-555 block">
                Live Production Private Token Key
              </span>
              <div className="flex gap-2">
                <div className="relative flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-400 font-mono tracking-tight flex items-center">
                  <span>{showKey ? apiKey : '••••••••••••••••••••••••••••••••••••'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="p-3 bg-zinc-900 hover:bg-zinc-850 hover:text-white border border-zinc-800 rounded-xl transition cursor-pointer"
                  title="Reveal Credentials"
                >
                  {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-3 bg-zinc-900 hover:bg-zinc-850 hover:text-white border border-zinc-800 rounded-xl transition cursor-pointer flex items-center space-x-1"
                  title="Copy token to clipboard"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {isCopied && <span className="text-[9px] text-emerald-450 font-sans font-bold">COPIED</span>}
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-900/60 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleReGenerate}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs px-4 py-2.5 rounded-xl cursor-pointer transition font-semibold"
              >
                Re-generate Production Token Key
              </button>
              <button
                type="button"
                onClick={() => alert('API configuration ledger is locked and verified.')}
                className="bg-indigo-600 hover:bg-indigo-505 text-white text-xs px-4 py-2.5 rounded-xl cursor-pointer transition font-semibold"
              >
                Verify Token Credentials Locks
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-900/60 text-[11px] text-zinc-500 font-mono flex items-center gap-1.5 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>
              All API keys access are encrypted using SHA-256 HSM arrays. (PORT: 3000 TLS).
            </span>
          </div>
        </div>

        {/* Workspace Operations Settings */}
        <div className="glass-card p-6 rounded-3xl border border-zinc-805/40 relative overflow-hidden flex flex-col justify-between h-full col-span-1">
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-1.5">
              <Settings className="w-4 h-4 text-purple-400" />
              Telemetry controls
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Set refresh and caching algorithms.
            </p>
          </div>

          <div className="space-y-4 mt-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono tracking-wider text-zinc-550 uppercase">
                Telemetry Buffer Duration Cycle
              </label>
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-805 focus:border-indigo-505 rounded-xl py-2.5 px-3.5 text-xs text-zinc-200 outline-none transition"
              >
                <option>10 Seconds (Aggressive)</option>
                <option>60 Seconds (Developer)</option>
                <option>5 Minutes (Standard REST SLA)</option>
                <option>Never Refresh buffer</option>
              </select>
            </div>

            {/* Simulated Slack integration switch */}
            <div className="p-3 bg-zinc-950/40 border border-zinc-900 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider text-zinc-400 flex items-center gap-1">
                  <Slack className="w-3.5 h-3.5 text-amber-500" />
                  Slack Alerts
                </span>
                <input
                  type="checkbox"
                  id="slack-switch"
                  checked={webhookLogs}
                  onChange={(e) => setWebhookLogs(e.target.checked)}
                  className="accent-indigo-505 w-4 h-4 cursor-pointer"
                />
              </div>
              <input
                type="text"
                value={slackUrl}
                disabled={!webhookLogs}
                onChange={(e) => setSlackUrl(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-850 rounded-lg p-2 text-[10px] font-mono text-zinc-500 outline-none placeholder-zinc-700"
              />
            </div>
          </div>

          <div className="text-[9px] text-zinc-600 font-mono mt-6 text-center select-none uppercase">
            Sovereign parameters configured
          </div>
        </div>

      </div>

      {/* Subscription Active Tier block */}
      <div className="glass-card p-6 rounded-3xl border border-zinc-800/40 relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h4 className="text-base font-semibold text-white tracking-tight flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-450" />
              Active Workspace Subscription Tier
            </h4>
            <p className="text-xs text-zinc-500 mt-0.5">
              Change subscription properties, invoices history, or cancel credentials sandbox.
            </p>
          </div>

          <div className="px-3.5 py-1.5.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-404 font-mono text-xs font-bold uppercase select-none tracking-wider">
            Active: {selectedPlan || 'Growth Pro'}
          </div>
        </div>

        {/* Feature outline */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-zinc-950/40 border border-zinc-900 p-3.5 rounded-xl text-left">
            <span className="text-[9px] text-zinc-650 uppercase font-mono block">Billing cycle status</span>
            <span className="block text-xs font-semibold text-emerald-400 mt-1">
              Active - Auto-renews June 30, 2026
            </span>
          </div>
          <div className="bg-zinc-950/40 border border-zinc-900 p-3.5 rounded-xl text-left">
            <span className="text-[9px] text-zinc-650 uppercase font-mono block">Payment card</span>
            <span className="block text-xs font-semibold text-white mt-1">
              VISA •••• 4242
            </span>
          </div>
          <div className="bg-zinc-950/40 border border-zinc-900 p-3.5 rounded-xl text-left">
            <span className="text-[9px] text-zinc-650 uppercase font-mono block">History retention Duration</span>
            <span className="block text-xs font-semibold text-zinc-350 mt-1">
              Unlimited ClickHouse Retention
            </span>
          </div>
          <div className="bg-zinc-950/40 border border-zinc-900 p-3.5 rounded-xl text-left">
            <span className="text-[9px] text-zinc-650 uppercase font-mono block">SLA Support response</span>
            <span className="block text-xs font-semibold text-zinc-300 mt-1">
              Priority Escalated (4 Hour SLA)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
