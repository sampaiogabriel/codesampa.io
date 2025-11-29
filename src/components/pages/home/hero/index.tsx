'use client';

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence
} from 'framer-motion';
import { Terminal, Signal, Wifi, BatteryMedium } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useRef, useState, useEffect } from 'react';

import { AnimatedBadge } from '@/components/ui/animated-badge';
import { cn } from '@/utils/functions/tw-merge';
import useIsMobile from '@/utils/hooks/use-mobile';

import {
  ViewToggle,
  DesktopSidebar,
  ResponsiveHeader,
  DarkMetricCard,
  DarkChart,
  MobileBottomNav,
  FloatingSymbol,
  AssemblingItem
} from './hero-components';

const codeSymbols = [
  {
    id: 1,
    char: '{ }',
    depth: 1,
    top: '20%',
    left: '10%',
    size: 'text-4xl',
    color: 'text-primary/30'
  },
  {
    id: 2,
    char: '</>',
    depth: 2,
    top: '15%',
    left: '80%',
    size: 'text-6xl',
    color: 'text-blue-500/20'
  },
  {
    id: 3,
    char: 'npm',
    depth: 0.5,
    top: '60%',
    left: '5%',
    size: 'text-xl',
    color: 'text-slate-700'
  },
  {
    id: 4,
    char: '&&',
    depth: 1.5,
    top: '70%',
    left: '85%',
    size: 'text-5xl',
    color: 'text-blue-500/20'
  },
  {
    id: 5,
    char: 'div',
    depth: 0.8,
    top: '40%',
    left: '90%',
    size: 'text-2xl',
    color: 'text-slate-600'
  },
  {
    id: 6,
    char: '=>',
    depth: 1.2,
    top: '30%',
    left: '5%',
    size: 'text-3xl',
    color: 'text-fuchsia-500/30'
  },
  {
    id: 7,
    char: ';',
    depth: 0.3,
    top: '80%',
    left: '40%',
    size: 'text-6xl',
    color: 'text-slate-800'
  }
];

export function HeroSection() {
  const t = useTranslations('Pages.Home.Hero');
  const tStats = useTranslations('Pages.Home.Stats');
  const isMobile = useIsMobile();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  // [CORREÇÃO] Effect para forçar o modo mobile se a resolução for detectada como mobile
  useEffect(() => {
    if (isMobile) {
      setViewMode('mobile');
    }
  }, [isMobile]);

  // Animations
  const toolbarOpacity = useTransform(scrollYProgress, [0, 0.3, 0.35, 0.9, 1], [0, 0, 1, 1, 0]);
  const toolbarPointerEvents = useTransform(scrollYProgress, (v) => 
    (v > 0.3 && v < 0.95) ? 'auto' : 'none'
  );

  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);
  const textBlur = useTransform(scrollYProgress, [0, 0.3], [0, 20]);
  
  // Hook chamado incondicionalmente no topo (Correto)
  const textBlurFilter = useTransform(textBlur, (v) => `blur(${v}px)`);
  
  const browserOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const browserScale = useTransform(scrollYProgress, [0.2, 0.5], [1.5, 1]);
  const assemblyProgress = useTransform(scrollYProgress, [0.4, 0.9], [0, 1]);

  return (
    <section
      ref={containerRef}
      // [CORREÇÃO UX MOBILE] Reduzi a altura para 200vh no mobile (antes era fixo 400vh)
      // Isso faz o scroll ser mais curto e responsivo no celular.
      className="relative h-[200vh] md:h-[400vh] overflow-x-clip bg-background text-foreground selection:bg-primary/30"
    >
      {/* Toolbar Flutuante */}
      <motion.div 
        style={{ opacity: toolbarOpacity, pointerEvents: toolbarPointerEvents }}
        className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
      >
        <ViewToggle
          currentMode={viewMode}
          setMode={setViewMode}
          labels={{
            desktop: t('view_desktop'),
            mobile: t('view_mobile')
          }}
        />
      </motion.div>

      {/* [CORREÇÃO MOBILE] Usando h-[100dvh] ao invés de h-screen para evitar 
          saltos quando a barra de endereço do navegador mobile recolhe/expande */}
      <div className="sticky top-0 flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden perspective-1000">
        
        {/* === BACKGROUND GRADIENT (Radius Style) === */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-[-10%] left-1/2 h-[500px] w-full max-w-[1000px] -translate-x-1/2 rounded-[100%] bg-primary/20 blur-[100px] md:h-[700px] md:blur-[130px]" />
        <div className="absolute bottom-[-10%] blur-[80px]" />

        {/* Layer 1: Symbols */}
        {codeSymbols.map((item) => (
          <FloatingSymbol key={item.id} item={item} scrollY={scrollYProgress} />
        ))}

        {/* Layer 2: Hero Text */}
        <motion.div
          style={{
            opacity: textOpacity,
            scale: textScale,
            // Aplicamos o filtro condicionalmente via style, o hook já foi calculado acima
            filter: isMobile ? 'none' : textBlurFilter
          }}
          className="absolute z-10 -mt-24 w-full max-w-5xl px-4 text-center md:-mt-48"
        >
          <div className="mb-8 flex justify-center">
            <AnimatedBadge>
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-primary" />
                <span>{t('badge')}</span>
              </div>
            </AnimatedBadge>
          </div>

          
          <h1 className="font-display mb-8 text-6xl font-black tracking-tight text-foreground drop-shadow-2xl md:text-8xl">
            {t('title_prefix')} <br />
            <span className="bg-linear-to-r from-primary via-blue-500 to-violet-600 bg-clip-text text-transparent">
              {t('title_suffix')}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Layer 3: THE SHAPESHIFTER */}
        <motion.div
          style={{ opacity: browserOpacity, scale: browserScale }}
          layout
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className={cn(
            'relative z-20 flex flex-col overflow-hidden bg-[#0A0A0A] shadow-2xl shadow-primary/20 transition-all',
            viewMode === 'desktop'
              ? 'aspect-16/10 w-[95vw] max-w-6xl rounded-xl border border-white/10'
              : 'aspect-9/19 border-8 border-[#1a1a1a] rounded-[2.5rem] sm:rounded-[3rem] max-w-[420px] w-auto h-[80vh] max-h-[850px]'
          )}
        >
          {/* === CHROME / NOTCH LOGIC === */}
          <AnimatePresence mode="wait">
            {viewMode === 'desktop' ? (
              <motion.div
                key="desktop-chrome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-12 items-center gap-4 border-b border-white/5 bg-black/50 px-4 backdrop-blur-md"
              >
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full border border-red-500/50 bg-red-500/20" />
                  <div className="h-3 w-3 rounded-full border border-yellow-500/50 bg-yellow-500/20" />
                  <div className="h-3 w-3 rounded-full border border-green-500/50 bg-green-500/20" />
                </div>
                <div className="mx-auto flex h-8 flex-1 max-w-xl items-center justify-center rounded-md border border-white/5 bg-white/5 font-mono text-xs text-slate-500">
                  codesampa.io
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="mobile-notch"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                // Adicionado top-2 e aumentado padding lateral para afastar das bordas curvas
                className="absolute top-2 z-30 flex h-14 w-full items-center justify-between px-8"
              >
                <span className="text-[10px] font-medium text-white">9:41</span>
                {/* Notch maior (w-32, h-8) para telas maiores e linha interna ajustada */}
                <div className="absolute left-1/2 top-1/2 flex h-8 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-full bg-black">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#1a1a1a]" />
                  <div className="h-2 w-16 rounded-full bg-white/5" />
                </div>
                <div className="flex gap-1.5 text-white">
                  <Signal size={12} />
                  <Wifi size={12} />
                  <BatteryMedium size={12} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* === CONTENT BODY === */}
          <div
            className={cn(
              'flex-1 overflow-hidden bg-background relative transition-all',
              // Aumentado pt-20 para garantir que o conteúdo comece abaixo do notch maior/mais baixo
              viewMode === 'mobile' ? 'p-4 pt-20' : 'p-6'
            )}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* THE GRID QUE MUDA COM O STATE */}
            <div
              className={cn(
                'relative z-10 grid h-full w-full gap-4 transition-all',
                viewMode === 'desktop'
                  ? 'grid-cols-[240px_1fr_1fr_1fr] grid-rows-[auto_auto_1fr]'
                  : 'grid-cols-1 grid-rows-[auto_auto_auto_1fr_auto]'
              )}
            >
              {/* Sidebar: Only Desktop */}
              {viewMode === 'desktop' && (
                <div className="row-span-3">
                  <AssemblingItem
                    progress={assemblyProgress}
                    offset={{ x: -400, y: 0, r: -10, s: 0.8 }}
                  >
                    <DesktopSidebar />
                  </AssemblingItem>
                </div>
              )}

              {/* Header */}
              <div
                className={
                  viewMode === 'desktop'
                    ? 'col-span-3 h-16'
                    : 'col-span-1 h-16'
                }
              >
                <AssemblingItem
                  progress={assemblyProgress}
                  offset={{ x: 0, y: -200, r: 0, s: 0.9 }}
                >
                  <ResponsiveHeader isMobile={viewMode === 'mobile'} />
                </AssemblingItem>
              </div>

              {/* Stats */}
              <div
                className={
                  viewMode === 'desktop'
                    ? 'col-span-1 h-36'
                    : 'col-span-1 h-28'
                }
              >
                <AssemblingItem
                  progress={assemblyProgress}
                  offset={{ x: -200, y: 300, r: 10, s: 0.5 }}
                >
                  <DarkMetricCard
                    title={tStats('revenue')}
                    value="$42K"
                    trend="+12%"
                    color="text-primary"
                    isMobile={viewMode === 'mobile'}
                  />
                </AssemblingItem>
              </div>
              <div
                className={
                  viewMode === 'desktop'
                    ? 'col-span-1 h-36'
                    : 'col-span-1 h-28'
                }
              >
                <AssemblingItem
                  progress={assemblyProgress}
                  offset={{ x: 0, y: 400, r: 0, s: 0.6 }}
                >
                  <DarkMetricCard
                    title={tStats('users')}
                    value="8.5K"
                    trend="+24%"
                    color="text-violet-400"
                    isMobile={viewMode === 'mobile'}
                  />
                </AssemblingItem>
              </div>

              {/* Chart */}
              <div
                className={
                  viewMode === 'desktop'
                    ? 'col-span-1 h-36'
                    : 'col-span-1 h-full'
                }
              >
                {viewMode === 'desktop' ? (
                  <AssemblingItem
                    progress={assemblyProgress}
                    offset={{ x: 200, y: 300, r: -10, s: 0.5 }}
                  >
                    <DarkMetricCard
                      title={tStats('churn')}
                      value="0.8%"
                      trend="-2%"
                      color="text-fuchsia-400"
                      isMobile={viewMode !== 'desktop'}
                    />
                  </AssemblingItem>
                ) : (
                  <AssemblingItem
                    progress={assemblyProgress}
                    offset={{ x: 0, y: 500, r: 0, s: 1.1 }}
                  >
                    <DarkChart />
                  </AssemblingItem>
                )}
              </div>

              {/* Chart Desktop Only Area */}
              {viewMode === 'desktop' && (
                <div className="col-span-3 h-full">
                  <AssemblingItem
                    progress={assemblyProgress}
                    offset={{ x: 0, y: 500, r: 0, s: 1.1 }}
                  >
                    <DarkChart />
                  </AssemblingItem>
                </div>
              )}

              {/* Bottom Nav: Only Mobile */}
              {viewMode === 'mobile' && (
                <div className="h-20 self-end">
                  <AssemblingItem
                    progress={assemblyProgress}
                    offset={{ x: 0, y: 200, r: 0, s: 1 }}
                  >
                    <MobileBottomNav />
                  </AssemblingItem>
                </div>
              )}
            </div>

            {/* Mobile Home Indicator */}
            {viewMode === 'mobile' && (
              <div className="absolute bottom-1 left-1/2 z-30 h-1 w-32 -translate-x-1/2 rounded-full bg-white/20" />
            )}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-24 flex flex-col items-center gap-2 text-slate-400 md:bottom-10"
        >
          <span className="text-[10px] uppercase tracking-widest">
            {t('scroll_indicator')}
          </span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-primary to-transparent md:h-12"></div>
        </motion.div>
      </div>
    </section>
  );
}