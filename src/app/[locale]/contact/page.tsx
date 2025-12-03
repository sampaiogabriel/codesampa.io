import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ContactHub } from '@/components/pages/contact/contact-hub';
import { PageTitle } from '@/components/ui/page-title';

export const metadata: Metadata = {
  title: 'Contact | codesampa.io',
  description: 'Contact'
};

export default async function ContactPage() {
  const t = await getTranslations('Pages.Contact.Hub');

  return (
    <main className="relative flex h-full flex-1 flex-col items-center justify-center overflow-hidden py-8 md:py-0">
      {/* Background Effect */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/10 blur-[100px] md:blur-[130px]" />

      <div className="container mx-auto px-4 py-24 relative z-10 max-w-5xl">
        <PageTitle
          badge={t('badge')}
          badgeColor="emerald"
          title={
            <>
              {t('title_prefix')} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-emerald-400 to-green-400 animate-gradient-x">
                {t('title_highlight')}
              </span>
            </>
          }
          subtitle={t('subtitle')}
        />

        <ContactHub />
      </div>
    </main>
  );
}
