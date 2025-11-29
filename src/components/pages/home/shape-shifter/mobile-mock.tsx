'use client';

import { motion } from 'framer-motion';
import { Signal, Wifi, BatteryMedium } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { DarkChart, DarkMetricCard, MobileBottomNav, ResponsiveHeader } from './components';

interface MobileMockProps {
  startAnimation: boolean;
}

// Componente interno para garantir animação
const MotionItem = ({ children, className }: { children: React.ReactNode, className?: string }) => {
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

export function MobileMock({ startAnimation }: MobileMockProps) {
  const tStats = useTranslations('Pages.Home.Stats');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.div
      className="relative flex aspect-[9/19] h-[85vh] max-h-[850px] w-full max-w-[400px] flex-col overflow-hidden rounded-[2.5rem] border-8 border-[#1a1a1a] bg-[#0A0A0A] shadow-2xl ring-1 ring-white/10"
      initial={{ opacity: 0, y: 50 }}
      animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Notch & Status Bar */}
      <div className="absolute top-0 z-30 flex h-14 w-full items-center justify-between px-6">
        <span className="text-[10px] font-medium text-white">9:41</span>
        <div className="absolute left-1/2 top-4 flex h-7 w-28 -translate-x-1/2 items-center justify-center gap-2 rounded-b-2xl bg-[#1a1a1a]">
          <div className="h-1.5 w-12 rounded-full bg-white/10" />
        </div>
        <div className="flex gap-1.5 text-white">
          <Signal size={12} />
          <Wifi size={12} />
          <BatteryMedium size={12} />
        </div>
      </div>

      {/* Conteúdo Interno Mobile */}
      <div className="flex-1 overflow-hidden bg-background p-4 pt-16 relative w-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={startAnimation ? "visible" : "hidden"}
          className="relative z-10 grid h-full w-full grid-cols-1 grid-rows-[auto_auto_auto_1fr_auto] gap-4"
        >
          {/* Header */}
          <MotionItem className="h-16">
            <ResponsiveHeader isMobile={true} />
          </MotionItem>

          {/* Stats */}
          <MotionItem className="h-24">
            <DarkMetricCard
              title={tStats('revenue')}
              value="$42K"
              trend="+12%"
              color="text-primary"
              isMobile={true}
            />
          </MotionItem>
          
          <MotionItem className="h-24">
            <DarkMetricCard
              title={tStats('users')}
              value="8.5K"
              trend="+24%"
              color="text-violet-400"
              isMobile={true}
            />
          </MotionItem>

          {/* Chart */}
          <MotionItem className="min-h-[200px] h-full">
            <DarkChart />
          </MotionItem>

          {/* Bottom Nav */}
          <MotionItem className="h-16 mt-auto">
            <MobileBottomNav />
          </MotionItem>
        </motion.div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 z-30 h-1 w-32 -translate-x-1/2 rounded-full bg-white/20" />
      </div>
    </motion.div>
  );
}