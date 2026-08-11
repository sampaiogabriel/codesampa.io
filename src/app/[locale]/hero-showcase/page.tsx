import { Metadata } from 'next';

import { HeroShowcaseSection } from '@/components/pages/hero-showcase';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default function HeroShowcasePage() {
  return <HeroShowcaseSection />;
}
