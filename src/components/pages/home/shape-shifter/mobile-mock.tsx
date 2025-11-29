'use client';

import { motion } from 'framer-motion';
import { Signal, Wifi, BatteryMedium } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { DarkChart, DarkMetricCard, MobileBottomNav, ResponsiveHeader } from './components';

interface MobileMockProps {
  startAnimation: boolean;
}

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
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  return (
    // Reduzi a altura para h-[75vh] e o max-height para 800px para evitar colisão com o controle inferior
    <motion.div
      className="relative flex aspect-9/19 h-[75vh] max-h-[800px] w-full max-w-[380px] flex-col overflow-hidden rounded-[3rem] border-8 border-[#1a1a1a] bg-[#0A0A0A] shadow-2xl ring-1 ring-white/10"
      initial={{ opacity: 0, y: 50 }}
      animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Notch & Status Bar */}
      <div className="absolute top-0 z-30 flex h-12 w-full items-end justify-between px-6 pb-2">
        <span className="text-[10px] font-medium text-white/80">9:41</span>
        <div className="absolute left-1/2 top-0 flex h-6 w-32 -translate-x-1/2 items-end justify-center rounded-b-xl bg-[#1a1a1a] pb-1.5">
          <div className="h-1 w-12 rounded-full bg-white/10" />
        </div>
        <div className="flex gap-1.5 text-white">
          <Signal size={12} />
          <Wifi size={12} />
          <BatteryMedium size={12} />
        </div>
      </div>

      {/* Conteúdo Interno Mobile - Mudei para Flexbox para melhor distribuição */}
      <div className="flex flex-1 flex-col overflow-hidden bg-background relative w-full">
        {/* Grid de Fundo */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[24px_24px]" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={startAnimation ? "visible" : "hidden"}
          className="relative z-10 flex h-full flex-col gap-3 p-4 pt-14"
        >
          {/* Header Compacto */}
          <MotionItem className="shrink-0">
            <ResponsiveHeader isMobile={true} />
          </MotionItem>

          {/* Cards de Métricas lado a lado (Grid de 2 colunas para economizar espaço vertical) */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <MotionItem className="h-28">
              <DarkMetricCard
                title={tStats('revenue')}
                value="$42K"
                trend="+12%"
                color="text-primary"
                isMobile={true}
              />
            </MotionItem>
            
            <MotionItem className="h-28">
              <DarkMetricCard
                title={tStats('users')}
                value="8.5K"
                trend="+24%"
                color="text-violet-400"
                isMobile={true}
              />
            </MotionItem>
          </div>

          {/* Chart Expandível - Ocupa o resto do espaço */}
          <MotionItem className="flex-1 min-h-[180px]">
            <DarkChart />
          </MotionItem>

          {/* Bottom Nav Fixo */}
          <MotionItem className="shrink-0 mt-auto pt-2">
            <MobileBottomNav />
          </MotionItem>
        </motion.div>

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 z-30 h-1 w-32 -translate-x-1/2 rounded-full bg-white/20" />
      </div>
    </motion.div>
  );
}