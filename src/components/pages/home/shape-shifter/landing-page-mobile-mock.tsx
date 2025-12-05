'use client';

import { motion } from 'framer-motion';
import { Signal, Wifi, BatteryMedium, Globe, Menu } from 'lucide-react';

export function LandingPageMobileMock() {
  return (
    <div className="relative flex aspect-9/19 h-[75vh] max-h-[800px] w-full max-w-[380px] flex-col overflow-hidden rounded-[3rem] border-8 border-[#1a1a1a] bg-[#0A0A0A] shadow-2xl ring-1 ring-white/10">
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
        {/* Navbar */}
        <div className="relative z-20 flex h-14 items-center justify-between px-4 pt-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
              <Globe size={12} className="text-white" />
            </div>
            <div className="h-2 w-16 rounded-full bg-white/20" />
          </div>
          <Menu size={18} className="text-white/60" />
        </div>

        {/* Hero Section */}
        <div className="relative z-10 flex flex-col gap-6 p-6 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
            <span className="text-[8px] font-bold text-primary tracking-widest uppercase">
              v2.4 Live
            </span>
          </motion.div>

          <div className="space-y-3">
            <div className="h-8 w-full rounded bg-gradient-to-r from-white via-white to-white/40" />
            <div className="h-8 w-3/4 rounded bg-gradient-to-r from-white via-white to-white/40" />
          </div>

          <div className="space-y-2">
            <div className="h-2 w-full rounded bg-white/10" />
            <div className="h-2 w-full rounded bg-white/10" />
            <div className="h-2 w-2/3 rounded bg-white/10" />
          </div>

          <div className="h-10 w-full rounded-lg bg-white flex items-center justify-center font-bold text-black text-xs shadow-lg shadow-white/10 mt-2">
            Start Building
          </div>

          {/* Visual Element Placeholder */}
          <div className="mt-4 aspect-square w-full rounded-xl border border-white/10 bg-white/5 relative overflow-hidden p-4">
            {/* Chart Mock */}
            <div className="flex h-full items-end justify-between gap-1">
              {[40, 70, 50, 90, 60, 80].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                  className="w-full rounded-t-sm bg-primary/30"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 z-30 h-1 w-32 -translate-x-1/2 rounded-full bg-white/20" />
      </div>
    </div>
  );
}
