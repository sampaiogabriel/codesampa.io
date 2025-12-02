'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Rocket, Code2, ShieldCheck, Zap, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRef } from 'react';

export function OrbitalContactSection() {
  const t = useTranslations('Pages.Home.OrbitalContact');
  const ref = useRef<HTMLDivElement>(null);

  // Lógica magnética para o botão central
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - left - width / 2;
    const yPos = e.clientY - top - height / 2;
    x.set(xPos * 0.3); // Fator de movimento
    y.set(yPos * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-background py-24">
      {/* Background Grid Sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container relative z-10 flex flex-col items-center">
        {/* === SISTEMA ORBITAL === */}
        <div className="relative flex h-[400px] w-[400px] items-center justify-center md:h-[500px] md:w-[500px]">
          {/* Órbita Externa (Lenta) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute h-[100%] w-[100%] rounded-full border border-primary/10"
          >
            {/* Satélite 1 */}
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 rounded-full bg-background border border-border p-2 shadow-lg">
              <ShieldCheck size={16} className="text-muted-foreground" />
            </div>
            {/* Satélite 2 */}
            <div className="absolute top-1/2 -right-3 -translate-y-1/2 rounded-full bg-background border border-border p-2 shadow-lg">
              <Code2 size={16} className="text-muted-foreground" />
            </div>
          </motion.div>

          {/* Órbita Média (Média) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute h-[70%] w-[70%] rounded-full border border-primary/20 border-dashed"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-background border border-primary/30 p-2 shadow-[0_0_15px_rgba(var(--color-primary),0.3)]">
              <Zap size={20} className="text-primary" />
            </div>
          </motion.div>

          {/* Órbita Interna (Rápida) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute h-[45%] w-[45%] rounded-full border border-primary/10"
          >
            <div className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-primary animate-ping" />
          </motion.div>

          {/* === NÚCLEO (BOTÃO MAGNÉTICO) === */}
          <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseXSpring, y: mouseYSpring }}
            className="relative z-20"
          >
            {/* Glow do Núcleo */}
            <div className="absolute inset-0 -z-10 bg-primary/20 blur-[60px] rounded-full" />

            <Link
              href="/contact"
              className="group relative flex h-32 w-32 flex-col items-center justify-center gap-1 rounded-full border-2 border-primary/20 bg-background/50 backdrop-blur-md transition-all hover:scale-110 hover:border-primary hover:bg-primary/10 md:h-40 md:w-40"
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>

              <span className="mt-2 text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-primary">
                {t('cta')}
              </span>

              <span className="text-[10px] text-muted-foreground uppercase tracking-tighter opacity-70">
                {t('cta_sub')}
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Texto de Apoio (Abaixo) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center max-w-lg"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-space mb-2">
            {t.rich('title', {
              highlight: (chunks) => (
                <span className="text-primary">{chunks}</span>
              )
            })}
          </h2>
          <p className="text-muted-foreground">{t('description')}</p>
        </motion.div>
      </div>
    </section>
  );
}
