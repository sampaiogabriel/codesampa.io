'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Home, Terminal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFoundContent() {
  const t = useTranslations('Pages.NotFound');

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-foreground">
      {/* Background Grid com efeito de erro */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-size-[32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

      {/* Glitch Effect Overlay (opcional, CSS puro ou framer) */}
      <div className="absolute inset-0 bg-red-500/5 pointer-events-none mix-blend-overlay animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Ícone de Erro Animado */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mb-6 relative"
        >
          <div className="absolute -inset-4 bg-red-500/20 blur-xl rounded-full animate-pulse" />
          <AlertTriangle size={80} className="text-red-500 relative z-10" />
        </motion.div>

        {/* Código de Erro Grande */}
        <h1
          aria-label="Page not found"
          className="font-space font-black text-8xl md:text-9xl text-transparent bg-clip-text bg-linear-to-b from-white to-white/10 tracking-tighter mb-2"
        >
          404
        </h1>

        {/* Mensagem de Terminal */}
        <div className="font-mono text-sm md:text-base text-red-400 mb-6 bg-red-950/30 border border-red-900/50 px-4 py-2 rounded-md">
          Error: Module &apos;Page&apos; not found in /universe
        </div>

        <p className="text-muted-foreground max-w-md text-lg mb-8">
          {t('description')}
        </p>

        {/* Botão de Retorno */}
        <Button
          size="lg"
          className="group relative h-12 px-8 bg-white text-black hover:bg-slate-200 rounded-full font-bold transition-all hover:scale-105"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            <Home size={18} />
            <span>{t('cta')}</span>
          </Link>
        </Button>
      </div>

      {/* Rodapé Técnico Decorativo */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
          System Failure • Code: 0x404 • Critical
        </p>
      </div>
    </section>
  );
}
