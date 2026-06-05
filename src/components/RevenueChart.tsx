import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ANALYTICS_TRENDS } from '../data';
import { TrendingUp, Award, Activity, DollarSign } from 'lucide-react';

interface REVENUE_CHART_PROPS {
  selectedKpi: string;
}

export default function RevenueChart({ selectedKpi }: REVENUE_CHART_PROPS) {
  const [chartType, setChartType] = useState<'area' | 'bar' | 'line'>('area');
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'profit' | 'users' | 'conversion'>('revenue');

  // Sync active metric with KPI selection if applicable
  React.useEffect(() => {
    if (selectedKpi === 'kpi-mrr') setActiveMetric('revenue');
    if (selectedKpi === 'kpi-users') setActiveMetric('users');
    if (selectedKpi === 'kpi-conversion') setActiveMetric('conversion');
    if (selectedKpi === 'kpi-churn') setActiveMetric('profit');
  }, [selectedKpi]);

  const metricsConfig = {
    revenue: {
      label: 'Monthly Revenue',
      color: '#6366f1', // Indigo
      secondaryColor: '#4f46e5',
      gradientId: 'revGrad',
      formatter: (v: number) => `$${v.toLocaleString()}`,
    },
    profit: {
      label: 'Net Profits',
      color: '#10b981', // Emerald
      secondaryColor: '#059669',
      gradientId: 'profGrad',
      formatter: (v: number) => `$${v.toLocaleString()}`,
    },
    users: {
      label: 'Active Accounts',
      color: '#06b6d4', // Cyan
      secondaryColor: '#0891b2',
      gradientId: 'userGrad',
      formatter: (v: number) => `${v.toLocaleString()} users`,
    },
    conversion: {
      label: 'Conversion Rate',
      color: '#ec4899', // Pink
      secondaryColor: '#db2777',
      gradientId: 'convGrad',
      formatter: (v: number) => `${v.toFixed(2)}%`,
    },
  };

  const activeConfig = metricsConfig[activeMetric];

  // Custom tooltips with full Glassmorphic styles
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950/90 border border-zinc-800/80 p-4 rounded-xl shadow-2xl backdrop-blur-md font-sans">
          <p className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">{label} 2026</p>
          <div className="mt-1.5 flex items-center space-x-2.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: activeConfig.color }}
            />
            <span className="text-sm font-semibold text-white">
              {activeConfig.formatter(payload[0].value)}
            </span>
          </div>
          {payload[1] && (
            <div className="mt-1 flex items-center space-x-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-650" />
              <span className="text-xs text-zinc-400">
                Secondary: {payload[1].name}: {payload[1].value}
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-zinc-805/40 relative overflow-hidden flex flex-col justify-between">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Controller Ribbon */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            <h3 className="text-base font-semibold text-white tracking-tight">
              Interactive Financial Analytics
            </h3>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Real-time trajectory visualization for key performance metrics.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2">
          {/* Active Metric selectors */}
          <div className="flex bg-zinc-900/60 border border-zinc-800 p-0.5 rounded-xl">
            {(Object.keys(metricsConfig) as Array<keyof typeof metricsConfig>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveMetric(key)}
                className={`px-3 py-1 text-[11px] font-medium rounded-lg transition-colors cursor-pointer capitalize ${
                  activeMetric === key
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Chart Type toggles */}
          <div className="flex bg-zinc-900/60 border border-zinc-800 p-0.5 rounded-xl">
            {(['area', 'bar', 'line'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-2.5 py-1 text-[10px] font-mono rounded-lg transition-colors cursor-pointer uppercase ${
                  chartType === type
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Core Chart Section */}
      <div className="h-80 w-full mt-6 select-none">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={ANALYTICS_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id={activeConfig.gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeConfig.color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={activeConfig.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
              <XAxis
                dataKey="name"
                stroke="#71717a"
                fontSize={10}
                fontFamily="JetBrains Mono"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#71717a"
                fontSize={10}
                fontFamily="JetBrains Mono"
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) =>
                  activeMetric === 'conversion' ? `${val}%` : `$${(val / 1000).toFixed(0)}k`
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={activeMetric}
                name={activeConfig.label}
                stroke={activeConfig.color}
                strokeWidth={2.5}
                fillOpacity={1}
                fill={`url(#${activeConfig.gradientId})`}
              />
            </AreaChart>
          ) : chartType === 'bar' ? (
            <BarChart data={ANALYTICS_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
              <XAxis
                dataKey="name"
                stroke="#71717a"
                fontSize={10}
                fontFamily="JetBrains Mono"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#71717a"
                fontSize={10}
                fontFamily="JetBrains Mono"
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) =>
                  activeMetric === 'conversion' ? `${val}%` : `$${(val / 1000).toFixed(0)}k`
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey={activeMetric}
                fill={activeConfig.color}
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          ) : (
            <LineChart data={ANALYTICS_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
              <XAxis
                dataKey="name"
                stroke="#71717a"
                fontSize={10}
                fontFamily="JetBrains Mono"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#71717a"
                fontSize={10}
                fontFamily="JetBrains Mono"
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) =>
                  activeMetric === 'conversion' ? `${val}%` : `$${(val / 1000).toFixed(0)}k`
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={activeMetric}
                stroke={activeConfig.color}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 1.5, fill: '#09090b', stroke: activeConfig.color }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Summary Footer */}
      <div className="mt-4 pt-4 border-t border-zinc-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-zinc-400">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            Annual average trajectory is accelerating at <strong className="text-white">+18.4%</strong> index value
          </span>
        </div>
        <div className="flex space-x-4 font-mono text-[10px] text-zinc-500">
          <span>SAMPLE INTERVAL: MONTHLY (UTC)</span>
          <span>SOURCE: IDEAFLOW AGENT</span>
        </div>
      </div>
    </div>
  );
}
