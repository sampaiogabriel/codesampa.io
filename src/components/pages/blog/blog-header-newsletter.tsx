'use client';

import { subscribeToNewsletter } from '@/app/actions/newsletter';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

export function BlogHeaderNewsletter() {
  const t = useTranslations('Components.Pages.Blog.HeaderNewsletter');

  const [email, setEmail] = useState('');
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, {
    success: false,
    message: ''
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        setEmail('');
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="relative mx-auto mb-12 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1.5 shadow-2xl backdrop-blur-md transition-all hover:border-primary/30 hover:bg-white/10"
    >
      <div className="absolute -left-10 top-0 h-full w-20 skew-x-12 bg-white/5 blur-xl transition-all duration-1000 group-hover:left-full" />

      <form
        action={formAction}
        className="relative flex flex-col items-center gap-2 sm:flex-row"
      >
        <div className="flex flex-1 items-center gap-3 px-3 py-2 text-center sm:text-left">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary/20 to-purple-500/20 text-primary shadow-inner">
            <Sparkles size={16} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold text-white">{t('title')}</span>
            <span className="text-[10px] text-muted-foreground/80 font-mono mt-1">
              {t('subtitle')}
            </span>
          </div>
        </div>

        <div className="group/input flex w-full items-center gap-2 rounded-xl bg-black/40 p-1 ring-1 ring-white/5 transition-all focus-within:ring-primary/50 sm:w-auto">
          <Mail
            size={14}
            className="ml-3 text-muted-foreground transition-colors group-focus-within/input:text-white"
          />
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('placeholder')}
            disabled={isPending}
            className="w-full bg-transparent px-2 py-2 text-xs text-white placeholder:text-muted-foreground/50 focus:outline-none sm:w-56"
            required
          />
          <Button
            size="sm"
            disabled={isPending}
            className="h-8 w-8 rounded-lg bg-white text-black hover:bg-primary hover:text-white transition-all shadow-lg p-0 shrink-0 cursor-pointer"
          >
            {isPending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <ArrowRight size={14} />
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
