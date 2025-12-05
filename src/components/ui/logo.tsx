// src/components/ui/logo.tsx

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import LogoSvg from '@/assets/logo/codesampa-io.svg';
import { cn } from '@/utils/functions/tw-merge';

interface LogoProps {
  width?: number;
  showText?: boolean;
  className?: string;
}

export const Logo = ({
  width = 32,
  showText = false,
  className
}: LogoProps) => {
  return (
    <motion.div
      className={cn(
        'flex items-center gap-2 cursor-pointer select-none',
        className
      )}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.div
        variants={{
          rest: { scale: 1, rotate: 0 },
          hover: {
            scale: 1.1,
            rotate: 180,
            transition: { type: 'spring', stiffness: 260, damping: 20 }
          },
          tap: { scale: 0.9 }
        }}
      >
        <Image
          src={LogoSvg}
          alt="codesampa.io logo"
          width={width}
          height={width}
          priority
        />
      </motion.div>

      {showText && (
        <div className="overflow-hidden">
          <motion.span
            className="block font-space font-bold tracking-tight text-foreground whitespace-nowrap"
            style={{ fontSize: Math.max(16, width * 0.6) }}
            variants={{
              rest: { y: 0, opacity: 1 },
              hover: {
                y: -2,
                color: 'var(--color-primary)',
                transition: { duration: 0.2 }
              }
            }}
          >
            <span className="relative">
              codesampa.io
              {/* Underline animado */}
              <motion.span
                className="absolute left-0 bottom-0 h-px w-full bg-primary origin-left"
                variants={{
                  rest: { scaleX: 0 },
                  hover: { scaleX: 1, transition: { duration: 0.3 } }
                }}
              />
            </span>
          </motion.span>
        </div>
      )}
    </motion.div>
  );
};
