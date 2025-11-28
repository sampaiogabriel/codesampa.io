import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations();
  return <div className="container mx-auto px-4">{t('hello-world')}</div>;
}
