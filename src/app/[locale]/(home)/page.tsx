import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('Pages.Home');
  
  return <div className="container pt-4">{t('hello_world')}</div>;
}