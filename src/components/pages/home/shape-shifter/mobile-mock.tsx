'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Signal, Wifi, BatteryMedium } from 'lucide-react';

import {
  AnalyticsView,
  CRMView,
  ChatView,
  MobileBottomNav,
  ResponsiveHeader,
  FeatureType
} from './components';

interface MobileMockProps {
  startAnimation: boolean;
  activeFeature: FeatureType;
  setFeature: (f: FeatureType) => void;
}

export function MobileMock({
  startAnimation,
  activeFeature,
  setFeature
}: MobileMockProps) {
  return (
    <motion.div
      className="relative flex aspect-9/19 h-[75vh] max-h-[800px] w-full max-w-[380px] flex-col overflow-hidden rounded-[3rem] border-8 border-[#1a1a1a] bg-[#0A0A0A] shadow-2xl ring-1 ring-white/10"
      initial={{ opacity: 0, y: 50 }}
      animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
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

      {/* Conteúdo Interno Mobile */}
      <div className="flex flex-1 flex-col overflow-hidden bg-background relative w-full">
        {/* Grid de Fundo */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[24px_24px]" />

        <div className="relative z-10 flex h-full flex-col gap-3 p-4 pt-14">
          {/* Header */}
          <div className="shrink-0 h-14">
            <ResponsiveHeader isMobile={true} activeTab={activeFeature} />
          </div>

          {/* Dynamic Content */}
          <div className="flex-1 min-h-0 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                {activeFeature === 'analytics' && (
                  <AnalyticsView isMobile={true} />
                )}
                {activeFeature === 'crm' && <CRMView isMobile={true} />}
                {activeFeature === 'chat' && <ChatView isMobile={true} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Nav */}
          <div className="shrink-0 mt-auto pt-2 h-16">
            <MobileBottomNav
              activeTab={activeFeature}
              onTabChange={setFeature}
            />
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 z-30 h-1 w-32 -translate-x-1/2 rounded-full bg-white/20" />
      </div>
    </motion.div>
  );
}
