'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

import useIsMobile from '@/utils/hooks/use-mobile';
import { useHomeStore } from '@/utils/stores/home-store';

import { FeatureType } from './components';
import { ShapeShifterControls } from './controls';
import { DesktopMock } from './desktop-mock';
import { LandingPageMock } from './landing-page-mock';
import { MobileMock } from './mobile-mock';
import { PriorityNotification } from './priority-notification';

export function ShapeShifterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { mode } = useHomeStore();

  // Estados de Controle
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [replayKey, setReplayKey] = useState(0);

  // Controle da Notificação
  const [showNotification, setShowNotification] = useState(false);

  // Refs para limpar timeouts se o usuário interagir rápido
  const sequenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Feature Slider
  const [activeFeature, setActiveFeature] = useState<FeatureType>('analytics');
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // --- 1. Lógica da Animação (Definida antes para ser usada no useEffect) ---
  const triggerCinematicSequence = useCallback(() => {
    // Limpa timeouts anteriores para evitar sobreposição
    if (sequenceTimeoutRef.current) clearTimeout(sequenceTimeoutRef.current);
    if (notificationTimeoutRef.current)
      clearTimeout(notificationTimeoutRef.current);

    setIsPlaying(true);
    setShowNotification(false); // Garante que a notificação some no início
    setActiveFeature('analytics');

    // Duração da Animação (Mock entrando)
    sequenceTimeoutRef.current = setTimeout(() => {
      setIsPlaying(false);
      setHasPlayed(true);

      // Delay para mostrar a notificação após o mock estabilizar
      notificationTimeoutRef.current = setTimeout(() => {
        setShowNotification(true);
      }, 500);
    }, 1500);
  }, []);

  // --- 2. Efeitos de Mudança de Modo ---
  useEffect(() => {
    // Reseta tudo
    setHasPlayed(false);
    setIsPlaying(false);
    setShowNotification(false);
    setReplayKey((prev) => prev + 1);

    // Reinicia a sequência automaticamente após um breve delay (para o scroll acontecer)
    const timeoutId = setTimeout(() => {
      triggerCinematicSequence();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [mode, triggerCinematicSequence]);

  // Modo inicial (Mobile vs Desktop)
  useEffect(() => {
    if (isMobile) {
      setViewMode('mobile');
    } else if (!hasPlayed && replayKey === 0) {
      setViewMode('desktop');
    }
  }, [isMobile, hasPlayed, replayKey]);

  // Intersection Observer (Para a primeira vez que aparece na tela)
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Só dispara se nunca tocou e não está tocando
        if (
          entry.isIntersecting &&
          !hasPlayed &&
          !isPlaying &&
          replayKey === 0
        ) {
          triggerCinematicSequence();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [hasPlayed, isPlaying, replayKey, triggerCinematicSequence]);

  // Auto-Play das Features (Analytics -> CRM -> Chat)
  useEffect(() => {
    if (mode === 'landing') return;
    if (!hasPlayed || isPlaying || isInteractionPaused) return;

    const features: FeatureType[] = ['analytics', 'crm', 'chat'];
    const startAutoPlay = () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        setActiveFeature((current) => {
          const nextIndex = (features.indexOf(current) + 1) % features.length;
          return features[nextIndex];
        });
      }, 4000);
    };
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [hasPlayed, isPlaying, isInteractionPaused, mode]);

  const handleManualFeatureChange = (feature: FeatureType) => {
    setActiveFeature(feature);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
    setHasPlayed(false);
    setIsPlaying(false);
    setShowNotification(false);
    setTimeout(() => triggerCinematicSequence(), 50);
  };

  return (
    <section
      id="shape-shifter"
      ref={containerRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background"
    >
      <div className="relative z-10 flex w-full items-center justify-center p-4">
        {/* Notificação de Prioridade (Overlay) */}
        {/* Posicionada relativa a este container flex */}
        <PriorityNotification
          isVisible={showNotification}
          onDismiss={() => setShowNotification(false)}
          mode={mode}
        />

        <AnimatePresence mode="wait">
          {/* CONTAINER DO MOCK */}
          <motion.div
            key={`${mode}-${viewMode}-${replayKey}`}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: 'blur(0px)'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={
              mode === 'landing'
                ? 'aspect-16/10 w-[95vw] max-w-6xl perspective-1000'
                : ''
            }
          >
            {mode === 'landing' ? (
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#09090b] shadow-2xl ring-1 ring-white/10">
                <LandingPageMock />
              </div>
            ) : viewMode === 'desktop' ? (
              <DesktopMock
                startAnimation={isPlaying || hasPlayed}
                activeFeature={activeFeature}
                setFeature={handleManualFeatureChange}
                setIsInteractionPaused={setIsInteractionPaused}
              />
            ) : (
              <MobileMock
                startAnimation={isPlaying || hasPlayed}
                activeFeature={activeFeature}
                setFeature={handleManualFeatureChange}
                mode={mode}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles de Dispositivo */}
      {mode === 'systems' && !isPlaying && (
        <ShapeShifterControls
          currentMode={viewMode}
          setMode={setViewMode}
          onReplay={handleReplay}
          isMobileDevice={!!isMobile}
          isVisible={hasPlayed}
        />
      )}
    </section>
  );
}
