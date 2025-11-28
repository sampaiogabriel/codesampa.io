'use client';

import { motion } from 'framer-motion';
import {
  Workflow,
  Code2,
  Bug,
  Rocket,
  CheckCircle2,
  Globe
} from 'lucide-react';

export const ArchitectureVisual = () => (
  <div
    className="relative flex h-full w-full items-center justify-center bg-card/50"
    aria-hidden="true"
  >
    <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />
    <motion.div
      className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-950/20"
      animate={{
        boxShadow: [
          '0 0 0 0px rgba(6,182,212,0)',
          '0 0 0 10px rgba(6,182,212,0.1)',
          '0 0 0 0px rgba(6,182,212,0)'
        ]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <Workflow size={40} className="text-cyan-400" />
      {/* Satélites Orbitais */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-4 rounded-full border border-dashed border-cyan-500/20"
      />
    </motion.div>
  </div>
);

export const DevelopmentVisual = () => (
  <div
    className="relative flex h-full w-full flex-col bg-card/50 p-6 font-mono text-xs"
    aria-hidden="true"
  >
    <div className="mb-4 flex gap-2 opacity-50">
      <div className="h-3 w-3 rounded-full bg-red-500/50" />
      <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
      <div className="h-3 w-3 rounded-full bg-green-500/50" />
    </div>
    <div className="space-y-2 opacity-80">
      <p>
        <span className="text-purple-400">export const</span>{' '}
        <span className="text-blue-400">System</span> = () ={'>'} {'{'}
      </p>
      <p className="pl-4">
        <span className="text-purple-400">const</span>{' '}
        <span className="text-yellow-400">performance</span> ={' '}
        <span className="text-green-400">&quot;100%&quot;</span>;
      </p>
      <p className="pl-4">
        <span className="text-purple-400">return</span>{' '}
        <span className="text-blue-400">{'<Scale />'}</span>;
      </p>
      <p>{'}'}</p>
      <motion.div
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="mt-2 h-4 w-2 bg-blue-500"
      />
    </div>
    <div className="absolute bottom-4 right-4 text-blue-500/10">
      <Code2 size={80} />
    </div>
  </div>
);

export const TestingVisual = () => (
  <div
    className="relative flex h-full w-full items-center justify-center bg-card/50"
    aria-hidden="true"
  >
    <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-muted bg-card">
      <Bug size={32} className="text-muted-foreground" />
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-emerald-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
      >
        <CheckCircle2 size={40} className="text-emerald-400 drop-shadow-lg" />
      </motion.div>
    </div>
    {/* Linha de Scanner */}
    <motion.div
      className="absolute h-[2px] w-full bg-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
      animate={{ top: ['10%', '90%', '10%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

export const DeployVisual = () => (
  <div
    className="relative flex h-full w-full items-center justify-center overflow-hidden bg-card/50"
    aria-hidden="true"
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <Globe size={180} className="text-indigo-500/10" />
    </div>
    <motion.div
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative z-10 flex flex-col items-center justify-center gap-2"
    >
      <div className="rounded-2xl bg-indigo-600 p-4 shadow-[0_0_40px_-10px_rgba(79,70,229,0.6)]">
        <Rocket size={32} className="text-white" />
      </div>
      <div className="rounded-full border border-green-500/30 bg-green-900/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-400">
        Deployed
      </div>
    </motion.div>
    {/* Velocity Lines */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-20 w-[1px] bg-gradient-to-b from-transparent via-indigo-500 to-transparent"
        style={{ left: `${30 + i * 20}%` }}
        animate={{ top: ['-20%', '120%'] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.3,
          ease: 'linear'
        }}
      />
    ))}
  </div>
);