import { HeroSection } from '@/components/pages/home/hero';
import { LampSection } from '@/components/pages/home/lamp';
import { EngineeringPipeline } from '@/components/pages/home/pipeline';
import { SelectedWork } from '@/components/pages/home/portfolio';
import { ShapeShifterSection } from '@/components/pages/home/shape-shifter';

export default async function Home() {
  return (
  <div className="mx-auto">
    <HeroSection />
    <ShapeShifterSection />
    <EngineeringPipeline />
    <SelectedWork />
    <LampSection />
    </div>
    );
}