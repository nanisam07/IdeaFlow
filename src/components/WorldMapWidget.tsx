import React, { useState } from 'react';
import { REGIONAL_ANALYTICS } from '../data';
import { Globe, User, Percent, Activity } from 'lucide-react';

export default function WorldMapWidget() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // Simplified visual mercator SVG coordinates of key economic centers
  // Coordinates are percentage values [x, y] of a 400x200 canvas
  const mapPoints = REGIONAL_ANALYTICS;

  return (
    <div className="glass-card p-6 rounded-2xl border border-zinc-800/45 relative overflow-hidden flex flex-col justify-between h-full">
      {/* Glow Ambient Spot */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div>
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-purple-400" />
          <h3 className="text-base font-semibold text-white tracking-tight">
            Global Traffic Analytics
          </h3>
        </div>
        <p className="text-xs text-zinc-500 mt-0.5">
          Real-time geographical distribution of monthly active accounts.
        </p>
      </div>

      {/* Vector Canvas World Map */}
      <div className="relative w-full h-44 my-4 bg-zinc-900/20 border border-zinc-800/40 rounded-xl overflow-hidden flex items-center justify-center select-none">
        {/* Decorative Grid Mesh */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Dynamic Highlight overlay */}
        {hoveredCountry && (
          <div className="absolute top-2 left-3 px-2 py-1 bg-zinc-950/90 border border-zinc-800 rounded-lg text-[10px] font-mono tracking-wider text-purple-400 shadow-xl animate-in fade-in duration-200">
            LOCATING NODE: {hoveredCountry.toUpperCase()}
          </div>
        )}

        {/* Custom SVG World Dot Map Illustration (Minimalist, elegant) */}
        <svg viewBox="0 0 400 200" className="w-full h-full relative z-10 opacity-75">
          {/* Decorative equator line */}
          <line x1="0" y1="100" x2="400" y2="100" stroke="#27272a" strokeWidth="0.5" strokeDasharray="4 4" />
          
          {/* Decorative longitudinal mesh segments */}
          <ellipse cx="200" cy="100" rx="190" ry="90" fill="none" stroke="#27272a" strokeWidth="0.5" strokeDasharray="3 3" />
          <ellipse cx="200" cy="100" rx="120" ry="90" fill="none" stroke="#27272a" strokeWidth="0.5" strokeDasharray="5 5" />
          <ellipse cx="200" cy="100" rx="60" ry="90" fill="none" stroke="#27272a" strokeWidth="0.5" strokeDasharray="6 6" />

          {/* Plotted Connections - Line connectors looping back to a central node like Vercel metrics */}
          {mapPoints.map((pt, idx) => {
            if (pt.countryCode === 'US') return null; // Connect everything else to US hub
            const usPt = mapPoints.find((p) => p.countryCode === 'US') || { coords: [30, 48] };
            const startX = (pt.coords[0] / 100) * 400;
            const startY = (pt.coords[1] / 100) * 200;
            const endX = (usPt.coords[0] / 100) * 400;
            const endY = (usPt.coords[1] / 100) * 200;
            // Midpoint control for an arc
            const midX = (startX + endX) / 2;
            const midY = Math.min(startY, endY) - 25;

            return (
              <path
                key={`line-${idx}`}
                d={`M ${startX},${startY} Q ${midX},${midY} ${endX},${endY}`}
                fill="none"
                stroke="url(#arcGradient)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                className="opacity-45"
              />
            );
          })}

          <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Interactive Plot Nodes */}
          {mapPoints.map((pt, idx) => {
            const cx = (pt.coords[0] / 100) * 400;
            const cy = (pt.coords[1] / 100) * 200;
            const isHovered = hoveredCountry === pt.countryName;

            return (
              <g
                key={pt.countryCode}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredCountry(pt.countryName)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                {/* Active Pulse Animation rings */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 12 : 7}
                  fill={pt.countryCode === 'US' ? '#818cf8' : '#ec4899'}
                  className="animate-ping opacity-25 origin-center"
                  style={{ animationDuration: pt.countryCode === 'US' ? '2.5s' : '3.5s' }}
                />
                
                {/* Highlight Hover Base Inner circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : 3.5}
                  fill={pt.countryCode === 'US' ? '#4f46e5' : '#db2777'}
                  stroke="#ffffff"
                  strokeWidth={isHovered ? 2 : 1}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Structured metrics breakdown scroll box */}
      <div className="space-y-2 mt-2 h-44 overflow-y-auto pr-1">
        {mapPoints.map((country) => {
          const isHovered = hoveredCountry === country.countryName;
          return (
            <div
              key={country.countryCode}
              onMouseEnter={() => setHoveredCountry(country.countryName)}
              onMouseLeave={() => setHoveredCountry(null)}
              className={`flex items-center justify-between p-2 rounded-xl border transition-all duration-200 ${
                isHovered
                  ? 'bg-zinc-800/80 border-indigo-500/30'
                  : 'bg-zinc-900/30 border-transparent hover:bg-zinc-900/60'
              }`}
            >
              {/* Flag / Details Left */}
              <div className="flex items-center space-x-2.5 min-w-0">
                {/* Mock Country Code Roundel */}
                <div className="w-6 h-6 rounded bg-zinc-805 border border-zinc-800 flex items-center justify-center font-mono font-bold text-[9px] text-zinc-400 select-none uppercase">
                  {country.countryCode}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-white block truncate">
                    {country.countryName}
                  </span>
                  <span className="text-[10px] text-zinc-500 block truncate font-mono">
                    {country.users.toLocaleString()} accounts
                  </span>
                </div>
              </div>

              {/* Share & Income Right */}
              <div className="text-right shrink-0">
                <span className="text-xs font-semibold text-white block">
                  ${(country.revenue / 1000).toFixed(1)}k
                </span>
                {/* Horizontal Progress Ratio block */}
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
                      style={{ width: `${country.percentage}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-mono font-medium text-zinc-500">
                    {country.percentage}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
