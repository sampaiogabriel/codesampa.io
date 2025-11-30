'use client';

import { ArrowUpRight, Copy, Check, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { Lanyard } from '@/components/pages/contact/lanyard';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/functions/tw-merge';

export default function ContactPage() {
  const t = useTranslations('Pages.Contact');
  const [copied, setCopied] = useState(false);
  const email = 'gabrielsampaiolima@hotmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success(t('emailCopied'));

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    // Wrapper Principal:
    // - Mobile: flex flex-col (empilha verticalmente)
    // - Desktop: md:block (permite posicionamento absoluto)
    <div className="container mx-auto relative h-[85vh] w-full overflow-hidden bg-zinc-950 text-zinc-50 flex flex-col md:block">
      <div className="relative w-full flex-1 md:absolute md:inset-0 md:h-full z-0">
        <Lanyard />
      </div>

      <div className="relative z-20 w-full p-6 shrink-0 bg-zinc-950/50 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none md:absolute md:bottom-0 md:left-0 md:p-12 md:pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-start gap-6 max-w-lg animate-in fade-in slide-in-from-bottom-10 duration-700 mx-auto md:mx-0">
          <div className="group w-full relative overflow-hidden rounded-2xl bg-zinc-900/40 p-6 backdrop-blur-md border border-white/5 transition-all hover:bg-zinc-900/60 hover:border-white/10">
            <div className="relative z-10 flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight text-white md:text-4xl">
                Gabriel Sampaio
              </h1>
              <p className="text-base md:text-lg font-medium text-blue-400 bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                {t('role')}
              </p>

              <div className="mt-4 flex items-center gap-3 text-zinc-400">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5">
                  <Mail className="h-4 w-4" />
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="group/email flex items-center gap-2 hover:text-white transition-colors text-xs md:text-base font-mono truncate"
                  aria-label={t('copyEmail')}
                >
                  <span className="truncate">{email}</span>
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover/email:opacity-100 group-hover/email:translate-x-0 transition-all duration-300 text-zinc-500 shrink-0" />
                  )}
                </button>
              </div>
            </div>

            {/* Decorative gradient blob */}
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl group-hover:bg-blue-500/30 transition-all duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
