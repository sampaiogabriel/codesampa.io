import { Metadata } from 'next';

import { TimelinePortfolio } from '@/components/pages/projects/timeline';

export const metadata: Metadata = {
  title: 'Projects | codesampa.io',
  description: 'Projects'
};

export default async function ProjectsPage() {
  return <TimelinePortfolio />;
}
