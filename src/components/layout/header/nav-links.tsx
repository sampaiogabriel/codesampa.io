'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/lib/i18n/navigation';
import { cn } from '@/utils/functions/tw-merge';

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
  const t = useTranslations('Components.Layout.Header.nav');
  const pathname = usePathname();

  const links = [
    { href: '/', label: t('home') },
    { href: '/projects', label: t('projects') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') }
  ];

  return (
    <nav
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col gap-2' : 'items-center gap-6',
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
              'group relative flex items-center transition-colors',
              // Estilos Desktop (Horizontal)
              orientation === 'horizontal' && [
                'text-sm font-semibold hover:text-primary',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              ],
              // Estilos Mobile (Vertical) - Mais impactante
              orientation === 'vertical' && [
                'py-4 text-3xl font-space font-bold tracking-tight hover:text-primary transition-all duration-300',
                isActive
                  ? 'text-foreground pl-4'
                  : 'text-muted-foreground/60 hover:pl-2'
              ]
            )}
          >
            {/* Indicador Mobile para Item Ativo */}
            {orientation === 'vertical' && isActive && (
              <motion.span
                layoutId="mobile-nav-indicator"
                className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]"
              />
            )}

            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
