import { Metadata } from 'next';

import { ScheduleSuccessView } from '@/components/pages/success/schedule-success-view';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default function ScheduleSuccessPage() {
  return <ScheduleSuccessView />;
}
