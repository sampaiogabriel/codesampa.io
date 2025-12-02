import { posts } from '.velite';

import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import * as runtime from 'react/jsx-runtime';

import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';

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

// --- Componente da Página ---
export default async function PostPage({ params }: PostPageProps) {
  const { slug, locale } = await params;

  // Encontra o post correspondente ao slug e locale atual
  const post = posts.find(
    (p) => p.slugAsParams === slug && p.locale === locale
  );

  if (!post || !post.published) {
    notFound();
  }

  // Renderiza o componente MDX
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const MDXContent = useMDXComponent(post.content);

  return (
    <article className="container mx-auto px-4 py-24 max-w-4xl">
      {/* Header do Artigo */}
      <header className="mb-16">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary -ml-4 gap-2 font-mono"
            asChild
          >
            <Link href="/blog">
              <ArrowLeft size={16} />
              Back to Intel
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground mb-6 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM dd, yyyy')}
            </time>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>5 min read</span>
          </div>
        </div>

        <h1 className="font-space text-4xl md:text-6xl font-black text-foreground tracking-tight mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-primary"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Separator */}
      <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-16" />

      {/* Conteúdo MDX */}
      <div
        className="prose prose-invert prose-lg max-w-none 
        /* Estilização manual para o conteúdo MDX (Tailwind Arbitrary Values) */
        [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:font-space [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:text-white
        [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-space [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-white [&_h2]:border-b [&_h2]:border-white/10 [&_h2]:pb-2
        [&_h3]:text-xl [&_h3]:font-bold [&_h3]:font-space [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-white
        [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-lg
        [&_strong]:text-white [&_strong]:font-semibold
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:text-muted-foreground
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:text-muted-foreground
        [&_li]:mb-2
        [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-300 [&_blockquote]:bg-white/5 [&_blockquote]:py-2 [&_blockquote]:pr-4 [&_blockquote]:rounded-r
        [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:text-primary
        /* Code Blocks (Rehype Pretty Code) */
        [&_pre]:bg-[#0d1117] [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-8
        [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm [&_pre_code]:text-inherit
      "
      >
        <MDXContent />
      </div>

      {/* Footer do Post */}
      <div className="mt-20 pt-8 border-t border-white/10 flex justify-between items-center">
        <span className="text-muted-foreground text-sm font-mono">
          End of transmission.
        </span>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 size={14} />
          Share
        </Button>
      </div>
    </article>
  );
}
