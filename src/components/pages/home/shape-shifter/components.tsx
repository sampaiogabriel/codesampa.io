'use client';

import {
  Activity,
  ArrowUpRight,
  LayoutGrid,
  Users,
  Box,
  BarChart3,
  Zap,
  ChevronDown,
  Search,
  Home,
  Menu} from 'lucide-react';

import { cn } from '@/utils/functions/tw-merge';



// --- Sidebar Desktop ---
export const DesktopSidebar = () => (
  <div className="bg-card/80 relative flex h-full w-full flex-col justify-between overflow-hidden rounded-l-lg border-r border-white/5 p-4 text-slate-400 backdrop-blur-xl">
    <div className="relative z-10">
      <div className="group mb-8 flex cursor-pointer items-center justify-between rounded-lg border border-transparent p-2 transition-colors hover:border-white/5 hover:bg-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-primary text-xs font-bold text-white shadow-[0_0_15px_rgba(0,71,255,0.5)]">
            CS
          </div>
          <div>
            <div className="text-sm font-semibold leading-none text-white">
              CodeSampa
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Pro Workspace</div>
          </div>
        </div>
        <ChevronDown size={14} />
      </div>
      <div className="space-y-1">
        {[
          { icon: LayoutGrid, label: 'Dashboard', active: true },
          { icon: Users, label: 'Clients', active: false },
          { icon: Box, label: 'Products', active: false },
          { icon: BarChart3, label: 'Analytics', active: false }
        ].map((item, i) => (
          <div
            key={i}
            className={`flex cursor-pointer items-center gap-3 rounded-md border border-transparent px-3 py-2 transition-all ${
              item.active
                ? 'bg-white/5 text-primary border-white/5 shadow-inner'
                : 'hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            <item.icon size={18} />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="relative z-10 rounded-xl border border-white/10 bg-gradient-to-br from-violet-900/50 to-blue-900/50 p-4">
      <Zap size={16} className="mb-2 text-blue-400" />
      <h4 className="mb-1 text-xs font-bold text-white">Pro Plan</h4>
      <button className="mt-2 w-full rounded border border-white/5 bg-white/10 py-1.5 text-[10px] font-bold text-white transition-colors hover:bg-white/20">
        Upgrade
      </button>
    </div>
  </div>
);

// --- Mobile Navigation ---
export const MobileBottomNav = () => (
  <div className="bg-card/90 flex h-full w-full items-center justify-around rounded-xl border border-white/10 px-2 backdrop-blur-xl">
    {[Home, BarChart3, Box, Users, Menu].map((Icon, i) => (
      <div
        key={i}
        className={`rounded-full p-3 transition-colors ${
          i === 0 ? 'text-primary bg-white/5' : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        <Icon size={20} />
      </div>
    ))}
  </div>
);

// --- Header Responsivo ---
export const ResponsiveHeader = ({ isMobile }: { isMobile: boolean }) => (
  <div
    className={cn(
      'bg-card/80 flex h-full w-full items-center justify-between px-4 backdrop-blur-xl md:px-6 border-white/5',
      // No mobile: borda completa e rounded-xl. No desktop: borda apenas embaixo e canto arredondado
      isMobile ? 'rounded-xl border' : 'rounded-tr-lg border-b'
    )}
  >
    <div className="flex flex-col">
      {!isMobile && (
        <div className="mb-0.5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wide text-slate-500">
          <span>App</span>
          <span className="text-slate-700">/</span>
          <span className="text-primary">Overview</span>
        </div>
      )}
      <h2 className="text-lg font-bold leading-tight text-white">Dashboard</h2>
    </div>
    <div className="flex items-center gap-4">
      {!isMobile && (
        <div className="flex w-48 items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-slate-400">
          <Search size={14} />
          <span className="text-xs">Search...</span>
        </div>
      )}
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-gradient-to-tr from-slate-700 to-slate-800 text-xs font-bold text-white shadow-inner">
        GS
      </div>
    </div>
  </div>
);

// --- Metric Cards ---
export const DarkMetricCard = ({
  title,
  value,
  trend,
  color,
  isMobile
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => (
  <div
    className={cn(
      'bg-card/60 group relative flex h-full w-full flex-col justify-between overflow-hidden border border-white/5 backdrop-blur-md',
      isMobile ? 'rounded-xl p-4' : 'rounded-lg p-5'
    )}
  >
    <div className="z-10 flex items-start justify-between">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {title}
        </p>
        <h3
          className={cn(
            'mt-1 font-bold text-white',
            isMobile ? 'text-xl' : 'text-2xl'
          )}
        >
          {value}
        </h3>
      </div>
      <div
        className={`rounded-lg bg-white/5 p-1.5 text-white shadow-[0_0_15px_-5px_currentColor] md:p-2 ${color}`}
      >
        <Activity size={16} />
      </div>
    </div>
    <div className="z-10 mt-2 flex items-center gap-2">
      <span className="flex items-center rounded border border-emerald-400/20 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
        <ArrowUpRight size={10} className="mr-1" /> {trend}
      </span>
    </div>
  </div>
);

// --- Chart Component ---
export const DarkChart = () => (
  <div className="bg-card/60 relative flex h-full w-full flex-col rounded-xl border border-white/5 p-4 backdrop-blur-md md:p-6">
    <div className="z-10 mb-4 flex items-center justify-between md:mb-6">
      <h3 className="text-sm font-bold text-white">Revenue</h3>
      <div className="flex gap-1 md:gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1 w-1 rounded-full bg-slate-700 md:h-1.5 md:w-1.5"
          />
        ))}
      </div>
    </div>
    <div className="z-10 flex flex-1 items-end gap-2 md:gap-3">
      {[40, 65, 50, 85, 60, 75, 55, 90, 70, 95, 65, 80].map((h, i) => (
        <div key={i} className="group flex h-full flex-1 items-end">
          <div
            style={{ height: `${h}%` }}
            className={`w-full rounded-sm transition-all duration-500 ${
              i === 9
                ? 'bg-primary shadow-[0_0_20px_rgba(0,71,255,0.4)]'
                : 'bg-slate-800 group-hover:bg-slate-700'
            }`}
          />
        </div>
      ))}
    </div>
  </div>
);