'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

import { cn } from '@/utils/functions/tw-merge';

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Foca no input automaticamente ao abrir
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    onSearch(''); // Limpa a busca no pai
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'mb-16 flex flex-col items-center justify-center gap-6 md:flex-row',
        className
      )}
    >
      {/* --- LISTA DE CATEGORIAS --- */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={cn(
              'relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
              activeCategory === cat.id
                ? 'text-white'
                : 'text-muted-foreground hover:text-white hover:bg-white/5'
            )}
          >
            {activeCategory === cat.id && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 rounded-full bg-white/10 border border-white/5"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* --- DIVISOR (Desktop) --- */}
      <div className="hidden h-6 w-px bg-white/10 md:block" />

      {/* --- PESQUISA EXPANSÍVEL --- */}
      <div className="relative h-10">
        <motion.div
          layout
          className={cn(
            'flex items-center overflow-hidden rounded-full border border-white/10 bg-white/5 transition-colors',
            isSearchOpen
              ? 'w-64 border-primary/30 bg-black/50'
              : 'w-10 hover:bg-white/10 hover:border-white/20'
          )}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <AnimatePresence mode="wait">
            {!isSearchOpen ? (
              // Botão Lupa (Fechado)
              <motion.button
                key="search-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSearchOpen(true)}
                className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-white"
                aria-label="Open search"
              >
                <Search size={18} />
              </motion.button>
            ) : (
              // Input (Aberto)
              <motion.div
                key="search-input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-10 w-full items-center px-3"
              >
                <Search size={16} className="mr-2 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-muted-foreground/50 focus:outline-none"
                />
                <button
                  onClick={handleCloseSearch}
                  className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-muted-foreground hover:bg-white/20 hover:text-white"
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
