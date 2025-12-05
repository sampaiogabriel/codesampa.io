'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Code, Eye, FileCode, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

import { cn } from '@/utils/functions/tw-merge';

import {
  AnalyticsView,
  CRMView,
  ChatView,
  DesktopSidebar,
  ResponsiveHeader,
  FeatureType
} from './components';

// --- SNIPPETS DE CÓDIGO ---
const CODE_SNIPPETS: Record<FeatureType, string> = {
  analytics: `// src/components/analytics/revenue-chart.tsx
import { useQuery } from '@tanstack/react-query';
import { BarChart, Card } from '@ui/kits';

export function RevenueChart() {
  const { data, isLoading } = useQuery({
    queryKey: ['revenue_metrics'],
    queryFn: fetchRevenueData,
    refetchInterval: 5000 // Real-time
  });

  if (isLoading) return <Skeleton className="h-64" />;

  return (
    <Card className="p-6 bg-card/50 backdrop-blur">
      <div className="flex justify-between mb-6">
        <h3 className="font-bold text-white">Revenue Trend</h3>
        <Badge variant="success">+{data.growth}%</Badge>
      </div>
      
      <BarChart 
        data={data.history}
        color="primary"
        animate={true}
        height={300}
      />
    </Card>
  );
}`,
  crm: `// src/features/crm/kanban-board.tsx
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useCRMStore } from '@/stores/crm';

export const KanbanBoard = () => {
  const { deals, updateStatus } = useCRMStore();

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    
    // Otimistic UI Update
    updateStatus(result.draggableId, result.destination.droppableId);
    
    // Sync with Server
    await api.deals.move({
      id: result.draggableId,
      status: result.destination.droppableId
    });
  };

  return (
    <div className="flex gap-4 h-full overflow-x-auto p-4">
      {Object.entries(deals).map(([status, items]) => (
        <KanbanColumn 
          key={status} 
          status={status} 
          items={items} 
        />
      ))}
    </div>
  );
}`,
  chat: `// src/lib/sockets/chat-client.ts
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

export function useRealtimeChat(channelId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL, {
      auth: { token: session.token }
    });

    socket.emit('join_channel', channelId);

    socket.on('new_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
      playNotificationSound();
    });

    socket.on('user_typing', (user) => {
      if (user.id !== currentUser.id) setIsTyping(true);
    });

    return () => socket.disconnect();
  }, [channelId]);

  return { messages, isTyping, sendMessage: socket.emit };
}`
};

interface DesktopMockProps {
  startAnimation: boolean;
  activeFeature: FeatureType;
  setFeature: (f: FeatureType) => void;
  setIsInteractionPaused: (paused: boolean) => void;
}

export function DesktopMock({
  startAnimation,
  activeFeature,
  setFeature,
  setIsInteractionPaused
}: DesktopMockProps) {
  const [isXRay, setIsXRay] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsInteractionPaused(isXRay);
  }, [isXRay, setIsInteractionPaused]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeFeature]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Função auxiliar para escapar HTML e aplicar cores
  const processCodeLine = (line: string) => {
    let safeLine = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    safeLine = safeLine.replace(
      /(\/\/.*$)/g,
      '<span class="text-slate-500 italic">$1</span>'
    );

    if (safeLine.startsWith('<span class="text-slate-500')) {
      return safeLine;
    }

    safeLine = safeLine.replace(
      /\b(import|export|from|return|if|const|function|async|await)\b/g,
      '<span class="text-purple-400">$1</span>'
    );

    safeLine = safeLine.replace(
      /('.*?')/g,
      '<span class="text-green-400">$1</span>'
    );

    safeLine = safeLine.replace(
      /(&lt;\/?[a-zA-Z0-9]+.*?&gt;)/g,
      '<span class="text-blue-400">$1</span>'
    );

    return safeLine || ' ';
  };

  return (
    // FIX: Removemos o motion.div externo com opacity condicional.
    // Agora o componente sempre renderiza visível, confiando na animação do pai (index.tsx)
    <div className="relative aspect-16/10 w-[95vw] max-w-6xl perspective-1000">
      <motion.div
        className="relative h-full w-full transform-style-3d transition-all duration-700"
        animate={{ rotateY: isXRay ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 60, damping: 12 }}
      >
        {/* FACE DA FRENTE (UI) */}
        <div className="absolute inset-0 backface-hidden overflow-hidden rounded-xl bg-[#0A0A0A] ring-1 ring-white/10 shadow-2xl shadow-primary/10 flex flex-col">
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/5 bg-black/50 px-4 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="hidden sm:flex h-7 px-3 items-center justify-center rounded-md border border-white/5 bg-white/5 font-mono text-[10px] text-slate-500">
                codesampa.io / {activeFeature}
              </div>
            </div>

            <button
              onClick={() => setIsXRay(true)}
              className="group flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary transition-all hover:bg-primary/20"
            >
              <Code size={14} />
              <span className="hidden sm:inline">VIEW CODE</span>
            </button>
          </div>

          <div className="relative w-full flex-1 overflow-hidden bg-background p-6">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative z-10 grid h-full w-full grid-cols-[240px_1fr] gap-6">
              <DesktopSidebar
                activeTab={activeFeature}
                onTabChange={setFeature}
              />

              <div className="flex flex-col gap-6 overflow-hidden">
                <div className="shrink-0 h-16">
                  <ResponsiveHeader
                    isMobile={false}
                    activeTab={activeFeature}
                  />
                </div>
                <div className="flex-1 min-h-0 relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="h-full w-full"
                    >
                      {activeFeature === 'analytics' && (
                        <AnalyticsView isMobile={false} />
                      )}
                      {activeFeature === 'crm' && <CRMView isMobile={false} />}
                      {activeFeature === 'chat' && (
                        <ChatView isMobile={false} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FACE DE TRÁS (CODE) */}
        <div
          className="absolute inset-0 backface-hidden overflow-hidden rounded-xl bg-[#1e1e1e] ring-1 ring-white/10 shadow-2xl flex flex-col"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/5 bg-[#252526] px-4">
            <div className="flex items-center gap-2">
              <FileCode size={14} className="text-blue-400" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeFeature}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="font-mono text-xs text-slate-300"
                >
                  {activeFeature === 'analytics'
                    ? 'revenue-chart.tsx'
                    : activeFeature === 'crm'
                    ? 'kanban-board.tsx'
                    : 'chat-client.ts'}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyCode}
                className="text-slate-400 hover:text-white transition-colors"
                title="Copy Code"
              >
                {copied ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <Copy size={16} />
                )}
              </button>

              <button
                onClick={() => setIsXRay(false)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-white transition-all hover:bg-white/10"
              >
                <Eye size={14} />
                <span className="hidden sm:inline">PREVIEW UI</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6 font-mono text-xs md:text-sm leading-relaxed text-slate-300">
            <pre>
              <code>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4 }}
                  >
                    {CODE_SNIPPETS[activeFeature].split('\n').map((line, i) => (
                      <div key={i} className="table-row">
                        <span className="table-cell select-none text-slate-600 pr-4 text-right w-8">
                          {i + 1}
                        </span>
                        <span
                          className="table-cell"
                          dangerouslySetInnerHTML={{
                            __html: processCodeLine(line)
                          }}
                        />
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </code>
            </pre>
          </div>

          <div className="h-6 bg-blue-600 flex items-center px-3 gap-4 text-[10px] text-white font-medium">
            <span className="flex items-center gap-1">
              <span className="text-xs">✕</span> 0
            </span>
            <span className="flex items-center gap-1">
              <span className="text-xs">⚠</span> 0
            </span>
            <span className="ml-auto">TypeScript React</span>
            <span>UTF-8</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
