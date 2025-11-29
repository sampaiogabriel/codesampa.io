'use client';

import { AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

import useIsMobile from '@/utils/hooks/use-mobile';

import { ShapeShifterControls } from './controls';
import { DesktopMock } from './desktop-mock';
import { MobileMock } from './mobile-mock';

export function ShapeShifterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  useEffect(() => {
    if (isMobile) {
      setViewMode('mobile');
    } else {
      if (!hasPlayed) setViewMode('desktop'); 
    }
  }, [isMobile, hasPlayed]);

  const triggerCinematicSequence = () => {
    setIsPlaying(true);
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      document.body.style.overflow = '';
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
        if (entry.isIntersecting && !hasPlayed && !isPlaying) {
          triggerCinematicSequence();
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
   
  }, [hasPlayed, isPlaying]);

  const handleReplay = () => {
    setHasPlayed(false);
    setIsPlaying(false);
    setTimeout(() => triggerCinematicSequence(), 100);
  };

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* Controles no Bottom */}
      <ShapeShifterControls
        currentMode={viewMode}
        setMode={setViewMode}
        onReplay={handleReplay}
        isMobileDevice={!!isMobile}
        isVisible={!isPlaying && hasPlayed}
      />

      {/* Área de Visualização com Padding Bottom para evitar colisão */}
      <div className="relative z-10 flex h-full w-full items-center justify-center p-4 pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          {viewMode === 'desktop' ? (
            <DesktopMock key="desktop" startAnimation={isPlaying || hasPlayed} />
          ) : (
            <MobileMock key="mobile" startAnimation={isPlaying || hasPlayed} />
          )}
        </AnimatePresence>
      </div>

      {/* Background Decorativo */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/5 blur-[150px] rounded-full" />
      </div>
    </section>
  );
}