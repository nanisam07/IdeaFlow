import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ANALYTICS_TRENDS } from '../data';
import {
  TrendingUp,
  Percent,
  Compass,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';

export default function AnalyticsPage() {
  const trafficData = [
    { name: 'Organic Search', value: 43200, color: '#6366f1' },
    { name: 'Direct Traffic', value: 24700, color: '#ec4899' },
    { name: 'Referral Webhooks', value: 18500, color: '#10b981' },
    { name: 'Email Campaigns', value: 12300, color: '#f59e0b' },
    { name: 'Social Ingestion', value: 8900, color: '#06b6d4' },
  ];

  const retentionCohorts = [
    { cohort: 'Jan Cohort', size: '1,200', m0: '100%', m1: '82%', m2: '74%', m3: '68%', m4: '62%', m5: '58%' },
    { cohort: 'Feb Cohort', size: '1,450', m0: '100%', m1: '85%', m2: '78%', m3: '71%', m4: '65%', m5: '59%' },
    { cohort: 'Mar Cohort', size: '1,800', m0: '100%', m1: '81%', m2: '72%', m3: '67%', m4: '60%', m5: '' },
    { cohort: 'Apr Cohort', size: '1,950', m0: '100%', m1: '86%', m2: '80%', m3: '73%', m4: '', m5: '' },
    { cohort: 'May Cohort', size: '2,300', m0: '100%', m1: '88%', m2: '82%', m3: '', m4: '', m5: '' },
  ];

  return (
    <div className="space-y-6">
      {/* Top row split widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Retention Cohort Heatmap Tracker (Standard Silicon valley widget) */}
        <div className="glass-card p-6 rounded-2xl border border-zinc-800/40 lg:col-span-2 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-emerald-400" />
                Active Account Cohort Retention (%)
              </h3>
              <span className="hidden sm:inline text-[10px] font-mono tracking-wider text-zinc-550 border border-zinc-900 bg-zinc-950 px-2 py-0.5 rounded-md uppercase">
                COHORT LIFECYCLE
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Percentage of monthly accounts that remain active over subsequent 5-month operational periods.
            </p>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-zinc-850 text-zinc-500">
                  <th className="pb-3.5 pl-2 font-mono uppercase text-[10px]">Cohort Group</th>
                  <th className="pb-3.5 font-mono uppercase text-[10px]">Users</th>
                  <th className="pb-3.5 text-center font-mono uppercase text-[10px]">Month 0</th>
                  <th className="pb-3.5 text-center font-mono uppercase text-[10px]">Month 1</th>
                  <th className="pb-3.5 text-center font-mono uppercase text-[10px]">Month 2</th>
                  <th className="pb-3.5 text-center font-mono uppercase text-[10px]">Month 3</th>
                  <th className="pb-3.5 text-center font-mono uppercase text-[10px]">Month 4</th>
                  <th className="pb-3.5 text-center font-mono uppercase text-[10px]">Month 5</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {retentionCohorts.map((row) => (
                  <tr key={row.cohort} className="hover:bg-zinc-90 w/10">
                    <td className="py-3.5 pl-2 font-semibold text-zinc-200">{row.cohort}</td>
                    <td className="py-3.5 font-mono text-zinc-450">{row.size}</td>
                    
                    {/* Intensified heat colors matching premium design */}
                    <td className="py-2.5 text-center px-1">
                      <div className="py-1 rounded bg-indigo-500/30 border border-indigo-500/20 text-indigo-200 font-semibold text-[11px] font-mono">
                        {row.m0}
                      </div>
                    </td>
                    <td className="py-2.5 text-center px-1">
                      <div className="py-1 rounded bg-indigo-600/20 border border-indigo-500/10 text-indigo-300 font-mono text-[11px]">
                        {row.m1}
                      </div>
                    </td>
                    <td className="py-2.5 text-center px-1">
                      <div className="py-1 rounded bg-indigo-700/15 border border-indigo-700/10 text-indigo-400 font-mono text-[11px]">
                        {row.m2}
                      </div>
                    </td>
                    <td className="py-2.5 text-center px-1">
                      <div className="py-1 rounded bg-purple-900/15 border border-purple-900/10 text-purple-400 font-mono text-[11px]">
                        {row.m3}
                      </div>
                    </td>
                    <td className="py-2.5 text-center px-1">
                      {row.m4 ? (
                        <div className="py-1 rounded bg-purple-950/15 border border-zinc-800 text-zinc-400 font-mono text-[11px]">
                          {row.m4}
                        </div>
                      ) : (
                        <span className="text-zinc-700 font-mono">-</span>
                      )}
                    </td>
                    <td className="py-2.5 text-center px-1">
                      {row.m5 ? (
                        <div className="py-1 rounded bg-zinc-900 border border-zinc-850 text-zinc-550 font-mono text-[11px]">
                          {row.m5}
                        </div>
                      ) : (
                        <span className="text-zinc-700 font-mono">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-850 flex justify-between text-[11px] text-zinc-550 font-mono">
            <span>MODEL: CHURN-RATE DETECTOR ACTIVATED</span>
            <span>UPDATED LIVE (5M SLA)</span>
          </div>
        </div>

        {/* Traffic Sources visual Pie chart (Vercel style metrics) */}
        <div className="glass-card p-6 rounded-2xl border border-zinc-800/40 relative overflow-hidden flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-purple-400" />
              Traffic Acquisition Channels
            </h3>
            <p className="text-xs text-zinc-550 mt-0.5">
              Distribution of incoming ledger requests by source channel.
            </p>
          </div>

          {/* Recharts Pie Chart representation */}
          <div className="h-44 w-full my-4 relative flex items-center justify-center select-none">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }: any) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-zinc-950/90 border border-zinc-800 p-2 rounded-lg text-xs font-medium text-white shadow-xl">
                          {payload[0].name}: {payload[0].value.toLocaleString()} pts
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Absolute Centered text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
              <span className="text-xs font-mono font-bold text-zinc-500 uppercase">Total Hits</span>
              <span className="text-base font-extrabold text-white">108.2k</span>
            </div>
          </div>

          <div className="space-y-1.5 h-32 overflow-y-auto pr-1">
            {trafficData.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-zinc-300 font-medium">{item.name}</span>
                </div>
                <div className="flex space-x-3 text-right font-mono text-[11px]">
                  <span className="text-white">{item.value.toLocaleString()}</span>
                  <span className="text-zinc-550">
                    {((item.value / 108000) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Conversion trajectory chart */}
        <div className="glass-card p-6 rounded-2xl border border-zinc-800/40 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">Conversion Frequency trajectory</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Average checkout success path metrics.</p>
          </div>
          <div className="h-56 mt-4 select-none">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ANALYTICS_TRENDS} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" opacity={0.3} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} fontFamily="JetBrains Mono" />
                <YAxis stroke="#52525b" fontSize={10} fontFamily="JetBrains Mono" />
                <Tooltip
                  content={({ active, payload }: any) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-zinc-950/90 border border-zinc-800 p-2.5 rounded-lg text-xs shadow-xl">
                          <span className="block text-zinc-500 font-mono text-[9px] mb-1">{payload[0].payload.name}</span>
                          <span className="text-pink-400 font-bold">{payload[0].value}% Conversion</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line type="monotone" dataKey="conversion" stroke="#ec4899" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expenses vs Profit split */}
        <div className="glass-card p-6 rounded-2xl border border-zinc-800/40 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">Operating Expenses vs Net Profits</h3>
            <p className="text-xs text-zinc-500 mt-0.5 font-sans">Corporate metrics breakdown.</p>
          </div>
          <div className="h-56 mt-4 select-none">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ANALYTICS_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" opacity={0.3} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} fontFamily="JetBrains Mono" />
                <YAxis stroke="#52525b" fontSize={10} fontFamily="JetBrains Mono" tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  content={({ active, payload }: any) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-zinc-950/90 border border-zinc-800 p-2.5 rounded-lg text-xs shadow-xl space-y-1">
                          <span className="block text-zinc-500 font-mono text-[9px]">{payload[0].payload.name}</span>
                          <span className="text-zinc-400 block">Expenses: ${payload[0].payload.expenses.toLocaleString()}</span>
                          <span className="text-emerald-400 font-bold block">Profit: ${payload[0].payload.profit.toLocaleString()}</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="expenses" fill="#52525b" opacity={0.5} radius={[2, 2, 0, 0]} />
                <Bar dataKey="profit" fill="#10b981" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
