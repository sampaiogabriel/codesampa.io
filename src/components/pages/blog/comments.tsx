'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export function Comments() {
  const { theme } = useTheme();

  return (
    <section
      className="w-full pt-10 border-t border-white/10 mt-10"
      id="comments"
    >
      <h3 className="font-space text-2xl font-bold text-white mb-8">
        Comentários
      </h3>

      <div className="bg-card/30 rounded-2xl border border-white/5 p-6 md:p-8">
        <Giscus
          id="comments"
          repo="sampaiogabriel/codesampa.io"
          repoId="R_kgDOQeHEIQ"
          category="Announcements"
          categoryId="DIC_kwDOQeHEIc4CzWt-"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={theme === 'dark' ? 'dark' : 'light'}
          lang="pt"
          loading="lazy"
        />
      </div>
    </section>
  );
}
