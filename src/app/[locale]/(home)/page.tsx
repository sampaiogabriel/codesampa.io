import { HeroSection } from '@/components/pages/home/hero';
import { Links } from '@/components/pages/home/links';
import { ManifestoSection } from '@/components/pages/home/manifesto';
import { EngineeringPipeline } from '@/components/pages/home/pipeline';
import { ReadyToBuildSection } from '@/components/pages/home/ready-to-build';
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
      <ReadyToBuildSection />
      <Links />
    </div>
  );
}
