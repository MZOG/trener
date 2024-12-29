import FeaturedTrainers from '@/components/FeaturedTrainers';
import Hero from '@/components/Hero';
import HeroFeatures from '@/components/HeroFeatures';
import LatestTrainers from '@/components/LatestTrainers';
import TrainersAdvice from '@/components/trainers-advice/TrainersAdvice';

export default function Home() {
  return (
    <>
      <Hero />
      <HeroFeatures />
      <FeaturedTrainers />
      <LatestTrainers />
      <TrainersAdvice />
    </>
  );
}
