import { posts } from '.velite';

import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { ArrowLeft, Calendar, Clock, Hash } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import * as runtime from 'react/jsx-runtime';

import { Newsletter } from '@/components/pages/blog/newsletter';
import { ShareButton } from '@/components/pages/blog/share-button';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/utils/functions/tw-merge';

// --- Utilitário para renderizar MDX do Velite ---
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  // @ts-ignore - O runtime é injetado para interpretar o código compilado
  return fn({ ...runtime }).default;
};

// --- Tipagem dos Params ---
interface PostPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

// --- Metadados Dinâmicos (SEO) ---
export async function generateMetadata({
  params
}: PostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = posts.find(
    (p) => p.slugAsParams === slug && p.locale === locale
  );

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | codesampa.io`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags
    }
  };
}

// --- Geração Estática (SSG) ---
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slugAsParams,
    locale: post.locale
  }));
}

// --- Helper para estimar tempo de leitura (Fallback) ---
function estimateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const textLength = content.length;
  const estimatedWords = textLength / 10;
  const minutes = Math.ceil(estimatedWords / wordsPerMinute);
  return minutes || 1;
}

// --- Componente da Página ---
export default async function PostPage({ params }: PostPageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations('Pages.Blog.Post');

  // Configuração de localidade para datas
  const dateLocale = locale === 'pt-BR' ? ptBR : enUS;

  // Encontra o post correspondente
  const post = posts.find(
    (p) => p.slugAsParams === slug && p.locale === locale
  );

  if (!post || !post.published) {
    notFound();
  }

  const readingTime = estimateReadingTime(post.content);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const MDXContent = useMDXComponent(post.content);

  return (
    <article className="container mx-auto px-4 py-24 max-w-4xl relative overflow-hidden">
      {/* Background Effect Sutil específico do post */}
      <div className="pointer-events-none absolute right-0 top-0 h-[300px] w-[300px] translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-[100px]" />

      {/* Header do Artigo */}
      <header className="mb-16 relative z-10">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary -ml-4 gap-2 font-mono group transition-colors"
            asChild
          >
            <Link href="/blog">
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              {t('back')}
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground mb-6 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-primary/70" />
            <time dateTime={post.date} className="text-foreground/80">
              {format(new Date(post.date), "dd 'de' MMMM, yyyy", {
                locale: dateLocale
              })}
            </time>
          </div>
          <span className="text-white/10">|</span>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-primary/70" />
            <span className="text-foreground/80">
              {t('reading_time', { minutes: readingTime })}
            </span>
          </div>
        </div>

        <h1 className="font-space text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-8 leading-[1.1]">
          <span className="bg-linear-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
            {post.title}
          </span>
        </h1>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors cursor-default"
            >
              <Hash size={10} className="opacity-50" />
              {tag}
            </div>
          ))}
        </div>
      </header>

      {/* Separator com gradiente */}
      <div className="w-full h-px bg-linear-to-r from-transparent via-border to-transparent mb-16 opacity-50" />

      {/* Conteúdo MDX Customizado */}
      <div
        className={cn(
          'prose prose-invert prose-lg max-w-none relative z-10',
          // Headings
          '[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:font-space [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:text-foreground',
          '[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-space [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-foreground [&_h2]:flex [&_h2]:items-center [&_h2]:gap-2',
          '[&_h3]:text-xl [&_h3]:font-bold [&_h3]:font-space [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-foreground/90',
          // Text
          '[&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-lg',
          '[&_strong]:text-foreground [&_strong]:font-semibold',
          '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/30 [&_a]:transition-colors hover:[&_a]:decoration-primary',
          // Lists
          '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:text-muted-foreground',
          '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:text-muted-foreground',
          '[&_li]:mb-2 [&_li::marker]:text-primary/50',
          // Blockquotes
          '[&_blockquote]:border-l-4 [&_blockquote]:border-primary/50 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-foreground/80 [&_blockquote]:bg-white/5 [&_blockquote]:py-4 [&_blockquote]:pr-4 [&_blockquote]:rounded-r-lg [&_blockquote]:my-8',
          // Inline Code
          '[&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-sm [&_code]:font-mono [&_code]:text-primary/90 [&_code]:border [&_code]:border-white/5',
          // Code Blocks (Rehype Pretty Code)
          '[&_pre]:bg-[#0d1117] [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-8 [&_pre]:shadow-2xl',
          '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm [&_pre_code]:text-inherit [&_pre_code]:border-none'
        )}
      >
        <MDXContent />
      </div>

      {/* Newsletter Section - Inserida após o conteúdo */}
      <div className="mt-20 md:mt-24">
        <Newsletter />
      </div>

      {/* Footer do Post */}
      <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {t('end')}
        </div>

        <ShareButton title={post.title} text={post.description || ''} />
      </div>
    </article>
  );
}
