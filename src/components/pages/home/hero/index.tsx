'use client';

import { motion } from 'framer-motion';
import { Terminal, ChevronDown, Mouse } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AnimatedBadge } from '@/components/ui/animated-badge';
import { codeSymbols } from '@/utils/constants/code_symbols';

import { FloatingSymbol } from './components';

export function HeroSection() {
  const t = useTranslations('Pages.Home.Hero');

  return (
    <section className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-background text-foreground pb-32 md:pb-0">
      {/* Background Gradients & Textura */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Luz de Fundo Centralizada Atrás do Texto */}
      <div className="absolute left-1/2 top-[45%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 blur-[120px] md:h-[500px] md:w-[500px]" />

      {/* Símbolos Flutuantes (Looping) */}
      <div className="absolute inset-0 w-full h-full flex justify-center pointer-events-none">
        <div className="relative w-full h-full max-w-[1800px]">
          {codeSymbols.map((item, index) => (
            <FloatingSymbol key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* Conteúdo Principal (Texto) - Centralizado */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl px-4 -mt-12 md:-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <div className="mb-8">
            <AnimatedBadge>
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-primary" />
                <span>{t('badge')}</span>
              </div>
            </AnimatedBadge>
          </div>

          <h1 className="font-space mb-6 text-5xl font-black tracking-tight text-foreground drop-shadow-2xl md:text-8xl leading-[1.1]">
            {t('title_prefix')} <br />
            <span className="bg-linear-to-r from-primary via-blue-300 to-violet-600 bg-clip-text text-transparent">
              {t('title_suffix')}
            </span>
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1 }}
        className="absolute bottom-12 md:bottom-20 flex flex-col items-center gap-3 text-slate-400"
      >
        <span className="text-[10px] uppercase tracking-widest font-mono opacity-80">
          {t('scroll_indicator')}
        </span>
        <div className="flex flex-col items-center gap-1 animate-bounce">
          <Mouse className="h-6 w-6 opacity-80" />
          <ChevronDown className="h-4 w-4 opacity-60" />
        </div>
      </motion.div>
    </section>
  );
}
