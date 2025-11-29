'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { LampContainer } from '@/components/ui/lamp';
import { Link } from '@/lib/i18n/navigation';

export function LampSection() {
  const t = useTranslations('Pages.Home.LampSection');

  return (
    <section>
      <LampContainer>
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          className="relative flex flex-col items-center justify-center w-full px-4 text-center z-50 max-w-4xl mx-auto"
        >
          {/* Título Chamativo com Gradiente */}
          <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl leading-tight">
            {t.rich('title', {
              b: (chunks) => (
                <span className="bg-linear-to-b from-primary to-blue-500 bg-clip-text text-transparent">
                  {chunks}
                </span>
              )
            })}
          </h2>

          {/* Subtítulo Persuasivo */}
          <p className="mt-6 text-base text-slate-300 md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Call to Action Premium */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              className="group relative h-12 rounded-full px-8 text-base font-semibold bg-white text-black hover:bg-slate-200 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              asChild
            >
              <Link href="/contact">
                {t('cta')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Elemento Decorativo Extra (Opcional) */}
          <div className="mt-8 flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest opacity-60">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>High Performance Engineering</span>
            <Sparkles className="w-3 h-3 text-primary" />
          </div>
        </motion.div>
      </LampContainer>
    </section>
  );
}
