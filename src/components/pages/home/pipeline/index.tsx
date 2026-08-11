'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import {
  PenTool,
  AppWindow,
  Server,
  BrainCircuit,
  ShieldCheck,
  Infinity
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';

import { StatusDot } from '@/components/ui/status-dot';
import { cn } from '@/utils/functions/tw-merge';
import useIsMobile from '@/utils/hooks/use-mobile';

import {
  UiUxVisual,
  FrontendVisual,
  BackendVisual,
  AiVisual,
  QaVisual,
  DevOpsVisual
} from './pipeline-visuals';

export function EngineeringPipeline() {
  const t = useTranslations('Pages.Home.Pipeline');
  const targetRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-150%']);

  const steps = [
    {
      id: '01',
      key: '01',
      visual: <UiUxVisual />,
      icon: <PenTool size={18} />,
      color: 'border-purple-500'
    },
    {
      id: '02',
      key: '02',
      visual: <FrontendVisual />,
      icon: <AppWindow size={18} />,
      color: 'border-blue-500'
    },
    {
      id: '03',
      key: '03',
      visual: <BackendVisual />,
      icon: <Server size={18} />,
      color: 'border-green-500'
    },
    {
      id: '04',
      key: '04',
      visual: <AiVisual />,
      icon: <BrainCircuit size={18} />,
      color: 'border-cyan-500'
    },
    {
      id: '05',
      key: '05',
      visual: <QaVisual />,
      icon: <ShieldCheck size={18} />,
      color: 'border-emerald-500'
    },
    {
      id: '06',
      key: '06',
      visual: <DevOpsVisual />,
      icon: <Infinity size={18} />,
      color: 'border-indigo-500'
    }
  ];

  return (
    <section
      ref={targetRef}
      className="relative bg-background md:h-[500vh] overflow-x-clip"
      aria-label={t('title')}
    >
      {/* Container Sticky */}
      <div className="container mx-auto flex w-full flex-col justify-start md:sticky md:top-0 md:h-screen md:justify-center md:overflow-hidden">
        {/* Cabeçalho Centralizado */}
        <div className="mb-8 md:mb-16 text-center max-w-4xl mx-auto px-6 pt-12 md:pt-0 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 mb-4"
          >
            <StatusDot />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              {t('badge')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-space text-3xl font-black text-foreground md:text-5xl"
          >
            {t.rich('title', {
              br: () => <br className="md:hidden" />
            })}
          </motion.h2>
        </div>

        {/* Linha Decorativa (Opcional - ajustada para não cortar o título) */}
        <div className="md:block">
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border/40" />
          <div className="absolute left-0 top-1/2 h-px w-24 -translate-y-1/2 bg-linear-to-r from-transparent to-primary" />
        </div>

        {/* === ÁREA DE SCROLL === */}
        <div className="relative z-10 w-full overflow-x-auto snap-x snap-mandatory pb-12 md:pb-0 md:overflow-visible">
          <motion.ol
            style={!isMobile ? { x } : {}}
            className="flex flex-row gap-6 px-6 md:gap-16 md:px-0 md:pl-0 md:pr-0 items-stretch"
          >
            {steps.map((step) => {
              const title = t(`steps.${step.key}.title`);
              const subtitle = t(`steps.${step.key}.subtitle`);
              const desc = t(`steps.${step.key}.description`);

              return (
                <li
                  key={step.id}
                  // ATUALIZADO: w-[80vw] (mobile) para permitir ver o próximo card
                  className="group relative shrink-0 snap-center w-[80vw] max-w-[350px] flex flex-col md:w-auto md:max-w-none md:flex-none"
                >
                  <article className="relative flex-1 flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-colors hover:border-primary/20 md:h-[450px] md:w-[450px] md:flex-none">
                    <header className="flex h-10 items-center justify-between border-b border-border bg-muted/30 px-4">
                      <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                        <span aria-label={`Step ${step.id}`}>{step.id}</span>
                        <span className="text-border">/</span>
                        <span className="uppercase tracking-wider">
                          {subtitle}
                        </span>
                      </div>
                      <div
                        className={cn(
                          'h-2 w-2 rounded-full border bg-opacity-20',
                          step.color
                        )}
                      />
                    </header>

                    <div className="relative h-[200px] flex-1 overflow-hidden bg-black/20 md:h-auto">
                      {step.visual}
                    </div>

                    <div className="border-t border-border bg-card p-6 md:h-36">
                      <h3 className="mb-2 flex items-center gap-2 text-xl font-bold text-card-foreground">
                        <span className="text-primary">{step.icon}</span>
                        {title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {desc}
                      </p>
                    </div>
                  </article>

                  {/* Conector Visual (Desktop) */}
                  <div
                    className={cn(
                      'absolute -left-8 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rounded-full border-2 border-border bg-background transition-colors md:block',
                      `group-hover:${step.color.replace('border', 'border')}`
                    )}
                    aria-hidden="true"
                  >
                    <div
                      className={cn(
                        'h-full w-full rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100',
                        step.color.replace('border-', 'bg-')
                      )}
                    />
                  </div>
                </li>
              );
            })}
          </motion.ol>
        </div>

        {/* Footer info (Desktop) */}
        <div className="absolute bottom-8 right-8 hidden text-right md:block">
          <p className="font-mono text-xs text-muted-foreground/60">
            {t('scroll_hint')}
          </p>
        </div>
      </div>
    </section>
  );
}
