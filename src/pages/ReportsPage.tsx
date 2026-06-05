import React, { useState } from 'react';
import {
  FileText,
  Terminal,
  Database,
  ArrowRight,
  Download,
  Calendar,
  Layers,
  ChevronDown,
  Clock,
  Settings,
} from 'lucide-react';

interface QUERY_ENTRY {
  id: string;
  metric: string;
  interval: string;
  hub: string;
  timestamp: string;
  rowsMatched: number;
  status: 'COMPLETED' | 'EMPTY' | 'FAILED';
}

export default function ReportsPage() {
  const [metric, setMetric] = useState('MRR & Active Subscriptions');
  const [interval, setInterval] = useState('Daily Time Interval');
  const [hub, setHub] = useState('Acme Corp Hub (Production)');
  
  const [queries, setQueries] = useState<QUERY_ENTRY[]>([
    { id: 'qry-101', metric: 'Annual Recurring Profit Index', interval: 'Monthly Trend', hub: 'Vortex Labs (Staging)', timestamp: 'Just now', rowsMatched: 12, status: 'COMPLETED' },
    { id: 'qry-102', metric: 'ClickHouse Ingestion Webhook rate', interval: 'Real-time Telemetry (1h)', hub: 'Acme Corp (Production)', timestamp: '15m ago', rowsMatched: 8400, status: 'COMPLETED' },
    { id: 'qry-103', metric: 'SAML SAML Directory Verification Error List', interval: 'Active Audit Log', hub: 'Acme Corp (Production)', timestamp: '1h ago', rowsMatched: 0, status: 'EMPTY' },
    { id: 'qry-104', metric: 'Historical Churn rate prediction matrix', interval: 'Quarterly Trajectory', hub: 'Acme Corp (Dev-Tunnel)', timestamp: '1d ago', rowsMatched: 4, status: 'COMPLETED' },
  ]);

  const [isDeploying, setIsDeploying] = useState(false);

  // Submit standard telemetry query
  const handleCompileQuery = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);

    setTimeout(() => {
      const newQ: QUERY_ENTRY = {
        id: `qry-${Math.floor(Math.random() * 800) + 200}`,
        metric,
        interval,
        hub,
        timestamp: 'Just now',
        rowsMatched: Math.floor(Math.random() * 450) + 5,
        status: 'COMPLETED',
      };
      setQueries([newQ, ...queries]);
      setIsDeploying(false);
    }, 1100);
  };

  return (
    <div className="space-y-6">
      {/* Dynamic analytics reports selector box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Metric builder form */}
        <div className="glass-card p-6 rounded-3xl border border-zinc-805/40 relative overflow-hidden flex flex-col justify-between h-full col-span-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

          <div>
            <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-1.5">
              <Database className="w-4 h-4 text-indigo-400" />
              Sovereign Report Architect
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Formulate SQL analytical queries on ClickHouse database nodes.
            </p>
          </div>

          <form onSubmit={handleCompileQuery} className="space-y-4 mt-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono tracking-wider text-zinc-550 uppercase">
                Select KPI Field
              </label>
              <select
                value={metric}
                onChange={(e) => setMetric(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-xs text-zinc-200 outline-none transition"
              >
                <option>MRR & Active Subscriptions</option>
                <option>Active Accounts & Ingestion</option>
                <option>Conversion Path & Cohorts</option>
                <option>Annual Recurring Profit Index</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono tracking-wider text-zinc-550 uppercase">
                Telemetry interval
              </label>
              <select
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-805 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-xs text-zinc-200 outline-none transition"
              >
                <option>Real-time Telemetry (1h)</option>
                <option>Daily Time Interval</option>
                <option>Monthly Trend</option>
                <option>Quarterly Trajectory</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono tracking-wider text-zinc-550 uppercase">
                Database Target Hub
              </label>
              <select
                value={hub}
                onChange={(e) => setHub(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-805 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-xs text-zinc-200 outline-none transition"
              >
                <option>Acme Corp Hub (Production)</option>
                <option>Vortex Labs (Staging)</option>
                <option>Acme Corp (Dev-Tunnel)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isDeploying}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 rounded-xl cursor-pointer text-xs transition duration-200 mt-2 flex items-center justify-center space-x-1.5 shadow-lg shadow-purple-950/20"
            >
              {isDeploying ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Compiling ClickHouse logs...</span>
                </>
              ) : (
                <>
                  <span>Deploy Query Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="text-[9px] text-zinc-600 font-mono mt-6 text-center">
            ROUTING VIA PRIVATE PORT 3000
          </div>
        </div>

        {/* Database query console log right */}
        <div className="glass-card p-6 rounded-3xl border border-zinc-800/40 relative overflow-hidden flex flex-col justify-between h-full lg:col-span-2">
          {/* Section banner */}
          <div>
            <div className="flex justify-between items-center select-none">
              <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Query ledger history console
              </h3>
              <span className="text-[9px] font-mono tracking-wider font-bold bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-500 uppercase">
                CLICKHOUSE-CLIENT
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Review current and previous transactional telemetry queries executed on production clusters.
            </p>
          </div>

          {/* Queries feed list */}
          <div className="space-y-3.5 mt-6 h-80 overflow-y-auto pr-1">
            {queries.map((q) => {
              const themeColor =
                q.status === 'COMPLETED'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : q.status === 'EMPTY'
                  ? 'bg-amber-500/10 border-amber-500/25 text-amber-400'
                  : 'bg-rose-500/10 border-rose-500/25 text-rose-455';

              return (
                <div
                  key={q.id}
                  className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-900 hover:border-zinc-800 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none"
                >
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] text-zinc-500 bg-zinc-900 border border-zinc-900 px-1.5 py-0.5 rounded">
                        {q.id}
                      </span>
                      <span className="text-xs font-semibold text-zinc-205 truncate">
                        {q.metric}
                      </span>
                    </div>

                    <p className="text-[10px] text-zinc-550 mt-1.5 font-mono">
                      HUB: {q.hub} • INTERVAL: {q.interval} • AGENT EXECUTED
                    </p>
                  </div>

                  {/* Actions & status block constraint */}
                  <div className="flex items-center space-x-4 shrink-0 font-mono w-full sm:w-auto justify-between sm:justify-end border-t border-zinc-900 sm:border-0 pt-2 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <span className="text-[10pt] text-zinc-500 block">MATCHES</span>
                      <span className="text-xs font-bold text-white block">
                        {q.rowsMatched.toLocaleString()} entries
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider ${themeColor}`}>
                      {q.status}
                    </span>

                    {/* Standard csv simulator download trigger node */}
                    <button
                      onClick={() => alert(`Beginning download stream for report node ${q.id} ...`)}
                      className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 hover:text-white text-zinc-500 transition cursor-pointer"
                      title="Download entries in CSV form"
                      disabled={q.status !== 'COMPLETED'}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3.5 border-t border-zinc-900/40 flex justify-between items-center text-[11px] text-zinc-555 font-mono">
            <span>SECURED BY IDEA2SITE CORE</span>
            <span className="text-indigo-400 hover:underline cursor-pointer">
              Flush clickhouse buffer memory
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
