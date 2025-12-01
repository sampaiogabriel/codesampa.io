'use client';

import { Github, Linkedin, Instagram, Cpu } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/lib/i18n/navigation';

// Mocks de dados do Blog para o Footer
const blogPosts = [
  {
    title: 'Understanding Server Actions in Next.js 15',
    slug: 'server-actions-nextjs-15'
  },
  {
    title: 'Why Tailwind v4 is a Game Changer',
    slug: 'tailwind-v4-features'
  },
  {
    title: 'Building Scalable Micro-SaaS',
    slug: 'scalable-micro-saas'
  },
  {
    title: 'The Future of React Server Components',
    slug: 'future-rsc'
  }
];

export function Links() {
  const t = useTranslations('Pages.Home.Links');

  return (
    <section className="container mx-auto relative w-full border-t border-white/5 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_15px_rgba(var(--color-primary),0.5)]" />

      <div className="container mx-auto px-6 pt-12 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 mb-16">
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
                <Cpu size={20} />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                CodeSampa
              </span>
            </Link>

            <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
              {t('description')}
            </p>

            <div className="flex gap-3 pt-2">
              <SocialLink
                href="https://github.com/sampaiogabriel"
                icon={<Github size={18} />}
              />
              <SocialLink
                href="https://www.linkedin.com/in/gabrielsampaiolimadearaujo/"
                icon={<Linkedin size={18} />}
              />
              <SocialLink href="#" icon={<Instagram size={18} />} />
            </div>
          </div>

          <div className="md:col-span-4 hidden md:flex flex-col gap-6 md:items-start md:pl-8 lg:pl-16">
            <h4 className="font-display font-semibold text-white flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              {t('columns.blog')}
            </h4>
            <ul className="flex flex-col gap-3">
              {blogPosts.map((post, index) => (
                <LiLink key={index} href={`/blog/${post.slug}`}>
                  {post.title}
                </LiLink>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6 md:items-start md:pl-8 lg:pl-16">
            <h4 className="font-display font-semibold text-white flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t('columns.explore')}
            </h4>
            <ul className="flex flex-col gap-3">
              <LiLink href="/">{t('links.home')}</LiLink>
              <LiLink href="/blog">{t('links.blog')}</LiLink>
              <LiLink href="/projects">{t('links.projects')}</LiLink>
              <LiLink href="/contact">{t('links.contact')}</LiLink>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const LiLink = ({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <li>
    <Link
      href={href}
      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors w-fit"
    >
      <span className="h-px w-0 bg-primary group-hover:w-3 transition-all duration-300" />
      {children}
    </Link>
  </li>
);

const SocialLink = ({
  href,
  icon
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/2 text-muted-foreground hover:scale-110 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-300"
  >
    {icon}
  </a>
);
