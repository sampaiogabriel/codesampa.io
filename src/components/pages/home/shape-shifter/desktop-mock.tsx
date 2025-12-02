'use client';

import { motion, AnimatePresence } from 'framer-motion';

import {
  AnalyticsView,
  CRMView,
  ChatView,
  DesktopSidebar,
  ResponsiveHeader,
  FeatureType
} from './components';

interface DesktopMockProps {
  startAnimation: boolean;
  activeFeature: FeatureType;
  setFeature: (f: FeatureType) => void;
}

export function DesktopMock({
  startAnimation,
  activeFeature,
  setFeature
}: DesktopMockProps) {
  return (
    <motion.div
      className="relative flex aspect-16/10 w-[95vw] max-w-6xl flex-col overflow-hidden rounded-xl bg-[#0A0A0A] ring-1 ring-white/10 shadow-2xl shadow-primary/10"
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={
        startAnimation
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.95, y: 30 }
      }
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
          codesampa.io / {activeFeature}
        </div>
      </div>

      {/* Conteúdo Interno */}
      <div className="relative w-full flex-1 overflow-hidden bg-background p-6">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative z-10 grid h-full w-full grid-cols-[240px_1fr] gap-6">
          {/* Sidebar */}
          <DesktopSidebar activeTab={activeFeature} onTabChange={setFeature} />

          {/* Main Area */}
          <div className="flex flex-col gap-6 overflow-hidden">
            {/* Header */}
            <div className="shrink-0 h-16">
              <ResponsiveHeader isMobile={false} activeTab={activeFeature} />
            </div>

            {/* Dynamic Content Area */}
            <div className="flex-1 min-h-0 relative">
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
                    <AnalyticsView isMobile={false} />
                  )}
                  {activeFeature === 'crm' && <CRMView isMobile={false} />}
                  {activeFeature === 'chat' && <ChatView isMobile={false} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
