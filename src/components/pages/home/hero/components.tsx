'use client';

import { motion } from 'framer-motion';

// --- Floating Symbol (Independent Animation) ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FloatingSymbol = ({ item }: { item: any }) => {
  return (
    <motion.div
      style={{ top: item.top, left: item.left }}
      className={`absolute z-0 select-none font-mono font-bold ${item.size} ${item.color} pointer-events-none opacity-20`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4 + item.depth, 
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {item.char}
    </motion.div>
  );
};
