import { Database } from 'lucide-react';
import { FaMobileAlt, FaLayerGroup, FaDesktop } from 'react-icons/fa';
import {
  SiReact,
  SiNextdotjs,
  SiPrisma,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiStripe,
  SiFramer,
  SiTailwindcss,
  SiVercel
} from 'react-icons/si';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TECH_ICONS: Record<string, any> = {
  'React Native': SiReact,
  'Next.js 15': SiNextdotjs,
  'Neon DB': Database,
  Prisma: SiPrisma,
  'Node.js': SiNodedotjs,
  'OpenAI API': SiOpenai,
  Postgres: SiPostgresql,
  Stripe: SiStripe,
  React: SiReact,
  'Framer Motion': SiFramer,
  Tailwind: SiTailwindcss,
  Vercel: SiVercel
};

export const LIST_PROJECTS = [
  {
    key: 'kingfix',
    category: 'mobile',
    tags: ['Next.js 15', 'React Native', 'Neon DB', 'Prisma'],
    color: 'from-blue-600 to-cyan-500',
    icon: <FaMobileAlt size={24} />,
    link: '#',
    repo: '#',
    metrics: ['metric_1', 'metric_2', 'metric_3']
  },
  {
    key: 'devrex',
    category: 'saas',
    tags: ['Node.js', 'OpenAI API', 'Postgres', 'Stripe'],
    color: 'from-violet-600 to-fuchsia-600',
    icon: <FaLayerGroup size={24} />,
    link: '#',
    repo: '#',
    metrics: ['metric_1', 'metric_2', 'metric_3']
  },
  {
    key: 'codesampa',
    category: 'web',
    tags: ['React', 'Framer Motion', 'Tailwind', 'Vercel'],
    color: 'from-emerald-500 to-teal-500',
    icon: <FaDesktop size={24} />,
    link: '#',
    repo: '#',
    metrics: ['metric_1', 'metric_2', 'metric_3']
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'mobile', label: 'Mobile App' },
  { id: 'saas', label: 'SaaS' },
  { id: 'web', label: 'Web & Brand' }
];
