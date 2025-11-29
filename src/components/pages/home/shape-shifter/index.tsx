'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Signal, Wifi, BatteryMedium } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

import { cn } from '@/utils/functions/tw-merge';
import useIsMobile from '@/utils/hooks/use-mobile';

import {
  ViewToggle,
  DesktopSidebar,
  ResponsiveHeader,
  DarkMetricCard,
  DarkChart,
  MobileBottomNav,
  AssemblingItem
} from '../hero/components';

export function ShapeShifterSection() {
  const t = useTranslations('Pages.Home.Hero');
  const tStats = useTranslations('Pages.Home.Stats');
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Força o modo mobile se estiver em um dispositivo móvel
  useEffect(() => {
    if (isMobile) {
      setViewMode('mobile');
    }
  }, [isMobile]);

  return (
      <section className="relative flex min-h-dvh w-full flex-col items-center justify-center bg-[#050505] py-24 overflow-hidden border-t border-white/5">
        
        {/* Toolbar de Controle (Apenas visualização) */}
        <div className="absolute top-10 z-30">
           <ViewToggle
            currentMode={viewMode}
            setMode={setViewMode}
            labels={{ desktop: t('view_desktop'), mobile: t('view_mobile') }}
          />
        </div>

        {/* Container da Interface (Browser/Phone) */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }} // Trigger ajustado para iniciar suavemente
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(
            'relative z-20 flex flex-col overflow-hidden bg-[#0A0A0A] shadow-2xl shadow-primary/10 transition-all duration-700 ring-1 ring-white/10',
            viewMode === 'desktop'
              ? 'aspect-16/10 w-[95vw] max-w-6xl rounded-xl'
              : 'aspect-9/19 border-8 border-[#1a1a1a] rounded-[2.5rem] sm:rounded-[3rem] max-w-[400px] w-full h-[80vh] max-h-[850px]'
          )}
        >
          {/* Chrome / Notch Header */}
          <AnimatePresence mode="wait">
            {viewMode === 'desktop' ? (
              <motion.div
                key="desktop-chrome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-12 items-center gap-4 border-b border-white/5 bg-black/50 px-4 backdrop-blur-md shrink-0"
              >
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="mx-auto flex h-7 flex-1 max-w-xl items-center justify-center rounded-md border border-white/5 bg-white/5 font-mono text-[10px] text-slate-500">
                  codesampa.io
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="mobile-notch"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-2 z-30 flex h-14 w-full items-center justify-between px-6 pointer-events-none"
              >
                <span className="text-[10px] font-medium text-white">9:41</span>
                <div className="absolute left-1/2 top-1/2 flex h-7 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-full bg-black">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#1a1a1a]" />
                  <div className="h-1.5 w-12 rounded-full bg-white/10" />
                </div>
                <div className="flex gap-1.5 text-white">
                  <Signal size={12} />
                  <Wifi size={12} />
                  <BatteryMedium size={12} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Conteúdo Interno da Interface */}
          <div
            className={cn(
              'flex-1 overflow-hidden bg-background relative transition-all duration-500 w-full',
              viewMode === 'mobile' ? 'p-4 pt-16' : 'p-6'
            )}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Grid Layout Principal */}
            {/* Usamos motion.div com staggerChildren para orquestrar a entrada */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn(
                'relative z-10 grid h-full w-full gap-4 transition-all duration-500',
                viewMode === 'desktop'
                  ? 'grid-cols-[240px_1fr_1fr_1fr] grid-rows-[auto_auto_1fr]'
                  : 'grid-cols-1 grid-rows-[auto_auto_auto_1fr_auto]'
              )}
            >
              {/* Sidebar: Only Desktop */}
              {viewMode === 'desktop' && (
                <div className="row-span-3 h-full">
                  <AssemblingItem offset={{ x: -50, y: 0, r: 0, s: 0.95 }} delay={1}>
                    <DesktopSidebar />
                  </AssemblingItem>
                </div>
              )}

              {/* Header */}
              <div className={viewMode === 'desktop' ? 'col-span-3 h-16' : 'col-span-1 h-16'}>
                <AssemblingItem offset={{ x: 0, y: -30, r: 0, s: 1 }} delay={2}>
                  <ResponsiveHeader isMobile={viewMode === 'mobile'} />
                </AssemblingItem>
              </div>

              {/* Stats Row */}
              <div className={viewMode === 'desktop' ? 'col-span-1 h-32' : 'col-span-1 h-24'}>
                <AssemblingItem offset={{ x: 0, y: 30, r: 0, s: 0.9 }} delay={3}>
                  <DarkMetricCard
                    title={tStats('revenue')}
                    value="$42K"
                    trend="+12%"
                    color="text-primary"
                    isMobile={viewMode === 'mobile'}
                  />
                </AssemblingItem>
              </div>
              <div className={viewMode === 'desktop' ? 'col-span-1 h-32' : 'col-span-1 h-24'}>
                <AssemblingItem offset={{ x: 0, y: 30, r: 0, s: 0.9 }} delay={4}>
                  <DarkMetricCard
                    title={tStats('users')}
                    value="8.5K"
                    trend="+24%"
                    color="text-violet-400"
                    isMobile={viewMode === 'mobile'}
                  />
                </AssemblingItem>
              </div>

              {/* Chart / Last Stat */}
              <div className={viewMode === 'desktop' ? 'col-span-1 h-32' : 'col-span-1 h-full min-h-[200px]'}>
                {viewMode === 'desktop' ? (
                  <AssemblingItem offset={{ x: 0, y: 30, r: 0, s: 0.9 }} delay={5}>
                    <DarkMetricCard
                      title={tStats('churn')}
                      value="0.8%"
                      trend="-2%"
                      color="text-fuchsia-400"
                      isMobile={viewMode !== 'desktop'}
                    />
                  </AssemblingItem>
                ) : (
                  <AssemblingItem offset={{ x: 0, y: 50, r: 0, s: 1 }} delay={5}>
                    <DarkChart />
                  </AssemblingItem>
                )}
              </div>

              {/* Desktop Chart Area */}
              {viewMode === 'desktop' && (
                <div className="col-span-3 h-full min-h-0">
                  <AssemblingItem offset={{ x: 0, y: 50, r: 0, s: 1 }} delay={6}>
                    <DarkChart />
                  </AssemblingItem>
                </div>
              )}

              {/* Mobile Bottom Nav */}
              {viewMode === 'mobile' && (
                <div className="h-16 self-end mt-auto">
                  <AssemblingItem offset={{ x: 0, y: 30, r: 0, s: 1 }} delay={7}>
                    <MobileBottomNav />
                  </AssemblingItem>
                </div>
              )}
            </motion.div>

            {/* Mobile Home Indicator */}
            {viewMode === 'mobile' && (
              <div className="absolute bottom-2 left-1/2 z-30 h-1 w-32 -translate-x-1/2 rounded-full bg-white/20" />
            )}
          </div>
        </motion.div>
      </section>
  );
}