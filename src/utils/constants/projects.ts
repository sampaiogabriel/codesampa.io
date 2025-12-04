import { Database, Command, FileText } from 'lucide-react';
import {
  FaMobileAlt,
  FaLayerGroup,
  FaDesktop,
  FaReact,
  FaGlobe,
  FaCode // Adicionado para CodeLab
} from 'react-icons/fa';
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
  SiShadcnui,
  SiTypescript,
  SiHtml5,
  SiJavascript
} from 'react-icons/si';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TECH_ICONS: Record<string, any> = {
  'React Native': FaReact,
  'Next.js 15': SiNextdotjs,
  'Neon DB': Database,
  Prisma: SiPrisma,
  'Node.js': SiNodedotjs,
  'OpenAI API': SiOpenai,
  Postgres: SiPostgresql,
  Stripe: SiStripe,
  React: FaReact,
  'Framer Motion': SiFramer,
  Tailwind: SiTailwindcss,
  'Tailwind CSS': SiTailwindcss,
  Vercel: SiVercel,
  Clerk: SiClerk,
  Shadcn: SiShadcnui,
  TypeScript: SiTypescript,
  'Tailwind v4': SiTailwindcss,
  'React 19': FaReact,
  'Next.js 16': SiNextdotjs,
  Velite: FileText,
  HTML5: SiHtml5,
  JavaScript: SiJavascript
};

export const LIST_PROJECTS = [
  {
    key: 'kingfix',
    isProduct: true,
    category: 'mobile',
    tags: [
      'Next.js 15',
      'React 19',
      'Neon DB',
      'Prisma',
      'Clerk',
      'Stripe',
      'Shadcn'
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
    key: 'psialexia',
    isProduct: true,
    category: 'web',
    tags: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Vercel'],
    color: 'from-rose-500 to-pink-600',
    icon: FaGlobe,
    link: 'https://psialexiamarques.com.br/',
    repo: '#',
    metrics: ['metric_1', 'metric_2', 'metric_3']
  },
  {
    key: 'codesampa',
    isProduct: false,
    category: 'web',
    tags: [
      'Next.js 16',
      'React 19',
      'Tailwind v4',
      'Velite',
      'TypeScript',
      'Framer Motion'
    ],
    color: 'from-primary to-blue-600',
    icon: FaDesktop,
    link: '#',
    repo: 'https://github.com/sampaiogabriel/codesampa.io',
    metrics: ['metric_1', 'metric_2', 'metric_3']
  }
];

// --- LISTA DE PROJETOS SECUNDÁRIOS ---
export const LIST_SECONDARY_PROJECTS = [
  {
    key: 'finance_ai',
    category: 'saas',
    tags: ['Next.js 15', 'OpenAI API', 'Stripe', 'Shadcn'],
    icon: FaLayerGroup,
    link: '#', // Se tiver link de demo, coloque aqui
    repo: 'https://github.com/sampaiogabriel/finance-ai'
  },
  {
    key: 'codelab',
    category: 'web',
    tags: ['React', 'Tailwind', 'TypeScript'],
    icon: FaCode,
    link: '#',
    repo: 'https://github.com/sampaiogabriel/codelab'
  },
  {
    key: 'lonewolf',
    category: 'web',
    tags: ['HTML5', 'Tailwind CSS', 'JavaScript'],
    icon: FaDesktop,
    link: '#',
    repo: 'https://github.com/sampaiogabriel/landpage-lonewolf'
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'mobile', label: 'Mobile App' },
  { id: 'saas', label: 'SaaS' },
  { id: 'web', label: 'Web & Brand' }
];
