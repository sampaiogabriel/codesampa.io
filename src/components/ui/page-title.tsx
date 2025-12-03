'use client';

import { motion, Variants } from 'framer-motion'; // <--- Importe Variants
import React from 'react';

import { AnimatedBadge } from '@/components/ui/animated-badge';
import { cn } from '@/utils/functions/tw-merge';

interface PageTitleProps {
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
  align?: 'center' | 'left';
}

export function PageTitle({
  badge,
  title,
  subtitle,
  className,
  align = 'center'
}: PageTitleProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: '-100px' }}
      variants={containerVariants}
      className={cn(
        'flex flex-col mb-12 md:mb-16',
        align === 'center'
          ? 'items-center text-center'
          : 'items-start text-left',
        className
      )}
    >
      {badge && (
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500">
            {badge}
          </span>
        </motion.div>
      )}

      <motion.h1
        variants={itemVariants}
        className="font-space text-4xl font-black text-foreground md:text-6xl leading-tight tracking-tight mb-6 max-w-4xl"
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
