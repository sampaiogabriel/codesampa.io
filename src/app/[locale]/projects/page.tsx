import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { TimelinePortfolio } from '@/components/pages/projects/timeline';
import { PageTitle } from '@/components/ui/page-title';

export const metadata: Metadata = {
  title: 'Projects | codesampa.io',
  description: 'Projects'
};

export default async function ProjectsPage() {
  const t = await getTranslations('Pages.Projects');

  return (
    <main className="container mx-auto px-4 py-24 relative w-full overflow-hidden bg-background">
      {/* Background Effect */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px] md:blur-[130px]" />

      <div className="relative z-10">
        <PageTitle
          badge={t('badge')}
          badgeColor="purple"
          title={t.rich('title', {
            highlight: (chunks) => (
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-purple-300 animate-gradient-x">
                {chunks}
              </span>
            ),
            br: () => <br />
          })}
          subtitle={t('subtitle')}
        />

        <TimelinePortfolio />
      </div>
    </main>
  );
}
