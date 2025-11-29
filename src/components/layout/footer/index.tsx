'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Components.Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-white/5 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_15px_rgba(var(--color-primary),0.5)]" />

      <div className="container mx-auto px-6 h-14 border-t border-white/5 flex flex-col md:flex-row items-center justify-around md:justify-between">
        <p className="text-xs text-muted-foreground font-mono order-2 md:order-1">
          © {currentYear} CodeSampa.io — {t('rights')}
        </p>

        <div className="flex items-center gap-2 order-1 md:order-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-emerald-500 font-medium">
            All Systems Operational
          </span>
        </div>
      </div>
    </footer>
  );
}
