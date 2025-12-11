import { Github, Linkedin, Instagram, Cpu } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';

import { posts } from '.velite';

import { Logo } from '@/components/ui/logo';
import { Link } from '@/lib/i18n/navigation';

export async function Links() {
  const t = await getTranslations('Pages.Home.Links');
  const locale = await getLocale();

  const latestPosts = posts
    .filter((post) => post.published && post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <section className="container mx-auto relative w-full border-t border-white/5 overflow-hidden">
      <div className="px-6 pt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 md:mb-16">
          <div className="md:col-span-4 flex flex-col gap-2 md:gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 group w-fit cursor-pointer"
            >
              <Logo width={48} showText />
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
              {/* <SocialLink href="#" icon={<Instagram size={18} />} /> */}
            </div>
          </div>

          <div className="md:col-span-4 hidden md:flex flex-col gap-6 md:items-start md:pl-8 lg:pl-16">
            <h4 className="font-space font-semibold text-white flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              {t('columns.blog')}
            </h4>
            <ul className="flex flex-col gap-3">
              {latestPosts.length > 0 ? (
                latestPosts.map((post) => (
                  <LiLink key={post.slug} href={`/blog/${post.slugAsParams}`}>
                    {post.title}
                  </LiLink>
                ))
              ) : (
                <li className="text-sm text-muted-foreground italic opacity-50">
                  ...
                </li>
              )}
            </ul>
          </div>

          <div className="md:col-span-4 flex flex-col gap-3 md:gap-6 md:items-start md:pl-8 lg:pl-16">
            <h4 className="font-space font-semibold text-white flex items-center gap-2">
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
  <li className="max-w-full overflow-hidden">
    <Link
      href={href}
      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors w-full"
    >
      <span className="h-px w-0 bg-primary group-hover:w-3 transition-all duration-300 shrink-0" />

      <span className="truncate">{children}</span>
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
