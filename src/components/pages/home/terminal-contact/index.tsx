'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Mail,
  MessageSquare,
  Calendar,
  FileText,
  ChevronRight,
  Wifi,
  Copy,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { cn } from '@/utils/functions/tw-merge';

const SOCIALS = {
  email: 'gabrielsampaiolima@hotmail.com',
  whatsapp: 'https://wa.me/55...',
  calendly: 'https://cal.com/seu-link'
};

export function TerminalContact() {
  const t = useTranslations('Pages.Home.Terminal');
  const locale = useLocale();
  const [copied, setCopied] = useState(false);

  // Estado para controlar o que aparece no display do terminal
  const [activeLog, setActiveLog] = useState<string | null>(null);

  const cvFile =
    locale === 'pt-BR'
      ? '/assets/docs/cv-pt-BR.pdf'
      : '/assets/docs/cv-en-US.pdf';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SOCIALS.email);
    setCopied(true);
    toast.success(t('logs.email_copied'));
    setTimeout(() => setCopied(false), 2000);
  };

  // Itens de Contato
  const actions = [
    {
      id: 'email',
      icon: <Mail size={20} />,
      label: 'Send_Email.exe',
      desc: t('logs.email_desc'),
      action: handleCopyEmail,
      color: 'text-blue-400',
      border: 'hover:border-blue-500/50',
      bg: 'hover:bg-blue-500/10'
    },
    {
      id: 'whatsapp',
      icon: <MessageSquare size={20} />,
      label: 'Open_WhatsApp.sh',
      desc: t('logs.whatsapp_desc'),
      href: SOCIALS.whatsapp,
      color: 'text-emerald-400',
      border: 'hover:border-emerald-500/50',
      bg: 'hover:bg-emerald-500/10'
    },
    {
      id: 'calendar',
      icon: <Calendar size={20} />,
      label: 'Sync_Calendar.bat',
      desc: t('logs.calendar_desc'),
      href: SOCIALS.calendly,
      color: 'text-purple-400',
      border: 'hover:border-purple-500/50',
      bg: 'hover:bg-purple-500/10'
    },
    {
      id: 'resume',
      icon: <FileText size={20} />,
      label: 'Download_CV.pdf',
      desc: t('logs.resume_desc'),
      href: cvFile,
      download: true,
      color: 'text-orange-400',
      border: 'hover:border-orange-500/50',
      bg: 'hover:bg-orange-500/10'
    }
  ];

  return (
    <section className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden py-24">
      {/* Background Matrix/Grid */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff0005_1px,transparent_1px),linear-gradient(to_bottom,#00ff0005_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Header da Seção */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-2 rounded bg-green-900/20 px-2 py-1 text-[10px] font-mono text-green-500 border border-green-500/30">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            SYSTEM ONLINE
          </div>
          <h2 className="font-space text-3xl font-black text-white md:text-5xl uppercase tracking-tighter">
            {t('title')}
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* COLUNA 1: O DISPLAY DO TERMINAL */}
          <div className="order-2 lg:order-1 flex flex-col gap-4">
            {/* Janela Principal */}
            <div className="relative h-64 w-full overflow-hidden rounded-xl border border-white/10 bg-black/80 font-mono text-sm shadow-2xl backdrop-blur-xl">
              {/* Barra de Título */}
              <div className="flex h-8 items-center justify-between border-b border-white/10 bg-white/5 px-4">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/50" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                  <div className="h-3 w-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-[10px] text-muted-foreground">
                  bash — 80x24
                </div>
              </div>

              {/* Conteúdo do Log */}
              <div className="p-4 text-green-400/90 h-full overflow-y-auto custom-scrollbar">
                <div className="mb-4 opacity-50">
                  <p>
                    Last login: {new Date().toLocaleDateString()} on ttys001
                  </p>
                  <p>codesampa-system:~ user$ init_uplink --secure</p>
                </div>

                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    <span>Connection established.</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Wifi size={14} className="animate-pulse" />
                    <span>Waiting for command selection...</span>
                  </p>

                  {/* Área Dinâmica */}
                  <AnimatePresence mode="wait">
                    {activeLog ? (
                      <motion.div
                        key={activeLog}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="mt-4 border-l-2 border-green-500 pl-3 text-white"
                      >
                        <span className="block text-xs text-green-500 mb-1">{`> EXECUTING PROCESS:`}</span>
                        <span className="typing-effect">{activeLog}</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 animate-pulse"
                      >
                        <span className="inline-block w-2.5 h-4 bg-green-500 align-middle" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Painel de Dados */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="text-[10px] uppercase text-muted-foreground">
                  Location
                </div>
                <div className="font-mono text-xs text-white">
                  Minas Gerais, BR
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="text-[10px] uppercase text-muted-foreground">
                  Response Time
                </div>
                <div className="font-mono text-xs text-emerald-400">
                  ~ 2 hours
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA 2: OS COMANDOS (BOTÕES) */}
          <div className="order-1 lg:order-2 grid grid-cols-1 gap-4">
            {actions.map((action) => {
              const Wrapper = action.href ? 'a' : 'button';
              const props = action.href
                ? {
                    href: action.href,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    download: action.download
                  }
                : { onClick: action.action };

              return (
                // @ts-ignore
                <Wrapper
                  key={action.id}
                  {...props}
                  onMouseEnter={() => setActiveLog(action.desc)}
                  onMouseLeave={() => setActiveLog(null)}
                  className={cn(
                    'group relative flex items-center justify-between overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300',
                    action.border,
                    action.bg
                  )}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-lg bg-black/50 border border-white/10 transition-colors group-hover:border-transparent',
                        `group-hover:bg-${action.color.split('-')[1]}-500/20`,
                        action.color
                      )}
                    >
                      {action.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-mono text-sm text-muted-foreground group-hover:text-white transition-colors">
                        {`./${action.label}`}
                      </div>
                      <div className="h-0.5 w-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 transition-all duration-500 group-hover:w-full" />
                    </div>
                  </div>

                  <ChevronRight
                    className={cn(
                      'text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white'
                    )}
                  />

                  {/* Copied Success Indicator for Email */}
                  {action.id === 'email' && copied && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-6 top-6 rounded-full bg-emerald-500 p-1"
                    >
                      <CheckCircle2 size={16} className="text-black" />
                    </motion.div>
                  )}
                </Wrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
