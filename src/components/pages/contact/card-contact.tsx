import { Mail, Check, Copy, MessageCircle, Download } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

const CardContact = () => {
  const t = useTranslations('Components.Pages.Contact.CardContact');
  const locale = useLocale();
  const [copied, setCopied] = useState(false);
  const [cvLang, setCvLang] = useState(locale);

  // Dados de contato
  const email = 'gabrielsampaiolima@hotmail.com';
  const whatsappNumber = '5511999999999';

  // URL dinâmica baseada no estado do switch
  const cvUrl = `/assets/docs/cv-${cvLang}.pdf`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success(t('emailCopied'));

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="pointer-events-auto flex flex-col items-start gap-6 max-w-lg animate-in fade-in slide-in-from-bottom-10 duration-700 mx-auto md:mx-0">
      <div className="group w-full relative overflow-hidden rounded-2xl bg-zinc-900/40 p-6 backdrop-blur-md border border-white/5 transition-all hover:bg-zinc-900/60 hover:border-white/10">
        <div className="relative z-10 flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-4xl">
            Gabriel Sampaio
          </h1>
          <p className="text-base md:text-lg font-medium text-blue-400 bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
            {t('role')}
          </p>

          {/* Container de Links */}
          <div className="mt-6 flex flex-col gap-4">
            {/* Email */}
            <div className="flex items-center gap-3 text-zinc-400">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors group-hover/email:bg-white/10">
                <Mail className="h-4 w-4" />
              </div>
              <button
                onClick={handleCopyEmail}
                className="group/email flex items-center gap-2 hover:text-white transition-colors text-xs md:text-base font-mono truncate cursor-pointer"
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

            {/* WhatsApp */}
            <div className="flex items-center gap-3 text-zinc-400">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors group-hover/wa:bg-green-500/20">
                <MessageCircle className="h-4 w-4 group-hover/wa:text-green-500 transition-colors" />
              </div>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/wa flex items-center gap-2 hover:text-green-400 transition-colors text-xs md:text-base font-medium"
              >
                {t('whatsappLabel')}
              </a>
            </div>

            {/* Download CV com Switch de Idioma */}
            <div className="flex items-center gap-3 text-zinc-400">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors group-hover/cv:bg-white/10">
                <Download className="h-4 w-4" />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={cvUrl}
                  download
                  className="group/cv flex items-center gap-2 hover:text-white transition-colors text-xs md:text-base font-medium mr-1"
                >
                  {t('downloadCvLabel')}
                </a>

                {/* Pequeno Switch de Idioma */}
                <div className="flex items-center bg-white/5 rounded-full p-0.5 border border-white/5">
                  <button
                    onClick={() => setCvLang('pt-BR')}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-all duration-300 ${
                      cvLang === 'pt-BR'
                        ? 'bg-blue-500/20 text-blue-400 shadow-sm'
                        : 'text-zinc-600 hover:text-zinc-400'
                    }`}
                    title="Português"
                  >
                    PT
                  </button>
                  <button
                    onClick={() => setCvLang('en-US')}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-all duration-300 ${
                      cvLang === 'en-US'
                        ? 'bg-blue-500/20 text-blue-400 shadow-sm'
                        : 'text-zinc-600 hover:text-zinc-400'
                    }`}
                    title="English"
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl group-hover:bg-blue-500/30 transition-all duration-500" />
      </div>
    </div>
  );
};

export default CardContact;
