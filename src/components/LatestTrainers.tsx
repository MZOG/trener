'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Skeleton } from './ui/skeleton';
import { Database } from '../../database.types';
import { TrainerCardProps } from '@/types/LatestTrainers';
import TrainerCard from '../components/trainer/TrainerCard';
import Container from './Container';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

const LatestTrainers = () => {
  const [trainers, setTrainers] = useState<TrainerCardProps[]>([]);

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );

  const getTrainers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('full_name, location, slug, is_female, city')
      .not('is_trainer', 'is', false || null) // ignore normal users
      .not('location', 'is', null); // ignore trainers without location

    if (data) {
      setTrainers(data);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrainers();
  }, []);

  type GroupedByLocation = {
    [location: string]: TrainerCardProps[];
  };

  const groupedByLocation: GroupedByLocation = {};

  trainers?.forEach((trainer) => {
    // @ts-ignore
    if (!groupedByLocation[trainer?.location]) {
      // @ts-ignore
      groupedByLocation[trainer.location] = [];
    }
    // @ts-ignore
    groupedByLocation[trainer.location].push(trainer);
  });

  return (
    <Container className="mt-14">
      <h2 className="text-lg font-medium">Niedawno dołączyli</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-5 mt-5">
        {Object.keys(groupedByLocation).map((location) => {
          return (
            <div key={location}>
              <Link
                href={`/miasto/${slugify(location)}`}
                onClickCapture={() =>
                  console.log(`Latest Trainers click:`, location)
                }
              >
                <h4 className="mb-[10px] text-[15px] font-medium hover:underline underline-offset-4">
                  {location}
                </h4>
              </Link>
              <div className="space-y-2">
                {groupedByLocation[location].map((trainer, index) => (
                  <TrainerCard key={index} trainer={trainer} compact />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default LatestTrainers;
