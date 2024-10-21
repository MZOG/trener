'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Skeleton } from './ui/skeleton';
import { Database } from '../../database.types';
import LatestTrainerCard from './LatestTrainerCard';
import { LatestTrainersProps } from '@/types/LatestTrainers';

const LatestTrainers = () => {
  const [trainers, setTrainers] = useState<LatestTrainersProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );

  const getTrainers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('full_name, location')
      .not('is_trainer', 'is', false) // ignore normal users
      .not('location', 'is', null); // ignore trainers without location

    if (data) {
      setTrainers(data);
      setLoading(false);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrainers();
  }, []);

  if (loading) {
    return <Skeleton className="h-20 w-40" />;
  }

  return (
    <section className="mx-auto px-5 max-w-6xl pb-20">
      <h2 className="text-xl">Niedawno dołączyli</h2>
      <Carousel className="mt-5">
        <CarouselContent>
          {trainers &&
            trainers.map((trainer, index) => (
              <CarouselItem key={index} className="md:basis-1/3">
                <LatestTrainerCard {...trainer} />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="border-none shadow-none" />
        <CarouselNext className="border-none shadow-none" />
      </Carousel>
    </section>
  );
};

export default LatestTrainers;
