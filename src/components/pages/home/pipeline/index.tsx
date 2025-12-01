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

import { cn } from '@/utils/functions/tw-merge';
import useIsMobile from '@/utils/hooks/use-mobile';

import {
  UiUxVisual,
  FrontendVisual,
  BackendVisual,
  AiVisual,
  QaVisual,
  DevOpsVisual
} from './visuals';

export function EngineeringPipeline() {
  const t = useTranslations('Pages.Home.Pipeline');
  const targetRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  // Transformação horizontal (Ajustado para 6 cards)
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-115%']);

  const steps = [
    {
      id: '01',
      key: '01', // UI/UX
      visual: <UiUxVisual />,
      icon: <PenTool size={18} />,
      color: 'border-blue-500' // Design blue
    },
    {
      id: '02',
      key: '02', // Frontend
      visual: <FrontendVisual />,
      icon: <AppWindow size={18} />,
      color: 'border-blue-500'
    },
    {
      id: '03',
      key: '03', // Backend
      visual: <BackendVisual />,
      icon: <Server size={18} />,
      color: 'border-green-500'
    },
    {
      id: '04',
      key: '04', // IA & Automação
      visual: <AiVisual />,
      icon: <BrainCircuit size={18} />,
      color: 'border-cyan-500' // AI Cyan
    },
    {
      id: '05',
      key: '05', // QA
      visual: <QaVisual />,
      icon: <ShieldCheck size={18} />,
      color: 'border-emerald-500'
    },
    {
      id: '06',
      key: '06', // DevOps
      visual: <DevOpsVisual />,
      icon: <Infinity size={18} />,
      color: 'border-indigo-500'
    }
  ];

  return (
    <section
      ref={targetRef}
      className="relative bg-background md:h-[400vh] overflow-x-clip"
      aria-label={t('title')}
    >
      {/* Container Sticky apenas no Desktop */}
      <div className="container mx-auto flex w-full flex-col justify-start md:sticky md:top-5 md:h-screen md:justify-center md:overflow-hidden">
        {/* Cabeçalho da Seção */}
        <header className="px-6 py-6 md:absolute md:left-20 md:top-12 md:z-20 md:p-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500">
              {t('badge')}
            </span>
          </div>
          <h2 className="font-space text-3xl font-black text-foreground md:text-5xl">
            {t.rich('title', {
              br: () => <br />
            })}
          </h2>
        </header>

        {/* Linha do Tempo (Apenas Desktop - Decorativo) */}
        <div className="block">
          <div
            className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border"
            aria-hidden="true"
          />
          <div
            className="absolute left-0 top-1/2 h-px w-24 -translate-y-1/2 bg-linear-to-r from-transparent to-blue-500"
            aria-hidden="true"
          />
        </div>

        {/* === ÁREA DE SCROLL DOS CARDS === */}
        <div className="relative z-10 w-full overflow-x-auto snap-x snap-mandatory px-6 pb-12 md:px-0 md:pb-0 md:overflow-visible">
          <motion.ol
            style={!isMobile ? { x } : {}}
            className="flex flex-row gap-12 md:gap-16 md:pl-20 md:pr-20 items-stretch"
          >
            {steps.map((step) => {
              const title = t(`steps.${step.key}.title`);
              const subtitle = t(`steps.${step.key}.subtitle`);
              const desc = t(`steps.${step.key}.description`);

              return (
                <li
                  key={step.id}
                  className="group relative shrink-0 snap-center w-[85vw] max-w-[350px] flex flex-col md:w-auto md:max-w-none md:flex-none"
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

                    {/* Área Visual */}
                    {/* Mantemos flex-1 aqui também para o visual crescer se necessário, alinhando os rodapés */}
                    <div className="relative h-[200px] flex-1 overflow-hidden bg-black/20 md:h-auto">
                      {step.visual}
                    </div>

                    {/* Footer com Conteúdo */}
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

                  {/* Conector Visual (Bolinha na linha) - Desktop */}
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

        {/* Footer info (Apenas Desktop) */}
        <div className="absolute bottom-8 right-8 hidden text-right md:block">
          <p className="font-mono text-xs text-muted-foreground/60">
            {t('scroll_hint')}
          </p>
        </div>
      </div>
    </section>
  );
}
