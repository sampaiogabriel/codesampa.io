'use client';

import { motion, Variants } from 'framer-motion';
import { Terminal, Mouse, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AnimatedBadge } from '@/components/ui/animated-badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { codeSymbols } from '@/utils/constants/code_symbols';
import useIsMobile from '@/utils/hooks/use-mobile';
import { useHomeStore } from '@/utils/stores/home-store';

import { BracketSelector } from './bracket-selector';
import { FloatingSymbol } from './components';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98] as const
    }
  }
};

export function HeroSection() {
  const t = useTranslations('Pages.Home.Hero');
  const { mode, toggleMode } = useHomeStore();
  const isMobile = useIsMobile();

  const handleModeSwitch = () => {
    toggleMode();
    setTimeout(() => {
      const section = document.getElementById('shape-shifter');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  return (
    <section className="relative flex h-dvh w-full flex-col items-center justify-start pt-48 md:justify-center md:pt-0 overflow-hidden bg-background text-foreground">
      {/* 1. Background Grid */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* 2. Iluminação / Blur Spot */}
      <div
        className="absolute z-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 
        top-[30%] h-[500px] w-[500px] blur-[120px] 
        md:top-[40%] md:h-[600px] md:w-[600px] md:blur-[130px]"
      />

      {/* 3. Ícones Voando */}
      <div className="absolute inset-0 z-0 w-full h-full flex justify-center pointer-events-none overflow-hidden">
        <div className="relative w-full h-full max-w-[1800px]">
          {codeSymbols.map((item, index) => (
            <FloatingSymbol key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* 4. Conteúdo Principal */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <AnimatedBadge>
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-primary" />
                <span>{t('badge')}</span>
              </div>
            </AnimatedBadge>
          </motion.div>

          {/* Título Principal */}
          <h1 className="font-space mb-6 flex flex-col items-center leading-[1.1]">
            <motion.span
              variants={itemVariants}
              className="block mb-2 text-5xl md:text-8xl font-black tracking-tight drop-shadow-2xl"
            >
              {t('title_prefix')}
            </motion.span>

            <motion.div variants={itemVariants}>
              {isMobile ? (
                <span className="block mt-2">
                  <span className="bg-linear-to-r from-primary via-blue-300 to-violet-600 bg-clip-text text-transparent font-black tracking-tight text-4xl">
                    {t('mobile_title_suffix')}
                  </span>
                </span>
              ) : (
                <BracketSelector
                  text={
                    mode === 'systems' ? t('title_suffix') : 'Landing Pages'
                  }
                  onToggle={handleModeSwitch}
                />
              )}
            </motion.div>
          </h1>

          {/* Subtítulo */}
          <motion.p
            variants={itemVariants}
            className="max-w-xl text-lg text-muted-foreground mb-4 md:mb-8"
          >
            {t('subtitle')}
          </motion.p>

          {/* Botões CTA */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center md:gap-6 w-full sm:w-auto mt-6 md:mt-12"
          >
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

                  {/* Bolinha Esmeralda */}
                  <span className="relative z-10 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                  </span>

                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </Link>
              </Button>
            </div>

            <Button
              variant="ghost"
              className="hidden md:flex group text-muted-foreground hover:text-white font-mono text-sm tracking-tight"
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
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 md:bottom-10 flex flex-col items-center gap-3 text-slate-400 pointer-events-none"
        >
          <span className="hidden md:flex text-[10px] uppercase tracking-widest font-mono opacity-80">
            {t('scroll_indicator')}
          </span>
          <div className="flex flex-col items-center gap-0.5 animate-bounce">
            <Mouse className="h-6 w-6 opacity-80" />
            <ChevronDown className="h-4 w-4 opacity-60" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
