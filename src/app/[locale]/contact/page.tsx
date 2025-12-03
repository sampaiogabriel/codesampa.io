import { Metadata } from 'next';

import { ContactHub } from '@/components/pages/contact/contact-hub';

export const metadata: Metadata = {
  title: 'Contact | codesampa.io',
  description: 'Contact'
};

export default function ContactPage() {
  return <ContactHub />;
}
