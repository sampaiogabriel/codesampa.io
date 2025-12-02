'use client';

import { AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

import useIsMobile from '@/utils/hooks/use-mobile';

import { FeatureType } from './components';
import { ShapeShifterControls } from './controls';
import { DesktopMock } from './desktop-mock';
import { MobileMock } from './mobile-mock';

export function ShapeShifterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Estados de Controle
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [replayKey, setReplayKey] = useState(0);

  // Estados da Feature (Slider)
  const [activeFeature, setActiveFeature] = useState<FeatureType>('analytics');
  // [NOVO] Estado para pausar o autoplay quando o usuário estiver lendo o código
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Define modo inicial
  useEffect(() => {
    if (isMobile) {
      setViewMode('mobile');
    } else {
      if (!hasPlayed && replayKey === 0) {
        setViewMode('desktop');
      }
    }
  }, [isMobile, hasPlayed, replayKey]);

  // Lógica de Auto-Play (Features Slider)
  useEffect(() => {
    // Adicionado !isInteractionPaused na verificação
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
  }, [hasPlayed, isPlaying, isInteractionPaused]); // Dependência atualizada

  const handleManualFeatureChange = (feature: FeatureType) => {
    setActiveFeature(feature);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const triggerCinematicSequence = (scroll: boolean = true) => {
    setIsPlaying(true);
    setActiveFeature('analytics');

    if (scroll) {
      containerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }

    setTimeout(() => {
      setIsPlaying(false);
      setHasPlayed(true);
    }, 2800);
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !hasPlayed &&
          !isPlaying &&
          replayKey === 0
        ) {
          triggerCinematicSequence(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasPlayed, isPlaying, replayKey]);

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
    setHasPlayed(false);
    setIsPlaying(false);

    setTimeout(() => {
      triggerCinematicSequence(false);
    }, 50);
  };

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 flex w-full items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {viewMode === 'desktop' ? (
            <DesktopMock
              key={`desktop-${replayKey}`}
              startAnimation={isPlaying || hasPlayed}
              activeFeature={activeFeature}
              setFeature={handleManualFeatureChange}
              // [NOVO] Passamos a função para pausar o autoplay
              setIsInteractionPaused={setIsInteractionPaused}
            />
          ) : (
            <MobileMock
              key={`mobile-${replayKey}`}
              startAnimation={isPlaying || hasPlayed}
              activeFeature={activeFeature}
              setFeature={handleManualFeatureChange}
            />
          )}
        </AnimatePresence>
      </div>

      <ShapeShifterControls
        currentMode={viewMode}
        setMode={setViewMode}
        onReplay={handleReplay}
        isMobileDevice={!!isMobile}
        isVisible={!isPlaying && hasPlayed}
      />
    </section>
  );
}
