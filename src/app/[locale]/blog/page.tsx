import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'codesampa.io/blog',
  description: 'Blog'
};

export default function Page() {
  return <div className="container mx-auto px-4">Blog</div>;
}
