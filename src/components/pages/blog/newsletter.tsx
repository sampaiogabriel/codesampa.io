'use client';

import { subscribeToNewsletter } from '@/app/actions/newsletter';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/functions/tw-merge';

interface NewsletterProps {
  className?: string;
}

const initialState = {
  success: false,
  message: ''
};

export function Newsletter({ className }: NewsletterProps) {
  const t = useTranslations('Pages.Home.Newsletter');

  // React 19 useActionState: gerencia o estado da server action (pending, retorno)
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialState
  );
  const [email, setEmail] = useState('');

  // Feedback visual via Toast (Sonner)
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        setEmail(''); // Limpa o input no sucesso
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-white/5 to-transparent p-8 md:p-12',
        className
      )}
    >
      {/* Background Effects */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles size={12} />
          <span className="uppercase tracking-wider">Weekly Insights</span>
        </div>

        <h3 className="mb-4 font-space text-2xl font-bold tracking-tight text-white md:text-4xl">
          {t('title')}
        </h3>

        <p className="mb-8 max-w-lg text-muted-foreground text-base leading-relaxed">
          {t('description')}
        </p>

        <form
          action={formAction}
          className="flex w-full max-w-sm flex-col items-center gap-3 sm:flex-row"
        >
          <div className="relative flex-1 w-full">
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('placeholder')}
              disabled={isPending}
              className="h-12 w-full rounded-full border border-white/10 bg-black/50 px-5 text-sm text-white placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
              required
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            className="group relative h-12 w-full sm:w-auto rounded-full px-8 font-bold text-white border-0 overflow-hidden transition-transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
          >
            {/* Gradiente de Fundo */}
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-primary to-purple-600 transition-all duration-300 group-hover:brightness-110" />

            {/* Glow/Sombra colorida */}
            <div className="absolute inset-0 bg-primary/50 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

            <span className="relative z-10 flex items-center gap-2">
              {isPending ? (
                <>
                  Enviando... <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  {t('button')}
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </>
              )}
            </span>
          </Button>
        </form>

        <p className="mt-4 text-[10px] text-muted-foreground/60">
          {t('disclaimer')}
        </p>
      </div>
    </div>
  );
}
