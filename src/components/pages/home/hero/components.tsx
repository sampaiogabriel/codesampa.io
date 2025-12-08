'use client';

import { motion } from 'framer-motion';

export const FloatingSymbol = ({
  item,
  index
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  index: number;
}) => {
  return (
    <motion.div
      style={{
        top: item.top,
        left: item.left,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
      className={`absolute z-0 select-none font-mono font-bold ${item.size} ${item.color} pointer-events-none`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}
    >
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4 + item.depth,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ willChange: 'transform' }}
      >
        {item.char}
      </motion.div>
    </motion.div>
  );
};
