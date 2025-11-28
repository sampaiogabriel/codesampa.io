import { getTranslations } from 'next-intl/server';
import { Github, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { NavLinks } from './nav-links';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './language-switcher';

export async function Header() {
  const t = await getTranslations('Components.Header');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Esquerda: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold tracking-tight text-foreground hover:opacity-90 transition-opacity">
              CodeSampa
            </span>
          </Link>
        </div>

        {/* Centro: Navegação Desktop */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <NavLinks />
        </div>

        {/* Direita: Ações (GitHub + Lang + Mobile Menu) */}
        <div className="flex items-center gap-2">
          {/* GitHub Button (Desktop & Mobile) */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hidden sm:flex"
            asChild
          >
            <a
              href="https://github.com/sampaiogabriel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>

          <LanguageSwitcher />

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="-mr-2 text-muted-foreground hover:text-foreground"
                  aria-label={t('open_menu')}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="font-display font-bold text-xl">
                    CodeSampa
                  </SheetTitle>
                </SheetHeader>
                <NavLinks orientation="vertical" />
                
                {/* Mobile Extra Links */}
                <div className="mt-8 border-t pt-6">
                   <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    asChild
                  >
                    <a
                      href="https://github.com/sampaiogabriel"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}