"use client";

import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/lib/i18n/navigation';

export function Footer() {
  const t = useTranslations('Components.Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-[#050505] pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="font-display text-xl font-bold tracking-tight text-foreground">
                CodeSampa
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              {t('description')}
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://github.com/sampaiogabriel" icon={<Github size={18} />} label="GitHub" />
              <SocialLink href="#" icon={<Twitter size={18} />} label="Twitter" />
              <SocialLink href="#" icon={<Linkedin size={18} />} label="LinkedIn" />
              <SocialLink href="#" icon={<Instagram size={18} />} label="Instagram" />
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <FooterColumn title={t('columns.product')}>
              <FooterLink href="#">{t('links.features')}</FooterLink>
              <FooterLink href="#">{t('links.integration')}</FooterLink>
              <FooterLink href="#">{t('links.pricing')}</FooterLink>
              <FooterLink href="#">{t('links.changelog')}</FooterLink>
            </FooterColumn>

            <FooterColumn title={t('columns.company')}>
              <FooterLink href="#">{t('links.about')}</FooterLink>
              <FooterLink href="#">{t('links.careers')}</FooterLink>
              <FooterLink href="#">{t('links.blog')}</FooterLink>
              <FooterLink href="#">{t('links.contact')}</FooterLink>
            </FooterColumn>

            <FooterColumn title={t('columns.resources')}>
              <FooterLink href="#">{t('links.community')}</FooterLink>
              <FooterLink href="#">{t('links.help')}</FooterLink>
              <FooterLink href="#">{t('links.terms')}</FooterLink>
              <FooterLink href="#">{t('links.privacy')}</FooterLink>
            </FooterColumn>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} CodeSampa. {t('rights')}</p>
          <div className="flex items-center gap-8">
            <p>{t('made_with')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

const FooterColumn = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="flex flex-col gap-4">
    <h4 className="font-semibold text-foreground text-sm">{title}</h4>
    <div className="flex flex-col gap-2">{children}</div>
  </div>
);

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link href={href} className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
    {children}
  </Link>
);

const SocialLink = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
    aria-label={label}
  >
    {icon}
  </a>
);