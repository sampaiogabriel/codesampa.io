import { Metadata } from 'next';

import { TimelinePortfolio } from '@/components/pages/projects/timeline';

export const metadata: Metadata = {
  title: 'codesampa.io/projects',
  description: 'Projects'
};

export default async function ProjectsPage() {
  return <TimelinePortfolio />;
}
