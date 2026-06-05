import React from 'react';
import {
  DollarSign,
  Users,
  Percent,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { KPI_CARD_DATA } from '../types';

interface KPI_CARDS_PROPS {
  kpis: KPI_CARD_DATA[];
  onSelectKpi: (id: string) => void;
  selectedKpi: string;
}

export default function KPICards({ kpis, onSelectKpi, selectedKpi }: KPI_CARDS_PROPS) {
  // Map strings to Lucide Icons safely
  const iconMap: { [key: string]: any } = {
    DollarSign,
    Users,
    Percent,
    TrendingDown,
  };

  // Generate minimalist sparkline points safely
  function getSparklinePoints(data: number[], width: number, height: number): string {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    return data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height * 0.8) - height * 0.1;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      {kpis.map((kpi) => {
        const Icon = iconMap[kpi.icon] || DollarSign;
        const isSelected = selectedKpi === kpi.id;
        const isPositive = kpi.change > 0;
        const width = 100;
        const height = 40;
        const points = getSparklinePoints(kpi.sparkline, width, height);
        const strokeColor = isPositive ? '#34d399' : '#f87171'; // emerald or rose hexes
        const fillGradientId = `gradient-${kpi.id}`;

        return (
          <div
            key={kpi.id}
            id={`kpi-card-${kpi.id}`}
            onClick={() => onSelectKpi(kpi.id)}
            className={`glass-card p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer ${
              isSelected
                ? 'ring-2 ring-indigo-500/80 border-indigo-500/40 bg-zinc-900/80 scale-[1.01] shadow-xl shadow-indigo-950/20'
                : 'border-zinc-800/40 hover:border-zinc-700/60 hover:bg-zinc-900/50'
            }`}
          >
            {/* Ambient Background Gradient Spot for Selected Card */}
            {isSelected && (
              <div className="absolute -right-12 -top-12 w-28 h-28 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />
            )}

            {/* Top Row: Title & Action Block */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-zinc-400 font-sans tracking-wide">
                  {kpi.title}
                </p>
              </div>
              <div className={`p-2 rounded-xl border ${
                isSelected
                  ? 'bg-zinc-850 border-indigo-500/20 text-indigo-400'
                  : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-500'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Stat Row */}
            <div className="mt-4">
              <h3 className="text-3xl font-display font-bold text-white tracking-tight leading-none">
                {kpi.value}
              </h3>

              {/* Sparkline & Trend indicators */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-1.5 font-mono">
                  <span className={`text-xs font-semibold flex items-center ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {isPositive ? (
                      <ArrowUpRight className="w-3.5 h-3.5 mr-0.5 shrink-0" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5 mr-0.5 shrink-0" />
                    )}
                    {isPositive ? '+' : ''}
                    {kpi.change}%
                  </span>
                  <span className="text-[10px] text-zinc-500">MoM</span>
                </div>

                {/* Minimalist Vector SVG Sparkline (No Heavy Library overhead for sparkline widgets) */}
                <div className="w-[100px] h-[36px] overflow-hidden opacity-90">
                  <svg width={width} height={height} className="overflow-visible">
                    <defs>
                      <linearGradient id={fillGradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Shaded Area */}
                    <path
                      d={`M 0,${height} L ${points} L ${width},${height} Z`}
                      fill={`url(#${fillGradientId})`}
                      stroke="none"
                    />
                    {/* Sparkline stroke */}
                    <polyline
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={points}
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Subtext description footer */}
            <div className="mt-4 pt-3.5 border-t border-zinc-800/40 flex items-center justify-between text-[11px] text-zinc-500">
              <span className="truncate">{kpi.subtext}</span>
              <span className="text-[9px] font-mono tracking-wider opacity-60">STABLE</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
