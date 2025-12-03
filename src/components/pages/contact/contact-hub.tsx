'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  MessageCircle,
  FileDown,
  Calendar,
  Copy,
  Check,
  ArrowUpRight
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { PageTitle } from '@/components/ui/page-title';

const SOCIALS = {
  email: 'gabrielsampaiolima@hotmail.com',
  whatsapp: 'https://wa.me/55...',
  calendly: 'https://cal.com/seu-link'
};

export function ContactHub() {
  const t = useTranslations('Pages.Contact.Hub');
  const locale = useLocale();
  const [copied, setCopied] = useState(false);

  const cvFile =
    locale === 'pt-BR'
      ? '/assets/docs/cv-pt-BR.pdf'
      : '/assets/docs/cv-en-US.pdf';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SOCIALS.email);
    setCopied(true);
    toast.success(t('email.toast_success'));
    setTimeout(() => setCopied(false), 2000);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  return (
    <section className="relative flex h-full flex-1 flex-col items-center justify-center overflow-hidden py-8 md:py-0">
      <div className="container pt-16 px-4 md:px-6 relative z-10 max-w-5xl">
        {/* --- Título Padronizado --- */}
        <PageTitle
          badge={t('badge')}
          title={
            <>
              {t('title_prefix')} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient-x">
                {t('title_highlight')}
              </span>
            </>
          }
          subtitle={t('subtitle')}
        />

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:h-[380px]">
          {/* ... resto do conteúdo do grid ... */}
          {/* 1. EMAIL */}
          <motion.button
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onClick={handleCopyEmail}
            className="group relative col-span-1 md:col-span-2 flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 text-left transition-all hover:border-white/20 hover:bg-white/10"
          >
            <div className="absolute right-4 top-4 rounded-full bg-white/10 p-2 transition-colors group-hover:bg-white/20">
              {copied ? (
                <Check size={20} className="text-emerald-400" />
              ) : (
                <Copy size={20} />
              )}
            </div>

            <div className="space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400">
                <Mail size={24} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                {t('email.label')}
              </h3>
            </div>

            <div>
              <p className="text-lg md:text-xl font-mono text-foreground/80 break-all">
                {SOCIALS.email}
              </p>
            </div>

            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[80px] transition-all group-hover:bg-blue-500/30" />
          </motion.button>

          {/* ... outros cartões (Whatsapp, CV, Call) ... */}
          {/* Mantenha o restante do código dos cartões exatamente como está no seu arquivo original, apenas substituindo o bloco do header pelo PageTitle */}
          <motion.a
            href={SOCIALS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-emerald-950/10 p-6 md:p-8 transition-all hover:border-emerald-500/30 hover:bg-emerald-950/20"
          >
            {/* Conteúdo do Whatsapp */}
            <div className="absolute right-4 top-4 opacity-50 transition-opacity group-hover:opacity-100">
              <ArrowUpRight size={20} />
            </div>
            <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">{t('whatsapp.label')}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t('whatsapp.sub')}
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20" />
          </motion.a>

          {/* 3. CURRÍCULO */}
          <motion.a
            href={cvFile}
            download
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-purple-950/10 p-6 md:p-8 transition-all hover:border-purple-500/30 hover:bg-purple-950/20"
          >
            {/* Conteúdo do Curriculo */}
            <div className="absolute right-4 top-4 opacity-50 transition-opacity group-hover:opacity-100">
              <FileDown size={20} />
            </div>
            <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400">
              <FileDown size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">{t('resume.label')}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t('resume.sub')}
              </p>
            </div>
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20" />
          </motion.a>

          {/* 4. CALL */}
          <motion.a
            href={SOCIALS.calendly}
            target="_blank"
            rel="noopener noreferrer"
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative col-span-1 md:col-span-2 flex items-center justify-between overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-primary/10 to-transparent p-6 md:p-8 transition-all hover:border-primary/40 hover:from-primary/20"
          >
            {/* Conteúdo do Call */}
            <div className="flex flex-col gap-2 relative z-10">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Calendar size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">
                  {t('schedule.badge')}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black font-space">
                {t('schedule.title')}
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                {t('schedule.desc')}
              </p>
            </div>
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110 group-hover:rotate-45">
              <ArrowUpRight size={28} />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-primary)_1px,transparent_1px)] bg-size-[20px_20px] opacity-5 group-hover:opacity-10 transition-opacity" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
