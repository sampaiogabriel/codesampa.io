'use client';

import { Check, Copy, Terminal } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';

import { cn } from '@/utils/functions/tw-merge';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  'data-language'?: string;
  raw?: string;
}

export function CodeBlock({
  children,
  className,
  'data-language': language = 'text',
  ...props
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = async () => {
    if (!preRef.current) return;

    // Extrai o texto do elemento <pre>
    const code = preRef.current.innerText;

    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      toast.success('Código copiado para a área de transferência!');

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch {
      toast.error('Erro ao copiar código.');
    }
  };

  return (
    <div className="relative my-8 overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl">
      {/* --- Terminal Header --- */}
      <div className="flex h-10 items-center justify-between border-b border-white/5 bg-white/5 px-4">
        {/* Window Controls */}
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>

        {/* Filename / Language Label */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/60">
          <Terminal size={12} />
          <span className="uppercase">{language}</span>
        </div>

        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 rounded-md p-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Copy code"
        >
          {isCopied ? (
            <>
              <Check size={14} className="text-emerald-400" />
              <span className="hidden sm:inline text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* --- Code Content --- */}
      <div className="relative p-0 overflow-x-auto">
        <pre
          ref={preRef}
          className={cn(
            'py-4 px-4 overflow-x-auto font-mono text-sm leading-relaxed',
            className
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}
