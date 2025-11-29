'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { DarkChart, DarkMetricCard, DesktopSidebar, ResponsiveHeader } from './components';

interface DesktopMockProps {
  startAnimation: boolean;
}

// Componente interno para garantir que a animação receba o sinal do pai
const MotionItem = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { y: 20, opacity: 0, scale: 0.95 },
        visible: { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          transition: { type: "spring", stiffness: 100, damping: 20 }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export function DesktopMock({ startAnimation }: DesktopMockProps) {
  const tStats = useTranslations('Pages.Home.Stats');

  // Variantes do container principal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Aumentei o stagger para tornar a "montagem" mais perceptível
        staggerChildren: 0.2, 
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.div
      className="relative flex aspect-16/10 w-[95vw] max-w-6xl flex-col overflow-hidden rounded-xl bg-[#0A0A0A] ring-1 ring-white/10 shadow-2xl shadow-primary/10"
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={startAnimation ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Chrome / Browser Header */}
      <div className="flex h-12 shrink-0 items-center gap-4 border-b border-white/5 bg-black/50 px-4 backdrop-blur-md">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
        <div className="mx-auto flex h-7 flex-1 max-w-xl items-center justify-center rounded-md border border-white/5 bg-white/5 font-mono text-[10px] text-slate-500">
          codesampa.io
        </div>
      </div>

      {/* Conteúdo Interno */}
      <div className="relative w-full flex-1 overflow-hidden bg-background p-6">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Grid Container com propagação de variantes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={startAnimation ? "visible" : "hidden"}
          className="relative z-10 grid h-full w-full grid-cols-[240px_1fr_1fr_1fr] grid-rows-[auto_auto_1fr] gap-4"
        >
          {/* Sidebar */}
          <MotionItem className="row-span-3 h-full">
            <DesktopSidebar />
          </MotionItem>

          {/* Header */}
          <MotionItem className="col-span-3 h-16">
            <ResponsiveHeader isMobile={false} />
          </MotionItem>

          {/* Stats Row */}
          <MotionItem className="col-span-1 h-32">
            <DarkMetricCard
              title={tStats('revenue')}
              value="$42K"
              trend="+12%"
              color="text-primary"
              isMobile={false}
            />
          </MotionItem>
          
          <MotionItem className="col-span-1 h-32">
            <DarkMetricCard
              title={tStats('users')}
              value="8.5K"
              trend="+24%"
              color="text-violet-400"
              isMobile={false}
            />
          </MotionItem>
          
          <MotionItem className="col-span-1 h-32">
            <DarkMetricCard
              title={tStats('churn')}
              value="0.8%"
              trend="-2%"
              color="text-fuchsia-400"
              isMobile={false}
            />
          </MotionItem>

          {/* Chart Area */}
          <MotionItem className="col-span-3 h-full min-h-0">
            <DarkChart />
          </MotionItem>
        </motion.div>
      </div>
    </motion.div>
  );
}