import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations();
  return <div className="container">{t('hello-world')}</div>;
}
