'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/utils/functions/tw-merge';

import {
  SystemDevVisual,
  LandingPageVisual,
  AiIntegrationVisual
} from './service-visuals';

export function ServicesSection() {
  const t = useTranslations('Pages.Home.Services');

  const services = [
    {
      key: 'systems',
      visual: <SystemDevVisual />,
      accent: 'blue',
      delay: 0
    },
    {
      key: 'landing',
      visual: <LandingPageVisual />,
      accent: 'emerald',
      delay: 0.1
    },
    {
      key: 'ai',
      visual: <AiIntegrationVisual />,
      accent: 'purple',
      delay: 0.2
    }
  ];

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header da Seção */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              {t('badge')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black font-space mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => {
            const title = t(`cards.${service.key}.title`);
            const desc = t(`cards.${service.key}.description`);

            // ATUALIZADO: Agora busca 5 features para mostrar a expertise em Micro-frontends
            const features = [
              t(`cards.${service.key}.feature1`),
              t(`cards.${service.key}.feature2`),
              t(`cards.${service.key}.feature3`),
              t(`cards.${service.key}.feature4`),
              t(`cards.${service.key}.feature5`)
            ];

            const colorMap: Record<string, string> = {
              blue: 'group-hover:border-blue-500/50 hover:shadow-blue-500/10',
              emerald:
                'group-hover:border-emerald-500/50 hover:shadow-emerald-500/10',
              purple:
                'group-hover:border-purple-500/50 hover:shadow-purple-500/10'
            };

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: service.delay }}
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:shadow-2xl hover:-translate-y-2',
                  colorMap[service.accent]
                )}
              >
                {/* Visual Header */}
                <div className="h-48 w-full border-b border-border bg-muted/20 relative overflow-hidden">
                  {service.visual}
                </div>

                {/* Conteúdo */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-bold font-space mb-3">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {desc}
                  </p>

                  {/* Lista de Features Expandida (5 itens) */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm font-medium text-foreground/80"
                      >
                        <CheckCircle2
                          size={16}
                          className={cn(
                            'mt-0.5 shrink-0',
                            `text-${service.accent}-500`
                          )}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <button
                      className={cn(
                        'flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition-colors',
                        `text-${service.accent}-500 group-hover:text-${service.accent}-400`
                      )}
                    >
                      {t('cta_card')} <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
