'use client';

import { AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

import useIsMobile from '@/utils/hooks/use-mobile';

import { Controls } from './controls';
import { DesktopMock } from './desktop-mock';
import { MobileMock } from './mobile-mock';

export function ShapeShifterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Estados da Máquina de Animação
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // Força mobile view se for dispositivo móvel
  useEffect(() => {
    if (isMobile) {
      setViewMode('mobile');
    } else {
      // Se não for mobile e ainda não tocou, default para desktop
      if (!hasPlayed) setViewMode('desktop'); 
    }
  }, [isMobile, hasPlayed]);

    const triggerCinematicSequence = () => {
    setIsPlaying(true);
    
    // 1. Scroll suave até o centro da seção para garantir foco
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 2. Trava o scroll do usuário
    document.body.style.overflow = 'hidden';

    // 3. Tempo da animação (soma dos delays + duração dos mocks)
    // DesktopMock/MobileMock demoram ~2.5s para montar tudo
    setTimeout(() => {
      // Destrava tudo
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
        // Gatilho: Se entrou na tela E ainda não tocou a animação
        if (entry.isIntersecting && !hasPlayed && !isPlaying) {
          triggerCinematicSequence();
        }
      },
      {
        threshold: 0.3, // Dispara quando 30% do elemento estiver visível (aprox 15px+ scroll visual)
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
   
  }, [hasPlayed, isPlaying]);



  const handleReplay = () => {
    setHasPlayed(false);
    setIsPlaying(false);
    // Pequeno timeout para resetar o estado visual antes de re-triggerar
    setTimeout(() => triggerCinematicSequence(), 100);
  };

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505] border-t border-white/5"
    >
      {/* Controles (Só aparecem se não estiver tocando a animação inicial ou se já tiver tocado) */}
      <Controls
        currentMode={viewMode}
        setMode={setViewMode}
        onReplay={handleReplay}
        isMobileDevice={!!isMobile}
        isVisible={!isPlaying && hasPlayed}
      />

      {/* Área de Visualização */}
      <div className="relative z-10 flex h-full w-full items-center justify-center p-4">
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