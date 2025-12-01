'use client';

import { motion } from 'framer-motion';
import {
  Server,
  Bug,
  Rocket,
  CheckCircle2,
  Database,
  Cloud,
  Layout,
  BrainCircuit,
  Sparkles,
  Zap,
  MousePointer2,
  Palette,
  Code2,
  Bot,
  ShieldCheck,
  Box,
  Cpu,
  RefreshCw,
  Check,
  GitCommitHorizontal,
  Github,
  Globe,
  Workflow
} from 'lucide-react';
import React from 'react';

export const UiUxVisual = () => {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center bg-card/50 font-mono text-xs overflow-hidden"
      aria-hidden="true"
    >
      {/* Background: Grid de Design + Formas Geométricas Flutuantes */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-purple-500)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-purple-500)_1px,transparent_1px)] bg-size-[24px_24px] opacity-5" />

      {/* Formas flutuantes (Vibe Figma/Design) */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-10 h-8 w-8 rounded-full border-2 border-purple-500/20 bg-purple-500/5"
      />
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 left-20 h-6 w-6 rotate-45 border-2 border-pink-500/20 bg-pink-500/5"
      />

      {/* Artboard Central */}
      <div className="relative z-10 h-40 w-60 overflow-hidden rounded-xl border border-purple-500/30 bg-card/80 p-3 shadow-2xl backdrop-blur-sm">
        {/* Header do Artboard */}
        <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-400/50" />
            <div className="h-2 w-2 rounded-full bg-yellow-400/50" />
            <div className="h-2 w-2 rounded-full bg-green-400/50" />
          </div>
          <span className="text-[9px] text-muted-foreground">
            design_system_v2.fig
          </span>
        </div>

        {/* Interface sendo desenhada */}
        <div className="space-y-3">
          {/* Skeleton Header */}
          <div className="flex justify-between items-center">
            <div className="h-2 w-16 rounded bg-muted" />
            <div className="h-4 w-4 rounded-full bg-muted" />
          </div>

          {/* Hero Section com Animação de "Colorir" */}
          <div className="flex gap-3">
            <motion.div
              animate={{
                backgroundColor: [
                  'rgba(168,85,247,0.1)',
                  'rgba(168,85,247,0.4)',
                  'rgba(168,85,247,0.1)'
                ],
                borderColor: [
                  'rgba(168,85,247,0.2)',
                  'rgba(168,85,247,0.8)',
                  'rgba(168,85,247,0.2)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10"
            >
              <Layout size={20} className="text-purple-400" />
            </motion.div>

            <div className="flex-1 space-y-2 py-1">
              <motion.div
                animate={{ width: ['40%', '90%', '40%'] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="h-2 rounded bg-muted"
              />
              <div className="h-2 w-3/4 rounded bg-muted/50" />

              {/* Botão CTA interagindo */}
              <motion.div
                animate={{
                  scale: [1, 0.95, 1],
                  backgroundColor: [
                    'var(--color-muted)',
                    'var(--color-purple-500)',
                    'var(--color-muted)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  times: [0, 0.5, 1]
                }}
                className="mt-2 h-5 w-20 rounded bg-muted flex items-center justify-center"
              >
                <span className="text-[8px] text-white opacity-0 animate-[fadeIn_3s_infinite]">
                  Hire Me
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Cursor Animado - Simula o Designer clicando */}
        <motion.div
          className="absolute z-20"
          animate={{
            x: [60, 140, 140, 60],
            y: [80, 100, 100, 80]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <MousePointer2
            size={24}
            className="fill-purple-500 text-purple-100 drop-shadow-lg"
          />
          {/* Efeito de Clique (Ripple) */}
          <motion.div
            animate={{ scale: [0, 1.5], opacity: [1, 0] }}
            transition={{ duration: 3, repeat: Infinity, times: [0.4, 0.8] }} // Sincronizado com o movimento
            className="absolute -left-2 -top-2 h-10 w-10 rounded-full border-2 border-purple-500"
          />
        </motion.div>
      </div>

      {/* Ícone de Fundo Decorativo (Substituindo Layers por Palette) */}
      <div className="absolute bottom-4 right-4 text-purple-500/10 rotate-12">
        <Palette size={100} />
      </div>
    </div>
  );
};

export const FrontendVisual = () => (
  <div
    className="relative flex h-full w-full flex-col items-center justify-center bg-card/50 p-6 font-mono text-xs overflow-hidden"
    aria-hidden="true"
  >
    {/* 1. Background Grid (Blue for React/Tech) */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-blue-500)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-blue-500)_1px,transparent_1px)] bg-size-[24px_24px] opacity-10" />

    {/* Ícone de Fundo Gigante (Decorativo) */}
    <motion.div
      animate={{ rotate: [0, 5, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -right-10 -top-10 text-blue-500/5"
    >
      <Code2 size={200} />
    </motion.div>

    {/* 2. Janela do Editor de Código */}
    <div className="relative z-10 w-full max-w-[320px] rounded-xl border border-blue-500/30 bg-card/80 shadow-2xl backdrop-blur-md">
      {/* Header da Janela */}
      <div className="flex items-center justify-between border-b border-blue-500/20 px-4 py-2">
        <div className="flex gap-1.5 opacity-60">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-1.5 opacity-50">
          <Code2 size={10} className="text-blue-400" />
          <span className="text-[10px] text-blue-100/70">page.tsx</span>
        </div>
      </div>

      {/* Conteúdo do Código Simplificado */}
      <div className="p-4 text-[10px] sm:text-xs leading-relaxed opacity-90">
        <div className="flex gap-3">
          {/* Números das linhas */}
          <div className="flex flex-col text-right text-muted-foreground/30 select-none">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
          </div>

          {/* Código "Hello World" */}
          <div className="flex flex-col">
            <p>
              <span className="text-purple-400">export default</span>{' '}
              <span className="text-blue-400">function</span>{' '}
              <span className="text-yellow-400">App</span>() {'{'}
            </p>
            <p className="pl-2">
              <span className="text-purple-400">return</span> (
            </p>
            <p className="pl-5">
              <span className="text-blue-300">{'<div>'}</span>
            </p>
            <p className="pl-7">
              <span className="text-white">Hello World</span>
            </p>
            <p className="pl-5">
              <span className="text-blue-300">{'</div>'}</span>
            </p>
            <div className="flex items-center">
              <p className="pl-2">);</p>
              <p className="ml-1">{'}'}</p>

              {/* Cursor Piscando */}
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1 h-3 w-1.5 bg-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Badge de Fast Refresh */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.8, 1, 1, 0.9],
          y: [10, 0, 0, -5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          times: [0, 0.1, 0.8, 1],
          delay: 1
        }}
        className="absolute -right-2 -bottom-4 flex items-center gap-1 rounded-full border border-green-500/30 bg-green-950/80 px-2 py-1 backdrop-blur-xl"
      >
        <Zap size={10} className="text-green-400 fill-green-400" />
        <span className="text-[9px] font-bold text-green-300">
          Fast Refresh
        </span>
      </motion.div>
    </div>

    {/* Elementos Flutuantes (Blocos de Componentes) */}
    <div className="absolute bottom-6 left-6 flex gap-2">
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="h-6 w-8 rounded border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm"
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  </div>
);

export const BackendVisual = () => (
  <div
    className="relative flex h-full w-full flex-col items-center justify-center bg-card/50 p-6 font-mono text-xs overflow-hidden"
    aria-hidden="true"
  >
    {/* 1. Background Grid (Green for Node.js/Backend) */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-green-500)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-green-500)_1px,transparent_1px)] bg-size-[24px_24px] opacity-10" />

    {/* Ícone de Fundo Gigante (Decorativo) */}
    <motion.div
      animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.1, 0.05] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -left-10 -bottom-10 text-green-500/10"
    >
      <Server size={200} />
    </motion.div>

    {/* 2. Janela do Terminal (Simulando Server Logs) */}
    <div className="relative z-10 w-full max-w-[320px] rounded-xl border border-green-500/30 bg-black/90 shadow-2xl backdrop-blur-md">
      {/* Header da Janela */}
      <div className="flex items-center justify-between border-b border-green-500/20 px-4 py-2 bg-white/5">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-green-100/70">server_logs.sh</span>
        </div>
        <div className="flex gap-1.5 opacity-50">
          <div className="h-1.5 w-1.5 rounded-full bg-white" />
          <div className="h-1.5 w-1.5 rounded-full bg-white" />
        </div>
      </div>

      {/* Conteúdo dos Logs */}
      <div className="p-4 space-y-2 text-[10px] sm:text-xs text-green-300 font-mono leading-relaxed">
        <div className="flex gap-2 opacity-50">
          <span className="text-green-600">$</span>
          <span>npm start:prod</span>
        </div>
        <div className="pb-2 border-b border-green-500/10">
          <span className="text-green-500">✔</span> Ready on{' '}
          <span className="text-yellow-400">0.0.0.0:3000</span>
        </div>

        {/* Logs "Ao Vivo" Animados */}
        <div className="space-y-1.5 pt-1">
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-blue-400 font-bold">[GET]</span>
            <span className="flex-1 opacity-80">/api/v1/users</span>
            <span className="text-green-500">200 OK</span>
            <span className="text-[9px] text-muted-foreground">12ms</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4, delay: 1.5, repeat: Infinity }}
          >
            <span className="text-yellow-400 font-bold">[POST]</span>
            <span className="flex-1 opacity-80">/auth/login</span>
            <span className="text-green-500">201 Created</span>
            <span className="text-[9px] text-muted-foreground">45ms</span>
          </motion.div>

          {/* Cursor piscando na última linha */}
          <div className="flex items-center gap-1 mt-2 opacity-50">
            <span>{'>'}</span>
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="h-3 w-1.5 bg-green-500"
            />
          </div>
        </div>
      </div>
    </div>

    {/* 3. Banco de Dados Flutuante (Conectado) */}
    <motion.div
      className="absolute right-1 top-12 z-20 flex flex-col items-center gap-1"
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="rounded-xl border border-green-500/40 bg-card/90 p-2.5 shadow-xl backdrop-blur-sm">
        <Database size={20} className="text-green-400" />
      </div>
      {/* Badge SQL */}
      <span className="rounded bg-green-950/50 px-1.5 py-0.5 text-[8px] font-bold text-green-300 border border-green-500/20">
        Postgres
      </span>
    </motion.div>

    {/* Partículas de Dados (Data Flow) */}
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-green-400"
          style={{ left: '50%', top: '50%' }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </div>
  </div>
);

export const AiVisual = () => {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center bg-card/50 p-6 font-mono text-xs overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Background Grid (Cyan/Electric for AI) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-cyan-500)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-cyan-500)_1px,transparent_1px)] bg-size-[24px_24px] opacity-10" />

      {/* Ícone de Fundo Gigante (Decorativo) */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-10 -bottom-10 text-cyan-500/10"
      >
        <BrainCircuit size={200} />
      </motion.div>

      {/* 2. Janela de Monitoramento de IA (Estilo Glassmorphism) */}
      <div className="relative z-10 w-full max-w-[320px] rounded-xl border border-cyan-500/30 bg-black/80 shadow-2xl backdrop-blur-md">
        {/* Header da Janela */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 px-4 py-2 bg-cyan-950/30">
          <div className="flex items-center gap-2">
            <Bot size={12} className="text-cyan-400" />
            <span className="text-[10px] text-cyan-100/70">
              inference_engine.ts
            </span>
          </div>
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-500/50" />
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-500/50" />
          </div>
        </div>

        {/* Conteúdo: Rede Neural Simplificada + Processamento */}
        <div className="p-4 space-y-4">
          {/* Visualização de Camadas (Layers) */}
          <div className="flex justify-between items-center px-4 py-2 bg-cyan-500/5 rounded-lg border border-cyan-500/10">
            {/* Layer 1 (Input) */}
            <div className="flex flex-col gap-1.5">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-cyan-600"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity
                  }}
                />
              ))}
            </div>
            {/* Conexões (Linhas sugeridas) */}
            <div className="flex-1 border-t border-dashed border-cyan-500/20 mx-2" />

            {/* Layer 2 (Hidden - Pulsante) */}
            <div className="flex flex-col gap-1.5">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </div>

            <div className="flex-1 border-t border-dashed border-cyan-500/20 mx-2" />

            {/* Layer 3 (Output) */}
            <div className="flex flex-col gap-1.5">
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-cyan-600"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    delay: 1 + i * 0.2,
                    repeat: Infinity
                  }}
                />
              ))}
            </div>
          </div>

          {/* Simulação de Streaming de Texto (LLM) */}
          <div className="space-y-1.5">
            <div className="text-[9px] text-cyan-500/50 uppercase tracking-wider">
              Output Stream
            </div>
            <div className="rounded bg-cyan-950/50 p-2 border border-cyan-500/10 flex items-center gap-2">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 animate-pulse" />
              <div className="w-full space-y-1">
                <motion.div
                  className="h-1 w-3/4 rounded bg-cyan-400/40"
                  animate={{ width: ['0%', '80%'] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                />
                <motion.div
                  className="h-1 w-1/2 rounded bg-cyan-400/30"
                  animate={{ width: ['0%', '50%'] }}
                  transition={{
                    duration: 2,
                    delay: 0.5,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badge Flutuante "AI Accelerated" */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-3 bottom-1 z-20 flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-950/80 px-3 py-1 backdrop-blur-md shadow-lg"
      >
        <Zap size={10} className="text-yellow-400 fill-yellow-400" />
        <span className="text-[9px] font-bold text-yellow-300 uppercase tracking-wider">
          AI Accelerated
        </span>
      </motion.div>

      {/* Tokens Flutuantes (Decorativo) */}
      <div className="absolute inset-0 pointer-events-none">
        {['01', 'TOKEN', 'CTX', '10'].map((text, i) => (
          <motion.div
            key={i}
            className="absolute text-[8px] text-cyan-300/30 font-mono select-none"
            style={{ left: `${15 + i * 25}%`, top: `${70 + (i % 2) * 15}%` }}
            animate={{ y: [-30, -50], opacity: [0, 1, 0] }}
            transition={{ duration: 3, delay: i * 0.8, repeat: Infinity }}
          >
            {text}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const QaVisual = () => {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center bg-card/50 p-6 font-mono text-xs overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Background Grid (Emerald for Success/QA) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-emerald-500)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-emerald-500)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />

      {/* Ícone de Fundo Gigante (Decorativo) */}
      <motion.div
        animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-10 -top-10 text-emerald-500/10"
      >
        <ShieldCheck size={200} />
      </motion.div>

      {/* 2. O Scanner Holográfico Central */}
      <div className="relative z-10 flex h-40 w-40 items-center justify-center">
        {/* Anéis do Radar */}
        <div className="absolute inset-0 rounded-full border border-emerald-500/20" />
        <motion.div
          className="absolute inset-4 rounded-full border border-emerald-500/30 border-dashed"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-8 rounded-full border border-emerald-500/10"
          animate={{ scale: [1, 0.9, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* O BUG sendo escaneado */}
        <div className="relative z-20 flex items-center justify-center h-16 w-16 bg-black/50 rounded-lg backdrop-blur-sm border border-emerald-500/30 overflow-hidden">
          {/* Ciclo: Bug Aparece -> Scan -> Check de Sucesso */}

          {/* Ícone do BUG (Fica vermelho e treme antes de sumir) */}
          <motion.div
            className="absolute text-red-400"
            animate={{
              opacity: [0, 1, 1, 0, 0],
              scale: [0.5, 1, 1.1, 0, 0],
              x: [0, 0, 2, -2, 0] // Treme
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              times: [0, 0.1, 0.4, 0.5, 1]
            }}
          >
            <Bug size={32} />
          </motion.div>

          {/* Ícone do CHECK (Aparece depois do Bug sumir) */}
          <motion.div
            className="absolute text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
            animate={{
              opacity: [0, 0, 0, 1, 0],
              scale: [0, 0, 0, 1.2, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              times: [0, 0.4, 0.5, 0.6, 1]
            }}
          >
            <ShieldCheck size={36} />
          </motion.div>

          {/* Feixe de Laser do Scanner (Vertical) */}
          <motion.div
            className="absolute w-full h-[2px] bg-emerald-400 shadow-[0_0_15px_#34d399]"
            animate={{ top: ['-10%', '110%', '-10%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Efeito de Radar (Varredura Circular) */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-emerald-500/10 to-transparent"
          style={{ transformOrigin: 'center' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* 3. Painel de Status Flutuante */}
      <div className="absolute bottom-8 flex gap-3">
        {/* Badge Cypress */}
        <motion.div
          className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/50 px-3 py-1 backdrop-blur-sm"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-bold text-emerald-300">CYPRESS</span>
        </motion.div>

        {/* Badge Coverage */}
        <motion.div
          className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/50 px-3 py-1 backdrop-blur-sm"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-bold text-emerald-300">
            100% COVERAGE
          </span>
        </motion.div>
      </div>

      {/* 4. Matriz de Testes (Pontinhos ao fundo que ficam verdes) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 opacity-50">
        {[...Array(5)].map((_, row) => (
          <div key={row} className="flex gap-1.5">
            {[...Array(3)].map((_, col) => (
              <motion.div
                key={`${row}-${col}`}
                className="h-1 w-1 rounded-full bg-muted-foreground/30"
                animate={{ backgroundColor: ['#334155', '#10b981', '#334155'] }} // Slate -> Emerald -> Slate
                transition={{
                  duration: 2,
                  delay: Math.random() * 2,
                  repeat: Infinity
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const DevOpsVisual = () => {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center bg-card/50 p-6 font-mono text-xs overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Background Grid (Indigo) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-indigo-500)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-indigo-500)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />

      {/* Ícone Decorativo de Fundo */}
      <motion.div
        animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.02, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -right-10 -bottom-10 text-indigo-500/10"
      >
        <Workflow size={200} />
      </motion.div>

      {/* 2. O Pipeline Principal */}
      <div className="relative z-10 flex w-full max-w-[320px] items-center justify-between gap-2">
        {/* --- ESTÁGIO 1: SOURCE (GITHUB) --- */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-indigo-500/30 bg-black/80 shadow-lg backdrop-blur-md">
            <Github size={32} className="text-white" />
            {/* Badge de Commit saindo */}
            <motion.div
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 border border-white/20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <GitCommitHorizontal size={12} className="text-white" />
            </motion.div>
          </div>
          <div className="text-[9px] font-bold text-indigo-300 tracking-wider">
            GITHUB
          </div>
        </div>

        {/* --- ESTÁGIO 2: O CANAL CI/CD (Conexão) --- */}
        <div className="relative flex-1 h-2 bg-indigo-950/50 rounded-full overflow-hidden border border-indigo-500/20">
          {/* Barra de Progresso Animada */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-indigo-500/50 blur-[2px]"
            animate={{
              width: ['0%', '100%', '0%'],
              x: ['-100%', '0%', '100%']
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Packet de Dados Viajando */}
          <motion.div
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_white]"
            animate={{ left: ['10%', '90%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Rastro do packet */}
            <motion.div className="absolute right-0 top-1/2 h-1 w-10 -translate-y-1/2 -translate-x-full bg-gradient-to-l from-white to-transparent opacity-50" />
          </motion.div>

          {/* Badges de Status Flutuando sobre o Pipeline */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1">
            <motion.div
              className="flex items-center gap-1 rounded bg-green-500/20 px-1.5 py-0.5 border border-green-500/30"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: [0, 1, 1, 0], y: [5, 0, 0, -5] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                times: [0.3, 0.4, 0.6, 0.7]
              }}
            >
              <Check size={8} className="text-green-400" />
              <span className="text-[7px] font-bold text-green-300">BUILD</span>
            </motion.div>
          </div>
        </div>

        {/* --- ESTÁGIO 3: INFRA (AWS) --- */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-orange-500/30 bg-black/80 shadow-lg backdrop-blur-md">
            <Cloud size={32} className="text-orange-400" />
            {/* Indicador de Status "Online" */}
            <motion.div
              className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-green-500 border-2 border-black"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <div className="text-[9px] font-bold text-orange-300 tracking-wider">
            AWS PROD
          </div>
        </div>
      </div>

      {/* 3. Painel de Detalhes da Infraestrutura (Abaixo) */}
      <motion.div
        className="mt-6 flex w-full max-w-[280px] flex-col gap-2 rounded-lg border border-indigo-500/20 bg-indigo-950/30 p-3 backdrop-blur-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex justify-between items-center border-b border-indigo-500/10 pb-1 mb-1">
          <span className="flex items-center gap-1 text-[9px] text-indigo-300">
            <Globe size={10} /> us-east-1
          </span>
          <span className="text-[9px] text-green-400 font-bold">ACTIVE</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <Server size={12} className="text-indigo-400" />
            <div className="flex flex-col">
              <span className="text-[9px] text-indigo-200">t3.micro</span>
              <span className="text-[7px] text-indigo-400/60">10.0.1.24</span>
            </div>
          </div>

          {/* Gráfico de CPU Miniatura */}
          <div className="flex items-end gap-0.5 h-4">
            {[40, 70, 50, 90, 60].map((h, i) => (
              <motion.div
                key={i}
                className="w-1 bg-indigo-500/60 rounded-t-sm"
                animate={{ height: `${h}%` }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
