'use client';

import { motion } from 'framer-motion';
import { Terminal, ChevronDown, Mouse } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AnimatedBadge } from '@/components/ui/animated-badge';

import {
  FloatingSymbol} from './components';

const codeSymbols = [
  { id: 1, char: '{ }', depth: 1, top: '20%', left: '10%', size: 'text-4xl', color: 'text-primary/30' },
  { id: 2, char: '</>', depth: 2, top: '15%', left: '80%', size: 'text-6xl', color: 'text-blue-500/20' },
  { id: 3, char: 'npm', depth: 0.5, top: '60%', left: '5%', size: 'text-xl', color: 'text-slate-700' },
  { id: 4, char: '&&', depth: 1.5, top: '70%', left: '85%', size: 'text-5xl', color: 'text-blue-500/20' },
  { id: 5, char: 'div', depth: 0.8, top: '40%', left: '90%', size: 'text-2xl', color: 'text-slate-600' },
  { id: 6, char: '=>', depth: 1.2, top: '30%', left: '5%', size: 'text-3xl', color: 'text-fuchsia-500/30' },
  { id: 7, char: ';', depth: 0.3, top: '80%', left: '40%', size: 'text-6xl', color: 'text-slate-800' }
];

export function HeroSection() {
  const t = useTranslations('Pages.Home.Hero');

  return (
      <section className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-background text-foreground">
        
        {/* Background Gradients & Textura */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Luz de Fundo Centralizada Atrás do Texto (Ajustada para top-[45%] para centralização ótica) */}
        <div className="absolute left-1/2 top-[45%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px] md:h-[500px] md:w-[500px]" />
        
        {/* Símbolos Flutuantes (Looping) */}
        {codeSymbols.map((item) => (
          <FloatingSymbol key={item.id} item={item} />
        ))}

        {/* Conteúdo Principal (Texto) - Centralizado */}
        {/* Adicionado -mt-12 md:-mt-20 para compensar visualmente e elevar o centro ótico */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl px-4 -mt-12 md:-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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

            <h1 className="font-display mb-6 text-5xl font-black tracking-tight text-foreground drop-shadow-2xl md:text-8xl leading-[1.1]">
              {t('title_prefix')} <br />
              <span className="bg-gradient-to-r from-primary via-blue-500 to-violet-600 bg-clip-text text-transparent">
                {t('title_suffix')}
              </span>
            </h1>
            
            <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator - Posicionado na parte inferior absoluta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 md:bottom-20 flex flex-col items-center gap-3 text-slate-400"
        >
          <span className="text-[10px] uppercase tracking-widest font-mono opacity-80">
            {t('scroll_indicator')}
          </span>
          <div className="flex flex-col items-center gap-1">
            <Mouse className="h-6 w-6 opacity-80" />
            <ChevronDown className="animate-bounce h-4 w-4 opacity-60" />
          </div>
        </motion.div>
      </section>
  );
}