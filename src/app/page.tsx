import Hero from '@/components/Hero';
import HeroFeatures from '@/components/HeroFeatures';
import LatestTrainers from '@/components/LatestTrainers';

export default function Home() {
  return (
    <div>
      <p>header</p>
      <Hero />
      <HeroFeatures />
      <LatestTrainers />
      <p>for trainer</p>
    </div>
  );
}
