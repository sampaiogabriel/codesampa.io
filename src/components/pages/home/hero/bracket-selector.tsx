'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface BracketSelectorProps {
  text: string;
  onToggle: () => void;
}

export function BracketSelector({ text, onToggle }: BracketSelectorProps) {
  return (
    <button
      onClick={onToggle}
      className="group relative inline-flex items-center justify-center gap-2 sm:gap-4 md:gap-6 outline-none select-none py-2 cursor-pointer z-20 max-w-full"
    >
      {/* Bracket Esquerdo */}
      <span className="font-mono font-light text-3xl sm:text-5xl md:text-7xl text-muted-foreground/40 group-hover:text-primary group-hover:-translate-x-2 transition-all duration-300 ease-out">
        &lt;
      </span>

      {/* Texto Central */}
      <div className="relative min-w-[200px] text-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={text}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.3 }}
            className="block font-space font-black tracking-tight bg-linear-to-r from-primary via-blue-300 to-violet-600 bg-clip-text text-transparent pb-2 whitespace-nowrap text-6xl md:text-7xl"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bracket Direito */}
      <span className="font-mono font-light text-3xl sm:text-5xl md:text-7xl text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300 ease-out">
        &gt;
      </span>
    </button>
  );
}
