'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { cn } from '@/utils/functions/tw-merge';

export function ManifestoSection() {
  const t = useTranslations('Pages.Home.Manifesto');
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.4', 'end 0.5']
  });

  // Texto dividido em palavras para animação individual
  const words = t('text').split(' ');

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center bg-background py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Badge Centralizado */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {t('badge')}
              </span>
            </motion.div>
          </div>

          <h2 className="flex flex-wrap justify-center gap-x-2 gap-y-1 md:gap-x-3 md:gap-y-2 text-2xl md:text-4xl font-bold font-space leading-snug text-center">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;

              return (
                <Word key={i} range={[start, end]} progress={scrollYProgress}>
                  {word}
                </Word>
              );
            })}
          </h2>
        </div>
      </div>
    </section>
  );
}

// Componente Auxiliar para cada Palavra
const Word = ({
  children,
  range,
  progress
}: {
  children: string;
  range: [number, number];
  progress: any;
}) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [10, 0]); // Sutil movimento vertical

  // Verifica se é uma palavra de destaque
  const isHighlight = children.includes('*');
  const text = children.replace(/\*/g, ''); // Remove asteriscos

  return (
    <span className="relative inline-block">
      <motion.span
        style={{ opacity, y }}
        className={cn(
          'transition-colors duration-200',
          isHighlight ? 'text-primary font-black' : 'text-foreground'
        )}
      >
        {text}
      </motion.span>
    </span>
  );
};
