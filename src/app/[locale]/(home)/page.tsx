import { HeroSection } from '@/components/pages/home/hero';
import { LampSection } from '@/components/pages/home/lamp';
import { Links } from '@/components/pages/home/links';
import { ManifestoSection } from '@/components/pages/home/manifesto';
import { EngineeringPipeline } from '@/components/pages/home/pipeline';
import { ServicesSection } from '@/components/pages/home/services';
import { ShapeShifterSection } from '@/components/pages/home/shape-shifter';

export default async function Home() {
  return (
    <div className="mx-auto">
      <HeroSection />
      <ShapeShifterSection />
      <ServicesSection />
      <ManifestoSection />
      <EngineeringPipeline />
      <LampSection />
      <Links />
    </div>
  );
}
