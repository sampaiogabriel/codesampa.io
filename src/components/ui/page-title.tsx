'use client';

import { motion, Variants } from 'framer-motion';
import React from 'react';

import { cn } from '@/utils/functions/tw-merge';

// Mapeamento de cores para garantir que o Tailwind gere as classes corretas
const badgeStyles = {
  blue: {
    container: 'border-blue-500/20 bg-blue-500/5 text-blue-500',
    ping: 'bg-blue-400',
    dot: 'bg-blue-500'
  },
  emerald: {
    container: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500',
    ping: 'bg-emerald-400',
    dot: 'bg-emerald-500'
  },
  purple: {
    container: 'border-purple-500/20 bg-purple-500/5 text-purple-500',
    ping: 'bg-purple-400',
    dot: 'bg-purple-500'
  },
  primary: {
    container: 'border-primary/20 bg-primary/5 text-primary',
    ping: 'bg-primary/80',
    dot: 'bg-primary'
  }
};

type BadgeColor = keyof typeof badgeStyles;

interface PageTitleProps {
  badge?: string;
  badgeColor?: BadgeColor;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
  align?: 'center' | 'left';
}

export function PageTitle({
  badge,
  badgeColor = 'blue',
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

  const currentStyle = badgeStyles[badgeColor] || badgeStyles.blue;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
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
          className={cn(
            'mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5',
            currentStyle.container
          )}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={cn(
                'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                currentStyle.ping
              )}
            />
            <span
              className={cn(
                'relative inline-flex h-2.5 w-2.5 rounded-full',
                currentStyle.dot
              )}
            />
          </span>
          <span className="text-xs font-bold uppercase tracking-widest">
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
