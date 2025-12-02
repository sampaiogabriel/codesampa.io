'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  Calendar,
  ArrowUpRight,
  Copy,
  Check
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { cn } from '@/utils/functions/tw-merge';

const SOCIALS = {
  email: 'gabrielsampaiolima@hotmail.com',
  whatsapp: 'https://wa.me/55...',
  calendly: 'https://cal.com/seu-link'
};

export function DataShardsContact() {
  const t = useTranslations('Pages.Home.Shards');
  const [activeShard, setActiveShard] = useState<string | null>('email'); // Default expanded
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault(); // Previne navegação se for link
    navigator.clipboard.writeText(SOCIALS.email);
    setCopied(true);
    toast.success(t('email_copied'));
    setTimeout(() => setCopied(false), 2000);
  };

  const shards = [
    {
      id: 'email',
      icon: <Mail size={32} />,
      title: 'Email Protocol',
      subtitle: SOCIALS.email,
      action: t('copy_action'),
      onClick: handleCopyEmail,
      color: 'from-blue-600/20 to-blue-900/20',
      border: 'hover:border-blue-500/50',
      text: 'text-blue-400',
      bg_glow: 'bg-blue-500/20'
    },
    {
      id: 'whatsapp',
      icon: <MessageSquare size={32} />,
      title: 'Quick Chat',
      subtitle: t('whatsapp_sub'),
      action: t('open_action'),
      href: SOCIALS.whatsapp,
      color: 'from-emerald-600/20 to-emerald-900/20',
      border: 'hover:border-emerald-500/50',
      text: 'text-emerald-400',
      bg_glow: 'bg-emerald-500/20'
    },
    {
      id: 'calendar',
      icon: <Calendar size={32} />,
      title: 'Meeting Room',
      subtitle: t('calendar_sub'),
      action: t('schedule_action'),
      href: SOCIALS.calendly,
      color: 'from-purple-600/20 to-purple-900/20',
      border: 'hover:border-purple-500/50',
      text: 'text-purple-400',
      bg_glow: 'bg-purple-500/20'
    }
  ];

  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden py-24">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-6">
        {/* Título da Seção */}
        <div className="mb-12 text-center">
          <h2 className="font-space text-3xl font-black uppercase tracking-tighter md:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-2 text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* CONTAINER DOS SHARDS (ACORDEÃO) */}
        <div className="flex flex-col h-[600px] md:h-[400px] md:flex-row gap-4 w-full max-w-6xl mx-auto">
          {shards.map((shard) => {
            const isActive = activeShard === shard.id;
            const Wrapper = shard.href ? 'a' : 'button';
            const props = shard.href
              ? {
                  href: shard.href,
                  target: '_blank',
                  rel: 'noopener noreferrer'
                }
              : { onClick: shard.onClick };

            return (
              // @ts-ignore
              <Wrapper
                key={shard.id}
                {...props}
                onMouseEnter={() => setActiveShard(shard.id)}
                className={cn(
                  'relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b transition-all duration-500 ease-out cursor-pointer',
                  shard.color,
                  isActive ? 'flex-[3]' : 'flex-1 opacity-70 hover:opacity-100'
                )}
              >
                {/* Glow de Fundo (Ativado) */}
                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    className={cn(
                      'absolute inset-0 blur-[100px] opacity-30',
                      shard.bg_glow
                    )}
                  />
                )}

                {/* Conteúdo Interno */}
                <div className="relative z-10 flex h-full flex-col justify-between p-8">
                  {/* Topo: Ícone e Título */}
                  <div className="flex flex-col gap-4">
                    <div
                      className={cn(
                        'flex h-14 w-14 items-center justify-center rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md transition-colors',
                        shard.text
                      )}
                    >
                      {shard.icon}
                    </div>

                    <div className="flex flex-col text-left">
                      <h3
                        className={cn(
                          'font-space text-xl font-bold uppercase md:text-2xl text-white whitespace-nowrap'
                        )}
                      >
                        {shard.title}
                      </h3>
                      {/* Mostra subtítulo apenas se ativo ou no mobile (onde layout muda) */}
                      <motion.p
                        className="text-sm text-muted-foreground mt-1 truncate max-w-[200px] md:max-w-none"
                        animate={{ opacity: isActive ? 1 : 0.6 }}
                      >
                        {shard.subtitle}
                      </motion.p>
                    </div>
                  </div>

                  {/* Base: Botão de Ação */}
                  <div className="flex items-center justify-between mt-auto">
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 20
                      }}
                      className={cn(
                        'flex items-center gap-2 text-sm font-bold uppercase tracking-widest',
                        shard.text
                      )}
                    >
                      {shard.action}
                      {shard.id === 'email' && copied ? (
                        <Check size={16} />
                      ) : (
                        <ArrowUpRight size={16} />
                      )}
                    </motion.div>

                    {/* Decoração Visual (Seta ou Indicador) */}
                    {!isActive && (
                      <div className="md:hidden flex items-center justify-center h-8 w-8 rounded-full bg-white/10">
                        <ArrowUpRight size={14} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Linhas Decorativas (Tech Feel) */}
                <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
