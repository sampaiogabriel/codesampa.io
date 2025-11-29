'use client';

import { motion } from 'framer-motion';
import { Monitor, Smartphone, RotateCcw, Lock } from 'lucide-react';

import { cn } from '@/utils/functions/tw-merge';

interface ControlsProps {
  currentMode: 'desktop' | 'mobile';
  setMode: (m: 'desktop' | 'mobile') => void;
  onReplay: () => void;
  isMobileDevice: boolean;
  isVisible: boolean;
}

export function ShapeShifterControls({
  currentMode,
  setMode,
  onReplay,
  isMobileDevice,
  isVisible
}: ControlsProps) {
  return (
    <motion.div
      // Ajustado: Animação agora vem de baixo (y: 20) para o centro
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      // Ajustado: Mudado de 'top-8' para 'bottom-12' para ficar na parte inferior
      className="absolute bottom-12 z-50 flex items-center gap-2"
    >
      {/* Toggle Container */}
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/80 p-1.5 shadow-2xl backdrop-blur-xl ring-1 ring-white/5">
        
        {/* Botão Desktop */}
        <button
          onClick={() => !isMobileDevice && setMode('desktop')}
          disabled={isMobileDevice}
          className={cn(
            'relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300',
            currentMode === 'desktop' ? 'text-white' : 'text-slate-500 hover:text-slate-300',
            isMobileDevice && 'opacity-30 cursor-not-allowed'
          )}
        >
          {currentMode === 'desktop' && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/5"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <Monitor size={14} className="relative z-10" />
          <span className="relative z-10 hidden sm:inline">Desktop</span>
          {isMobileDevice && <Lock size={10} className="absolute -right-1 -top-1 text-slate-500" />}
        </button>

        {/* Separator */}
        <div className="h-4 w-px bg-white/10 mx-1" />

        {/* Botão Mobile */}
        <button
          onClick={() => setMode('mobile')}
          className={cn(
            'relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300',
            currentMode === 'mobile' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
          )}
        >
          {currentMode === 'mobile' && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/5"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <Smartphone size={14} className="relative z-10" />
          <span className="relative z-10 hidden sm:inline">Mobile</span>
        </button>
      </div>

      {/* Botão Replay Separado */}
      <button
        onClick={onReplay}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/80 text-slate-400 backdrop-blur-xl transition-all hover:bg-white/10 hover:text-white active:scale-95"
        title="Replay Animation"
      >
        <RotateCcw size={16} />
      </button>
    </motion.div>
  );
}