import { Metadata } from 'next';

import { ContactHub } from '@/components/pages/contact/contact-hub';

export const metadata: Metadata = {
  title: 'codesampa.io/contact',
  description: 'Contact'
};

export default function ContactPage() {
  return <ContactHub />;
}
