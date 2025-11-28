import { HeroSection } from '@/components/pages/home/hero';
import { EngineeringPipeline } from '@/components/pages/home/pipeline';

export default async function Home() {
  return (
  <div className="mx-auto">
    <HeroSection />
    <EngineeringPipeline />
    </div>
    );
}