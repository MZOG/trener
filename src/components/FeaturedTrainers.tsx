'use client';
import { useEffect, useMemo, useState } from 'react';
import Container from './Container';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../database.types';
import { TrainerCardProps } from '@/types/LatestTrainers';
import TrainerCard from '../components/trainer/TrainerCard';

const FeaturedTrainers = () => {
  const [featuredTrainers, setFeaturedTrainers] = useState<
    | Pick<TrainerCardProps, 'full_name' | 'location' | 'slug' | 'is_female'>[]
    | null
  >();

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );

  const getFeaturedTrainers = useMemo(
    () => async () => {
      const { data } = await supabase
        .from('users')
        .select('full_name, location, slug, is_female')
        .is('is_pro', true)
        .limit(8);

      if (data) {
        setFeaturedTrainers(data);
      }
    },
    []
  );

  useEffect(() => {
    getFeaturedTrainers();
  }, []);

  return (
    <div className="mt-14">
      <Container className="">
        <h2 className="text-lg font-medium">Polecani trenerzy</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-5">
          {featuredTrainers?.map((trainer, index) => (
            <TrainerCard key={index} trainer={trainer} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FeaturedTrainers;
