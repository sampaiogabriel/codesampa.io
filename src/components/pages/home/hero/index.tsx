'use client';

import { motion } from 'framer-motion';
import { Terminal, ChevronDown, Mouse, ArrowRight, Layers } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AnimatedBadge } from '@/components/ui/animated-badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { codeSymbols } from '@/utils/constants/code_symbols';

import { FloatingSymbol } from './components';

export function HeroSection() {
  const t = useTranslations('Pages.Home.Hero');

  return (
    <section className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-background text-foreground pb-32 md:pb-0">
      {/* Background Gradients & Textura */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Luz de Fundo Centralizada Atrás do Texto */}
      <div className="absolute left-1/2 top-[40%] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 blur-[130px] md:h-[600px] md:w-[600px]" />

      {/* Símbolos Flutuantes (Looping) */}
      <div className="absolute inset-0 w-full h-full flex justify-center pointer-events-none">
        <div className="relative w-full h-full max-w-[1800px]">
          {codeSymbols.map((item, index) => (
            <FloatingSymbol key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

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

          <p className="max-w-xl text-lg text-muted-foreground mb-8">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto mt-12">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 rounded-lg border border-primary/30 opacity-40 scale-90 group-hover:scale-100 group-hover:opacity-100 group-hover:border-primary/60 transition-all duration-500 ease-out" />

              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <Button
                className="relative bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 font-space font-bold tracking-widest uppercase px-8 h-8 backdrop-blur-md overflow-hidden"
                asChild
              >
                <Link href="/contact" className="flex items-center gap-3">
                  <span className="relative z-10">{t('cta_primary')}</span>
                  <span className="relative z-10 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
                  </span>

                  {/* Scanline Background */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </Link>
              </Button>
            </div>

            {/* BOTÃO SECUNDÁRIO: CODE LINK */}
            <Button
              variant="ghost"
              className="group text-muted-foreground hover:text-white font-mono text-sm tracking-tight"
              asChild
            >
              <Link href="/projects" className="flex items-center gap-2">
                <span className="opacity-50 group-hover:opacity-100 group-hover:text-purple-400 transition-all">
                  {'{'}
                </span>
                <span>{t('cta_secondary')}</span>
                <span className="opacity-50 group-hover:opacity-100 group-hover:text-purple-400 transition-all">
                  {'}'}
                </span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1 }}
        className="absolute bottom-12 md:bottom-10 flex flex-col items-center gap-3 text-slate-400 pointer-events-none"
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
