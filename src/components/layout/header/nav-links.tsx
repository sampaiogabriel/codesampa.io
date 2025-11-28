'use client';


import { Link, usePathname } from '@/lib/i18n/navigation';
import { cn } from '@/utils/functions/tw-merge';
import { useTranslations } from 'next-intl';

type NavLinkProps = {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  onLinkClick?: () => void;
};

export function NavLinks({
  className,
  orientation = 'horizontal',
  onLinkClick
}: NavLinkProps) {
  const t = useTranslations('Components.Header.nav');
  const pathname = usePathname();

  const links = [
    { href: '/', label: t('home') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') }
  ];

  return (
    <nav
      className={cn(
        'flex gap-6',
        orientation === 'vertical' ? 'flex-col items-start gap-4' : 'items-center',
        className
      )}
    >
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive
                ? 'text-foreground font-semibold'
                : 'text-muted-foreground',
              orientation === 'vertical' && 'text-lg py-2'
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}