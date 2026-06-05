import React from 'react';

interface SKELETON_PROPS {
  className?: string;
  style?: React.CSSProperties;
}

export function SkeletonPulse({ className = '', style }: SKELETON_PROPS) {
  return (
    <div className={`animate-pulse bg-zinc-800/60 rounded-md ${className}`} style={style} />
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-card p-6 rounded-2xl border border-zinc-800/50 space-y-4">
      <div className="flex justify-between items-center">
        <SkeletonPulse className="h-4 w-28" />
        <SkeletonPulse className="h-8 w-8 rounded-lg" />
      </div>
      <SkeletonPulse className="h-8 w-32" />
      <SkeletonPulse className="h-3 w-40" />
      <div className="pt-2">
        <SkeletonPulse className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SkeletonPulse className="h-6 w-48" />
        <div className="flex space-x-2">
          <SkeletonPulse className="h-9 w-24 rounded-lg" />
          <SkeletonPulse className="h-9 w-32 rounded-lg" />
        </div>
      </div>
      <div className="glass-card rounded-2xl border border-zinc-800/50 overflow-hidden divide-y divide-zinc-800/50">
        <div className="p-4 bg-zinc-900/30">
          <div className="grid grid-cols-4 gap-4">
            <SkeletonPulse className="h-4 w-24" />
            <SkeletonPulse className="h-4 w-32" />
            <SkeletonPulse className="h-4 w-16" />
            <SkeletonPulse className="h-4 w-20" />
          </div>
        </div>
        {[1, 2, 3, 4, 5].map((idx) => (
          <div key={idx} className="p-4">
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="flex items-center space-x-3">
                <SkeletonPulse className="h-9 w-9 rounded-full" />
                <div className="space-y-1">
                  <SkeletonPulse className="h-3 w-28" />
                  <SkeletonPulse className="h-2 w-20" />
                </div>
              </div>
              <SkeletonPulse className="h-3 w-36" />
              <SkeletonPulse className="h-5 w-16 rounded-full" />
              <div className="justify-self-end w-full max-w-[80px]">
                <SkeletonPulse className="h-3 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="glass-card p-6 rounded-2xl border border-zinc-800/50 space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <SkeletonPulse className="h-5 w-40" />
          <SkeletonPulse className="h-3 w-24" />
        </div>
        <div className="flex space-x-2">
          <SkeletonPulse className="h-8 w-16 rounded-lg" />
          <SkeletonPulse className="h-8 w-16 rounded-lg" />
        </div>
      </div>
      <div className="h-72 w-full flex items-end justify-between px-4 pb-2 pt-6">
        {[20, 45, 30, 60, 40, 75, 55, 90, 70, 85, 95, 80].map((height, idx) => (
          <div key={idx} className="w-[6%] flex flex-col items-center space-y-2">
            <SkeletonPulse
              className="w-full rounded-t-md"
              style={{ height: `${height}%` }}
            />
            <SkeletonPulse className="h-3 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonActivity() {
  return (
    <div className="glass-card p-6 rounded-2xl border border-zinc-800/50 space-y-4">
      <SkeletonPulse className="h-5 w-32" />
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex space-x-3">
            <SkeletonPulse className="h-9 w-9 rounded-full" />
            <div className="flex-1 space-y-2 py-1">
              <div className="flex justify-between items-center">
                <SkeletonPulse className="h-3 w-2/3" />
                <SkeletonPulse className="h-2.5 w-12" />
              </div>
              <SkeletonPulse className="h-2.5 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
