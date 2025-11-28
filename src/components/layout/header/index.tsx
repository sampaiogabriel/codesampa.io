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
    <header className="sticky top-0 inset-x-0 z-50 h-14 w-full border-b border-border bg-background/40 backdrop-blur-lg">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        {/* Esquerda: Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            {/* Se tiver um ícone SVG, pode colocar aqui. Por enquanto, texto estilizado */}
            <span className="font-display text-lg font-medium tracking-tight text-foreground hover:opacity-90 transition-opacity">
              CodeSampa
            </span>
          </Link>
        </div>

        {/* Centro: Navegação Desktop (Posicionamento Absoluto para Centralização Perfeita) */}
        <nav className="hidden md:absolute md:left-1/2 md:top-1/2 md:block md:-translate-x-1/2 md:-translate-y-1/2">
          <NavLinks />
        </nav>

        {/* Direita: Ações */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hidden sm:flex h-9 w-9"
            asChild
          >
            <a
              href="https://github.com/sampaiogabriel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
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
                  className="-mr-2 text-muted-foreground hover:text-foreground h-9 w-9"
                  aria-label={t('open_menu')}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="font-display font-bold text-xl">
                    CodeSampa
                  </SheetTitle>
                </SheetHeader>
                <NavLinks orientation="vertical" />
                
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