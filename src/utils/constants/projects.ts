import { Database } from 'lucide-react';
import { FaMobileAlt, FaLayerGroup, FaDesktop, FaReact } from 'react-icons/fa';
import { RiTailwindCssFill } from 'react-icons/ri';
import {
  SiNextdotjs,
  SiPrisma,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiStripe,
  SiFramer,
  SiTailwindcss,
  SiVercel,
  SiClerk,
  SiShadcnui
} from 'react-icons/si';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TECH_ICONS: Record<string, any> = {
  'React Native': FaReact,
  'Next.js': SiNextdotjs,
  'Neon DB': Database,
  Prisma: SiPrisma,
  'Node.js': SiNodedotjs,
  'OpenAI API': SiOpenai,
  Postgres: SiPostgresql,
  Stripe: SiStripe,
  React: FaReact,
  'Framer Motion': SiFramer,
  Tailwind: SiTailwindcss,
  Vercel: SiVercel,
  Clerk: SiClerk,
  Shadcn: SiShadcnui
};

export const LIST_PROJECTS = [
  {
    key: 'kingfix',
    isProduct: true,
    category: 'mobile',
    tags: [
      'Next.js',
      'React',
      'Neon DB',
      'Prisma',
      'Clerk',
      'Stripe',
      'Shadcn',
      'Tailwind'
    ],
    color: 'from-[#FF6900] to-orange-600',
    icon: FaMobileAlt,
    link: '#',
    repo: '#',
    metrics: ['metric_1', 'metric_2', 'metric_3']
  },
  {
    key: 'devrex',
    isProduct: true,
    category: 'saas',
    tags: ['Node.js', 'OpenAI API', 'Postgres', 'Stripe'],
    color: 'from-violet-600 to-fuchsia-600',
    icon: FaLayerGroup,
    link: '#',
    repo: '#',
    metrics: ['metric_1', 'metric_2', 'metric_3']
  },
  {
    key: 'codesampa',
    isProduct: false,
    category: 'web',
    tags: ['React', 'Framer Motion', 'Tailwind', 'Vercel'],
    color: 'from-emerald-500 to-teal-500',
    icon: FaDesktop,
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
