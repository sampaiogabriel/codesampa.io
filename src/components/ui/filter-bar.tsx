'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react'; // useRef removido

import { cn } from '@/utils/functions/tw-merge';
import useIsMobile from '@/utils/hooks/use-mobile';

export interface FilterCategory {
  id: string;
  label: string;
}

interface FilterBarProps {
  categories: FilterCategory[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

export function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  onSearch,
  className,
  placeholder = 'Buscar...'
}: FilterBarProps) {
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Força a abertura no mobile assim que detectado
  useEffect(() => {
    if (isMobile) {
      setIsSearchOpen(true);
    }
  }, [isMobile]);

  const handleCloseSearch = () => {
    if (isMobile) return;
    setIsSearchOpen(false);
    setSearchQuery('');
    onSearch('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleInputBlur = () => {
    if (!isMobile) {
      setIsSearchOpen(false);
    }
  };

  const showExpandedSearch = isMobile || isSearchOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate="visible"
      className={cn(
        'mb-8 flex flex-col-reverse gap-4 md:mb-16 md:flex-row md:items-center md:justify-center md:gap-6',
        className
      )}
    >
      {/* --- LISTA DE CATEGORIAS --- */}
      <div
        className={cn(
          'relative overflow-hidden min-w-0',
          'w-full',
          'md:w-auto md:max-w-[60%]'
        )}
      >
        <div
          className={cn(
            'flex items-center gap-2 overflow-x-auto pb-2',
            'mask-r-from-80%',
            'mask-[linear-gradient(to_right,black_80%,transparent)]',
            '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
            'snap-x cursor-grab active:cursor-grabbing'
          )}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              aria-pressed={activeCategory === cat.id}
              className={cn(
                'relative shrink-0 snap-start rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap',
                activeCategory === cat.id
                  ? 'text-white'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-white'
              )}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-full border border-white/5 bg-white/10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
          <div className="w-8 shrink-0" aria-hidden="true" />
        </div>
      </div>

      {/* --- DIVISOR (Apenas Desktop) --- */}
      <div className="hidden h-6 w-px bg-white/10 md:block shrink-0" />

      {/* --- PESQUISA EXPANSÍVEL --- */}
      <div className="relative flex h-10 w-full md:w-auto shrink-0">
        <motion.div
          layout
          className={cn(
            'flex items-center overflow-hidden rounded-full border border-white/10 bg-white/5 transition-all',
            showExpandedSearch
              ? 'w-full border-primary/30 bg-black/50 md:w-64'
              : 'w-10 hover:border-white/20 hover:bg-white/10'
          )}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!showExpandedSearch ? (
              <motion.button
                key="search-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSearchOpen(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center text-muted-foreground hover:text-white"
                aria-label="Open search"
              >
                <Search size={18} />
              </motion.button>
            ) : (
              <motion.div
                key="search-input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-10 w-full items-center px-3"
              >
                <Search
                  size={16}
                  className="mr-2 shrink-0 text-muted-foreground"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  // [ATUALIZADO] Foca automaticamente ao abrir no desktop
                  autoFocus={!isMobile}
                  placeholder={placeholder}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-muted-foreground/50 focus:outline-none min-w-0"
                />
                <button
                  onClick={handleCloseSearch}
                  onMouseDown={(e) => e.preventDefault()}
                  aria-label="Close search"
                  className={cn(
                    'ml-2 shrink-0 items-center justify-center rounded-full bg-white/10 text-muted-foreground hover:bg-white/20 hover:text-white h-5 w-5',
                    'hidden md:flex'
                  )}
                >
                  <X size={12} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
