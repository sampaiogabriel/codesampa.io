'use client';

import { motion } from 'framer-motion';

// --- Floating Symbol ---
// Atualizado para aceitar 'index' e controlar a entrada separada da flutuação

export const FloatingSymbol = ({
  item,
  index
}: {
  item: any;
  index: number;
}) => {
  return (
    <motion.div
      // 1. Configuração de Posicionamento e Entrada (Surgimento)
      style={{ top: item.top, left: item.left }}
      className={`absolute z-0 select-none font-mono font-bold ${item.size} ${item.color} pointer-events-none`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.3,
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
      >
        {item.char}
      </motion.div>
    </motion.div>
  );
};
