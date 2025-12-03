'use client';

import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export function Newsletter() {
  const t = useTranslations('Pages.Home.Newsletter');

  return (
    <section className="relative w-full py-24 bg-background border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-space font-bold text-foreground mb-6 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl">
            {t('description')}
          </p>

          <form
            className="flex flex-col sm:flex-row w-full max-w-md gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative flex-1 group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-primary/50 to-purple-600/50 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
              <input
                type="email"
                placeholder={t('placeholder')}
                className="relative w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>
            <Button size="lg" className="rounded-lg font-semibold shrink-0">
              {t('button')} <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground/60">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </section>
  );
}
