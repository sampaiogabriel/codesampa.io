'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

import { cn } from '@/utils/functions/tw-merge';

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  // useSpring suaviza o movimento da barra para não parecer "travada"
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className={cn(
        'fixed top-0 left-0 right-0 z-100 h-1 origin-left bg-linear-to-r from-blue-600 via-primary to-purple-600',
        className
      )}
      style={{ scaleX }}
    >
      {/* Glow effect abaixo da barra */}
      <div className="absolute top-0 right-0 h-full w-[100px] -translate-y-1/2 bg-white blur-[10px] opacity-50" />
      <div className="absolute inset-0 bg-primary/20 blur-[2px]" />
    </motion.div>
  );
}
