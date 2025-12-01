'use client';

import CardContact from '@/components/pages/contact/card-contact';
import { Lanyard } from '@/components/pages/contact/lanyard';

export default function ContactPage() {
  return (
    <div className="container mx-auto relative h-full min-h-[85vh] w-full bg-zinc-950 text-zinc-50 flex flex-col md:block overflow-y-auto md:overflow-hidden">
      <div className="relative w-full h-[40vh] min-h-[300px] shrink-0 md:absolute md:inset-0 md:h-full z-0">
        <Lanyard />
      </div>
      <div className="relative z-20 w-full p-4 shrink-0 bg-zinc-950/50 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none md:absolute md:bottom-0 md:left-0 md:p-12 md:pointer-events-none">
        <div className="pointer-events-auto">
          <CardContact />
        </div>
      </div>
    </div>
  );
}
