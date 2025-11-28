import { HeroSection } from '@/components/pages/home/hero';
import { LampSection } from '@/components/pages/home/lamp';
import { Newsletter } from '@/components/pages/home/newsletter';
import { EngineeringPipeline } from '@/components/pages/home/pipeline';
import { SelectedWork } from '@/components/pages/home/portfolio';

export default async function Home() {
  return (
  <div className="mx-auto">
    <HeroSection />
    <EngineeringPipeline />
    <SelectedWork />
    <LampSection />
    <Newsletter />
    </div>
    );
}