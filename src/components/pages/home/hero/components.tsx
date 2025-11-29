'use client';

import { motion, Variants } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Monitor,
  Smartphone,
  LayoutGrid,
  Users,
  Box,
  BarChart3,
  Zap,
  ChevronDown,
  Search,
  Home,
  Menu
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { cn } from '@/utils/functions/tw-merge';
import useIsMobile from '@/utils/hooks/use-mobile';

// --- View Toggle (Simplificado - Sem Easter Egg) ---
export const ViewToggle = ({
  currentMode,
  setMode,
  labels,
}: {
  currentMode: string;
  setMode: (m: 'desktop' | 'mobile') => void;
  labels: { desktop: string; mobile: string };
}) => {
  return (
    <div className="bg-background/80 flex items-center gap-1 rounded-full border border-white/10 p-1.5 shadow-2xl shadow-primary/10 ring-1 ring-white/5 backdrop-blur-xl">
      <button
        onClick={() => setMode('desktop')}
        className={cn(
          'relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300',
          currentMode === 'desktop'
            ? 'text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {currentMode === 'desktop' && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 rounded-full border border-white/5 bg-white/10"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <Monitor size={14} className="relative z-10" />
        <span className="relative z-10">{labels.desktop}</span>
      </button>

      <div className="mx-1 h-4 w-px bg-white/10" />

      <button
        onClick={() => setMode('mobile')}
        className={cn(
          'relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300',
          currentMode === 'mobile'
            ? 'text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {currentMode === 'mobile' && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 rounded-full border border-white/5 bg-white/10"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <Smartphone size={14} className="relative z-10" />
        <span className="relative z-10">{labels.mobile}</span>
      </button>
    </div>
  );
};

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
  <div className="bg-card/90 flex h-full w-full items-center justify-around rounded-2xl border border-white/10 px-2 pb-1 backdrop-blur-xl">
    {[Home, BarChart3, Box, Users, Menu].map((Icon, i) => (
      <div
        key={i}
        className={`rounded-full p-3 ${
          i === 0 ? 'text-primary' : 'text-slate-500'
        }`}
      >
        <Icon size={24} />
      </div>
    ))}
  </div>
);

// --- Header Responsivo ---
export const ResponsiveHeader = ({ isMobile }: { isMobile: boolean }) => (
  <div
    className={cn(
      'bg-card/80 flex h-full w-full items-center justify-between border-b border-white/5 px-4 backdrop-blur-xl md:px-6',
      isMobile ? 'rounded-t-3xl pt-2' : 'rounded-tr-lg'
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
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-gradient-to-tr from-slate-700 to-slate-800 text-xs font-bold text-white">
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
  <div className="bg-card/60 relative flex h-full w-full flex-col rounded-lg border border-white/5 p-4 backdrop-blur-md md:p-6">
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

// --- Floating Symbol (Independent Animation) ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FloatingSymbol = ({ item }: { item: any }) => {
  return (
    <motion.div
      style={{ top: item.top, left: item.left }}
      className={`absolute z-0 select-none font-mono font-bold ${item.size} ${item.color} pointer-events-none opacity-20`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4 + item.depth, // Variação baseada na profundidade para não ficarem sincronizados
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {item.char}
    </motion.div>
  );
};

// --- Assembling Item (Viewport Triggered) ---
export const AssemblingItem = ({
  children,
  offset,
  delay = 0
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  offset: any;
  delay?: number;
}) => {
  const isMobile = useIsMobile();

  // Definição das Variantes para animação de entrada
  const variants: Variants = {
    hidden: { 
      // Se mobile, apenas um leve slide up e fade. Se desktop, usa o offset completo (explosão)
      x: isMobile ? 0 : offset.x, 
      y: isMobile ? 20 : offset.y, 
      rotate: isMobile ? 0 : offset.r, 
      scale: isMobile ? 0.95 : offset.s, 
      opacity: 0 
    },
    visible: { 
      x: 0, 
      y: 0, 
      rotate: 0, 
      scale: 1, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: delay * 0.1 // Stagger effect
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      className="relative z-20 h-full w-full"
    >
      {children}
    </motion.div>
  );
};