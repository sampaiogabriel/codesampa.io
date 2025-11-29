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
  
  // Efeito para ajustar o modo de visualização inicial e responsivo
  useEffect(() => {
    // Se for mobile, força o modo mobile sempre
    if (isMobile) {
      setViewMode('mobile');
    } else {
      // Se for desktop e a animação ainda não tocou (ou foi resetada),
      // garante que comece no modo desktop
      if (!hasPlayed) {
        setViewMode('desktop');
      }
      // Se já tocou, mantemos o modo que o usuário escolheu, não forçamos nada
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
    // Ao clicar em replay:
    // 1. Resetamos o estado de "já tocou"
    setHasPlayed(false);
    // 2. Iniciamos o estado de "tocando"
    setIsPlaying(false); // Será setado para true dentro do triggerCinematicSequence
    
    // IMPORTANTE: Não forçamos a mudança de viewMode aqui.
    // O useEffect lá em cima cuidará disso:
    // - Se for mobile -> mantém 'mobile'
    // - Se for desktop -> muda para 'desktop' (comportamento padrão desejado no desktop)
    
    setTimeout(() => triggerCinematicSequence(), 100);
  };

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 flex w-full items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {viewMode === 'desktop' ? (
            <DesktopMock key="desktop" startAnimation={isPlaying || hasPlayed} />
          ) : (
            <MobileMock key="mobile" startAnimation={isPlaying || hasPlayed} />
          )}
        </AnimatePresence>
      </div>

      {/* Controles posicionados abaixo dos componentes no fluxo normal */}
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