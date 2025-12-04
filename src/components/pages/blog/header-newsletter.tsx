'use client';

import { subscribeToNewsletter } from '@/app/actions/newsletter';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, Terminal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { cn } from '@/utils/functions/tw-merge';

export function HeaderNewsletter() {
  const t = useTranslations('Components.Pages.Blog.Newsletter');
  const [email, setEmail] = useState('');
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('email', email);
        const result = await subscribeToNewsletter(null, formData);

        if (result?.success || result?.message === 'success') {
          setStatus('success');
          toast.success(t('messages.success'));
          setEmail('');
        } else {
          setStatus('error');
          toast.error(t('messages.error'));
        }
      } catch (error) {
        setStatus('error');
        toast.error(t('messages.critical_error'));
      }
      setTimeout(() => setStatus('idle'), 3000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-card/30 p-5 md:p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-card/40"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Lado Esquerdo */}
        <div className="flex flex-col gap-2 md:max-w-lg">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-primary" />
            <h3 className="text-lg font-bold font-space text-foreground md:text-xl">
              {t('title_prefix')}{' '}
              <span className="text-primary">{t('title_highlight')}</span>
            </h3>
          </div>
          <p className="text-sm text-muted-foreground/80 leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Lado Direito */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-stretch gap-2 md:w-auto md:min-w-[340px]"
        >
          <div className="relative flex-1">
            <input
              type="email"
              placeholder={t('placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending || status === 'success'}
              className="h-10 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending || status === 'success'}
            className={cn(
              'flex h-10 items-center justify-center rounded-lg px-4 text-sm font-bold uppercase tracking-wider transition-all min-w-[100px]',
              status === 'success'
                ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                : 'bg-primary text-black hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]'
            )}
          >
            <AnimatePresence mode="wait">
              {isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : status === 'success' ? (
                <CheckCircle2 size={16} />
              ) : (
                <div className="flex items-center gap-1">
                  <span>{t('button_label')}</span>
                  <ArrowRight size={14} />
                </div>
              )}
            </AnimatePresence>
          </button>
        </form>
      </div>
    </motion.div>
  );
}
