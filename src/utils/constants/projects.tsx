import { Layers, Monitor, Smartphone } from 'lucide-react';

export const LIST_PROJECTS = [
  {
    key: 'kingfix',
    tags: ['Next.js 15', 'React Native', 'Neon DB', 'Prisma'],
    color: 'from-blue-600 to-cyan-500',
    icon: <Smartphone size={24} />,
    link: '#',
    repo: '#'
  },
  {
    key: 'devrex',
    tags: ['Node.js', 'OpenAI API', 'Postgres', 'Stripe'],
    color: 'from-violet-600 to-fuchsia-600',
    icon: <Layers size={24} />,
    link: '#',
    repo: '#'
  },
  {
    key: 'codesampa',
    tags: ['React', 'Framer Motion', 'Tailwind', 'Vercel'],
    color: 'from-emerald-500 to-teal-500',
    icon: <Monitor size={24} />,
    link: '#',
    repo: '#'
  }
];
